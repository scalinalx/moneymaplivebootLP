// Global Rewardful type definitions
declare global {
  interface Window {
    rewardful?: {
      (action: 'ready', callback: () => void): void;
      (action: 'convert', data: { amount: number; email?: string | null }): void;
    };
    Rewardful?: {
      referral?: string;
    };
  }
}

export {}; 