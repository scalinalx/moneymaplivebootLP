export interface LaunchFormData {
    leadMagnetName: string;
    leadMagnetDescription: string;
    coreProductName: string;
    coreProductDescription: string;
    audience: string;
    launchDate: string;
    extraOfferDetails?: string; // For upsell/downsell
}

export interface EmailDay {
    phase: 'Pre-Launch' | 'Launch Day' | 'Post-Launch';
    dayOffset: number; // Relative to launch date (e.g., -2, 0, 1)
    subject: string;
    previewText: string;
    body: string;
    strategyNote: string; // Explanation of the marketing principle used
    formattedDate?: string; // Calculated field
}

export interface SequenceResponse {
    sequence: EmailDay[];
}
