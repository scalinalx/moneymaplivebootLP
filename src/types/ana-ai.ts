export interface ValueStackItem {
    component: string;
    value: string;
}

export interface OfferItem {
    title: string;
    price: string;
    description: string;
    deliveryVehicle: string;
    valueStackItems: ValueStackItem[];
    totalValue: string;
    valueProps: string[];
    bonuses: string[];
    guarantee?: string;
}

export interface OfferStack {
    leadMagnet: OfferItem;
    coreProduct: OfferItem;
    upsell: OfferItem;
    downsell: OfferItem;
}

export interface OfferStackResponse {
    stack: OfferStack;
    strategySummary: string;
}
