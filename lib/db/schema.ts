import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  index
} from "drizzle-orm/pg-core"

// Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// Luxury Items Table
export const outfits = pgTable("outfits", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  gender: text("gender").notNull(),
  occasion: text("occasion").notNull(),
  color: text("color").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  pricePerDay: integer("pricePerDay").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

// Rental Orders Table
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    outfitId: integer("outfitId")
      .notNull()
      .references(() => outfits.id, { onDelete: "cascade" }),
    startDate: date("startDate").notNull(),
    endDate: date("endDate").notNull(),
    status: text("status").notNull().default("pending"),
    totalPaise: integer("totalPaise").notNull(),
    stripeSessionId: text("stripeSessionId").unique(),
    stripePaymentIntentId: text("stripePaymentIntentId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (t) => [
    index("booking_outfit_dates_idx").on(t.outfitId, t.startDate, t.endDate),
  ]
)

// Favorites / Wishlist Table
export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    outfitId: integer("outfitId")
      .notNull()
      .references(() => outfits.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.outfitId)]
)

// AI Recommendation History Table
export const aiRecommendationHistory = pgTable("aiRecommendationHistory", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => user.id, { onDelete: "set null" }),
  prompt: text("prompt").notNull(),
  preferences: jsonb("preferences").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})