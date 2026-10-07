"use client"

import { useMemo, useState } from "react"
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react"
import { OutfitCard } from "@/components/outfit-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { catalog } from "@/lib/catalog"

const quickFilters = ["All", "Women", "Men", "Wedding", "Cocktail", "Formal"]
const categories = Array.from(new Set(catalog.map((outfit) => outfit.category))).sort()
const occasions = Array.from(new Set(catalog.map((outfit) => outfit.occasion))).sort()
const colors = Array.from(new Set(catalog.map((outfit) => outfit.color))).sort()
const sizes = Array.from(new Set(catalog.flatMap((outfit) => outfit.sizes))).sort()
const maxPriceLimit = Math.ceil(Math.max(...catalog.map((outfit) => outfit.pricePerDay)) / 500) * 500

function CollectionSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Any {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function CollectionPage() {
  const [query, setQuery] = useState("")
  const [quickFilter, setQuickFilter] = useState("All")
  const [category, setCategory] = useState("")
  const [occasion, setOccasion] = useState("")
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return catalog.filter((outfit) => {
      const matchesQuickFilter =
        quickFilter === "All" ||
        outfit.gender === quickFilter ||
        outfit.occasion === quickFilter
      const searchableDetails = [
        outfit.name,
        outfit.brand,
        outfit.category,
        outfit.occasion,
        outfit.color,
        ...outfit.sizes,
      ]
        .join(" ")
        .toLowerCase()

      return (
        matchesQuickFilter &&
        (!normalizedQuery || searchableDetails.includes(normalizedQuery)) &&
        (!category || outfit.category === category) &&
        (!occasion || outfit.occasion === occasion) &&
        (!color || outfit.color === color) &&
        (!size || outfit.sizes.includes(size)) &&
        outfit.pricePerDay <= maxPrice
      )
    })
  }, [category, color, maxPrice, occasion, query, quickFilter, size])

  const hasActiveFilters =
    query.trim() !== "" ||
    quickFilter !== "All" ||
    category !== "" ||
    occasion !== "" ||
    color !== "" ||
    size !== "" ||
    maxPrice !== maxPriceLimit

  function clearFilters() {
    setQuery("")
    setQuickFilter("All")
    setCategory("")
    setOccasion("")
    setColor("")
    setSize("")
    setMaxPrice(maxPriceLimit)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="flex flex-col gap-3 border-b pb-10">
        <p className="text-xs uppercase tracking-[.25em] text-accent">The full wardrobe</p>
        <h1 className="font-serif text-6xl md:text-8xl">Find your moment.</h1>
        <p className="max-w-xl text-muted-foreground">
          Designer pieces selected for Indian celebrations, boardrooms and nights worth remembering.
        </p>
      </div>

      <div className="flex flex-col gap-4 py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative max-w-md flex-1">
            <span className="sr-only">Search outfits</span>
            <Search className="absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search designer, style, color or size"
              className="pl-10"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={quickFilter === item ? "default" : "outline"}
                aria-pressed={quickFilter === item}
                onClick={() => setQuickFilter(item)}
              >
                {item}
              </Button>
            ))}
            <Button
              size="sm"
              variant={filtersOpen ? "secondary" : "outline"}
              aria-expanded={filtersOpen}
              aria-controls="collection-filters"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal data-icon="inline-start" />
              Filters
            </Button>
          </div>
        </div>

        {filtersOpen && (
          <div
            id="collection-filters"
            className="grid gap-5 rounded-2xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            <CollectionSelect label="Category" value={category} options={categories} onChange={setCategory} />
            <CollectionSelect label="Occasion" value={occasion} options={occasions} onChange={setOccasion} />
            <CollectionSelect label="Color" value={color} options={colors} onChange={setColor} />
            <CollectionSelect label="Size" value={size} options={sizes} onChange={setSize} />
            <label className="flex flex-col gap-2 text-sm">
              <span className="flex items-center justify-between gap-2 font-medium">
                <span>Maximum price per day</span>
                <span className="text-muted-foreground">₹{maxPrice.toLocaleString("en-IN")}</span>
              </span>
              <input
                type="range"
                min={0}
                max={maxPriceLimit}
                step={500}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                aria-label="Maximum price per day"
                className="h-9 w-full cursor-pointer accent-accent"
              />
            </label>
          </div>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {results.length} considered {results.length === 1 ? "piece" : "pieces"}
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RotateCcw data-icon="inline-start" />
            Clear filters
          </Button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {results.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-8 text-center">
          <h2 className="font-serif text-3xl">No pieces found</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Try a different search or loosen your filters to explore more of the collection.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            <RotateCcw data-icon="inline-start" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
