import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('file');

  if (!filename) {
    return new NextResponse('File parameter is required', { status: 400 });
  }

  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

  try {
    // Check if directory exists
    if (!fs.existsSync(downloadsDir)) {
      return new NextResponse('Downloads directory not found', { status: 404 });
    }

    // List all files in the downloads directory
    const files = fs.readdirSync(downloadsDir);

    // Find a case-insensitive match
    const matchedFile = files.find(
      (f) => f.toLowerCase() === filename.toLowerCase()
    );

    if (!matchedFile) {
      return new NextResponse(`File not found: ${filename}`, { status: 404 });
    }

    const filePath = path.join(downloadsDir, matchedFile);
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type based on extension
    const ext = path.extname(matchedFile).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.pdf') contentType = 'application/pdf';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${matchedFile}"`,
      },
    });
  } catch (error) {
    console.error('Error serving download:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
