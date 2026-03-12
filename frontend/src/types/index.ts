export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  images: string[];
  description: string;
  bullets: string[];
  featured: boolean;
  category: "main" | "expansion" | "pack" | "other";
  medusaVariantId?: string;
  bgColor?: string;
  ctaLabel?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type NavLink = {
  label: string;
  href: string;
  icon?: string;
};
