'use client'

import { Heart, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export interface Temple {
  id: string
  name: string
  location: string
  state: string
  image: string
  rating: number
  reviews: number
  description: string
  founded: number
  deity: string
  architecture: string
  facilities: string[]
  visitingHours: string
  bestTimeToVisit: string
  entryFee: string
  distance?: number
}

interface TempleCardProps {
  temple: Temple
  variant?: 'grid' | 'list'
}

export default function TempleCard({ temple, variant = 'grid' }: TempleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg">
        <div className="w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={temple.image}
            alt={temple.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/temples/${temple.id}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                {temple.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {temple.location}, {temple.state}
            </p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {temple.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{temple.rating}</span>
              <span className="text-xs text-muted-foreground">({temple.reviews} reviews)</span>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-primary/10 rounded-md transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/temples/${temple.id}`}>
          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
            {temple.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
          <MapPin className="w-4 h-4" />
          {temple.location}
        </p>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 flex-1">
          {temple.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{temple.rating}</span>
            <span className="text-xs text-muted-foreground">({temple.reviews})</span>
          </div>
          <Link
            href={`/temples/${temple.id}`}
            className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded transition-colors font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
