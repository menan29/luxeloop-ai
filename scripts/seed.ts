// scripts/seed.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { outfits } from "../lib/db/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export const sampleOutfits = [
  {
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
  },
  {
    slug: "royal-velvet-bandhgala",
    name: "Royal Velvet Bandhgala",
    brand: "Maison Arjun",
    category: "Suits",
    gender: "Men",
    occasion: "Wedding",
    color: "Navy",
    sizes: ["38R", "40R", "42R"],
    pricePerDay: 3800,
    rating: "4.9",
    description: "Midnight blue velvet jacket with custom antique brass button accents and slim tailored trousers.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
    featured: false,
  },
  {
    slug: "blush-chikankari-sharara",
    name: "Blush Chikankari Sharara",
    brand: "Aaraya Studio",
    category: "Lehenga",
    gender: "Women",
    occasion: "Cocktail",
    color: "Pink",
    sizes: ["S", "M"],
    pricePerDay: 2600,
    rating: "4.8",
    description: "Georgette short kurta and flared sharara set layered with intricate Lucknawi hand-embroidery.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
    featured: false,
  }
];

async function seed() {
  console.log("⏳ Seeding LuxeLoop AI database catalog...");
  await db.insert(outfits).values(sampleOutfits);
  console.log("🎉 Seed successful! Database updated.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});