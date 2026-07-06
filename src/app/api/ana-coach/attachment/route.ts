import { NextResponse, type NextRequest } from 'next/server';
import { requireMember } from '@/lib/ana-coach/authGuard';
import { makeLimiter, clientIp } from '@/lib/ana-coach/rateLimit';
import { validateFile } from '@/lib/ana-coach/fileValidation';
import { extractFileText } from '@/lib/ana-coach/extract';
import {
  getConversation,
  getPendingAttachments,
  bumpDaily,
  insertAttachment,
} from '@/lib/ana-coach/store';
import {
  MAX_FILE_BYTES,
  MAX_FILES_PER_DAY,
  MAX_FILES_PER_MESSAGE,
  RATE_CHAT_PER_MIN,
} from '@/lib/ana-coach/config';

// Upload + extract a file (txt/md/pdf/docx). Stores extracted text as a pending
// attachment consumed by the member's next message.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const limiter = makeLimiter(60_000, RATE_CHAT_PER_MIN);

export async function POST(req: NextRequest) {
  if (limiter(clientIp(req))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  const guard = await requireMember(req);
  if (!guard.ok) return guard.response;
  const member = guard.member;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid upload' }, { status: 400 });
  }
  const conversationId = String(form.get('conversationId') || '');
  const file = form.get('file');
  if (!conversationId || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file or conversation' }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  try {
    const conv = await getConversation(conversationId, member.id);
    if (!conv || conv.status !== 'active') {
      return NextResponse.json({ error: 'No active session' }, { status: 404 });
    }

    // Per-message cap (pending files not yet sent).
    const pending = await getPendingAttachments(conversationId);
    if (pending.filter((a) => a.kind === 'file').length >= MAX_FILES_PER_MESSAGE) {
      return NextResponse.json({ error: `You can attach up to ${MAX_FILES_PER_MESSAGE} files per message` }, { status: 429 });
    }

    // Per-day cap.
    if (!(await bumpDaily(member.id, 'file_uploads', MAX_FILES_PER_DAY))) {
      return NextResponse.json({ error: "You've reached today's upload limit" }, { status: 429 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const v = validateFile(file.name, file.size, buf);
    if (!v.ok || !v.kind) return NextResponse.json({ error: v.error || 'Unsupported file' }, { status: 400 });

    let extracted;
    try {
      extracted = await extractFileText(v.kind, buf);
    } catch (err) {
      console.error('[ana-coach] extract error:', err instanceof Error ? err.message : err);
      return NextResponse.json({ error: 'Could not read that file' }, { status: 422 });
    }
    if (!extracted.text.trim()) {
      return NextResponse.json(
        { error: 'No readable text found (scanned/image PDFs are not supported yet)' },
        { status: 422 },
      );
    }

    const id = await insertAttachment(conversationId, {
      kind: 'file',
      name: file.name.slice(0, 200),
      mime: file.type || null,
      char_count: extracted.text.length,
      truncated: extracted.truncated,
      extracted_text: extracted.text,
    });

    return NextResponse.json({
      attachmentId: id,
      name: file.name,
      kind: 'file',
      charCount: extracted.text.length,
      truncated: extracted.truncated,
    });
  } catch (err) {
    console.error('[ana-coach] attachment error:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
