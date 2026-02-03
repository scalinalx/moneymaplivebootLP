export interface NavItem {
    label: string;
    href: string;
}

export interface Feature {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}
