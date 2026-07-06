// Ana AI Coach — server-only Gemini client + call helpers.
//
// Uses @google/genai (the newer SDK, same as will-it-sell) with a SERVER-ONLY
// key. CRITICAL SECURITY INVARIANT: no `tools`, no function declarations, no
// code execution, no grounding are ever passed here — content in, text out.
// This eliminates the injection→exfiltration-via-tools class by construction.

import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey, COACH_MODEL } from '../config';

export interface Usage {
  tokens_in: number;
  tokens_out: number;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface BaseOpts {
  model?: string;
  system: string;
  contents: string | GeminiContent[];
  temperature: number;
  maxOutputTokens: number;
  thinkingBudget: number;
  timeoutMs: number;
}

let client: GoogleGenAI | null = null;
function ai(): GoogleGenAI {
  if (!client) client = new GoogleGenAI({ apiKey: getGeminiApiKey() });
  return client;
}

function usageOf(result: unknown): Usage {
  const u = (result as { usageMetadata?: Record<string, number | undefined> }).usageMetadata ?? {};
  return {
    tokens_in: u.promptTokenCount ?? 0,
    tokens_out: (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0),
  };
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`[ana-coach] ${label} timed out after ${ms}ms`)), ms);
    p.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); },
    );
  });
}

function baseConfig(o: BaseOpts) {
  return {
    systemInstruction: o.system,
    temperature: o.temperature,
    maxOutputTokens: o.maxOutputTokens,
    thinkingConfig: { thinkingBudget: o.thinkingBudget },
    // No tools. No responseModalities beyond text. Intentional.
  };
}

// Plain text generation (non-streaming).
export async function callText(o: BaseOpts): Promise<{ text: string; usage: Usage }> {
  const result = await withTimeout(
    ai().models.generateContent({
      model: o.model ?? COACH_MODEL,
      contents: o.contents as never,
      config: baseConfig(o),
    }),
    o.timeoutMs,
    'callText',
  );
  return { text: result.text ?? '', usage: usageOf(result) };
}

// JSON generation with a response schema (used by triage + product matcher).
export async function callJson<T>(
  o: BaseOpts & { schema: unknown },
): Promise<{ data: T; raw: string; usage: Usage }> {
  const result = await withTimeout(
    ai().models.generateContent({
      model: o.model ?? COACH_MODEL,
      contents: o.contents as never,
      config: {
        ...baseConfig(o),
        responseMimeType: 'application/json',
        responseSchema: o.schema as never,
      },
    }),
    o.timeoutMs,
    'callJson',
  );
  const raw = result.text ?? '';
  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  const data = JSON.parse(cleaned) as T;
  return { data, raw, usage: usageOf(result) };
}

// Streaming text generation (used by synthesis). Yields text deltas; the final
// usage is available via the returned getter after iteration completes.
export async function* streamText(
  o: BaseOpts,
): AsyncGenerator<string, Usage, void> {
  const stream = await withTimeout(
    ai().models.generateContentStream({
      model: o.model ?? COACH_MODEL,
      contents: o.contents as never,
      config: baseConfig(o),
    }),
    o.timeoutMs,
    'streamText:init',
  );

  const deadline = Date.now() + o.timeoutMs;
  let usage: Usage = { tokens_in: 0, tokens_out: 0 };
  for await (const chunk of stream) {
    if (Date.now() > deadline) throw new Error('[ana-coach] streamText exceeded deadline');
    const c = chunk as { text?: string; usageMetadata?: Record<string, number | undefined> };
    if (c.usageMetadata) usage = usageOf(c);
    if (c.text) yield c.text;
  }
  return usage;
}
