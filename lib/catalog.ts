// lib/catalog.ts

export const RENTAL_ESTIMATE_DAYS = 3;
export interface Outfit {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  occasion: string;
  color: string;
  sizes: string[];
  pricePerDay: number;
  rating: string;
  description: string;
  image: string;
  featured?: boolean;
}

export const catalog: Outfit[] = [
  {
    id: 1,
    slug: "noor-ivory-lehenga",
    name: "Noor Ivory Lehenga",
    brand: "Aaraya Studio",
    category: "Lehenga",
    gender: "Women",
    occasion: "Wedding",
    color: "Ivory",
    sizes: ["S", "M", "L"],
    pricePerDay: 4200,
    rating: "4.9",
    description: "Architectural ivory silk lehenga featuring silver sequin threadwork, mirror highlights, and a sheer netted dupatta.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    slug: "midnight-tuxedo",
    name: "Midnight Tuxedo",
    brand: "Maison Arjun",
    category: "Suits",
    gender: "Men",
    occasion: "Formal",
    color: "Black",
    sizes: ["38R", "40R", "42R"],
    pricePerDay: 3200,
    rating: "4.8",
    description: "Classic wool-blend double-breasted tuxedo with satin lapels, tailored specifically for black-tie galas and receptions.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
    featured: true,
  },
  {
    id: 3,
    slug: "emerald-silk-sari",
    name: "Emerald Silk Sari",
    brand: "Nila House",
    category: "Sari",
    gender: "Women",
    occasion: "Wedding",
    color: "Green",
    sizes: ["Free Size"],
    pricePerDay: 2800,
    rating: "4.9",
    description: "Pre-draped handloom organza silk sari in rich emerald green with intricate zari borders and a sleeveless designer blouse.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
    featured: true,
  },
  {
    id: 4,
    slug: "rouge-sculpted-midi",
    name: "Rouge Sculpted Midi",
    brand: "Atelier 27",
    category: "Dresses",
    gender: "Women",
    occasion: "Cocktail",
    color: "Red",
    sizes: ["XS", "S", "M"],
    pricePerDay: 2400,
    rating: "4.7",
    description: "Deep rouge satin cocktail dress featuring a asymmetric sculpted neckline and flared midi skirt.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
    featured: true,
  }
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getOutfit(slug: string): Outfit | undefined {
  return catalog.find((item) => item.slug === slug);
}