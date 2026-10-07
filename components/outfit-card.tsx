import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatInr, RENTAL_ESTIMATE_DAYS, type Outfit } from "@/lib/catalog"

export function OutfitCard({ outfit }: { outfit: Outfit }) {
  const rentalEstimate = formatInr(outfit.pricePerDay * RENTAL_ESTIMATE_DAYS)

  return (
    <Card className="group border-0 bg-transparent ring-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <Image
          src={outfit.image}
          alt={`${outfit.name} by ${outfit.brand}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <Badge className="absolute left-3 top-3" variant="secondary">Available</Badge>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 rounded-full"
          aria-label={`Save ${outfit.name}`}
        >
          <Heart />
        </Button>
      </div>
      <CardHeader className="px-0 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{outfit.brand}</p>
            <CardTitle className="mt-1 font-serif text-lg">
              <Link href={`/outfits/${outfit.slug}`} className="after:absolute after:inset-0">
                {outfit.name}
              </Link>
            </CardTitle>
          </div>
          <span className="flex items-center gap-1 text-sm">
            <Star className="fill-current" /> {outfit.rating}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-2 px-0">
        <span className="pt-1 text-sm text-muted-foreground">{outfit.category}</span>
        <div className="text-right">
          <p className="text-sm">
            <strong className="text-base">{formatInr(outfit.pricePerDay)}</strong>
            <span className="text-muted-foreground"> / day</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {RENTAL_ESTIMATE_DAYS}-day estimate: {rentalEstimate}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
