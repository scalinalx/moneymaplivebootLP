// Ana AI Coach — specialist contracts.

import type { SpecialistId } from '../../types';
import type { Usage } from '../gemini';

export interface ProductRecommendation {
  slug: string;
  name: string;
  price: string;
  fit_reason: string;
  testimonial: string | null;
  when_to_mention: 'now' | 'wrap_up' | 'not_yet';
}

export interface SpecialistNote {
  id: SpecialistId;
  status: 'ok' | 'failed' | 'timeout';
  ms: number;
  usage: Usage;
  // Human-readable analyst notes (markdown for prose specialists; a rendered
  // summary for the product matcher). Empty string when the call failed.
  notes: string;
  // Product-matcher only: structured recommendations (the ONLY legal source of
  // [[product:slug]] markers). Undefined for other specialists.
  recommendations?: ProductRecommendation[];
}

export interface SpecialistContext {
  question: string;
  profileText: string;
  memberMessage: string;
  untrusted: string[]; // routed UNTRUSTED_DATA blocks (already wrapped)
  library: string;     // retrieved relevant chunks from Ana's corpus (may be empty)
}
