'use client'

import { ArrowLeft, Clock, DollarSign, Heart, MapPin, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TempleCard from '@/components/temple-card'
import { mockTemples } from '@/lib/mock-temples'
import { useParams } from 'next/navigation'

export default function TempleDetailPage() {
  const params = useParams()
  const templeId = params.id as string
  const temple = mockTemples.find((t) => t.id === templeId)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!temple) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Temple Not Found</h1>
            <p className="text-muted-foreground mb-6">The temple you are looking for doesn&apos;t exist.</p>
            <Link
              href="/temples"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Temples
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Get related temples (same state or architecture)
  const relatedTemples = mockTemples
    .filter((t) => t.id !== temple.id && (t.state === temple.state || t.architecture === temple.architecture))
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Back Button */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/temples"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Temples
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={temple.image}
            alt={temple.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-6 right-6 p-3 bg-background/80 hover:bg-background rounded-full transition-colors z-10"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-12">
          <div className="bg-card rounded-lg border border-border p-8 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{temple.name}</h1>
                <p className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  {temple.location}, {temple.state}
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Star className="w-6 h-6 fill-primary text-primary" />
                    <span className="text-3xl font-bold text-foreground">{temple.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{temple.reviews} reviews</p>
                </div>
              </div>
            </div>

            <p className="text-lg text-foreground mb-8 leading-relaxed">
              {temple.description}
            </p>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Deity</p>
                <p className="text-lg font-semibold text-foreground">{temple.deity}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Architecture</p>
                <p className="text-lg font-semibold text-foreground">{temple.architecture}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Founded</p>
                <p className="text-lg font-semibold text-foreground">{temple.founded}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Entry Fee</p>
                <p className="text-lg font-semibold text-foreground">{temple.entryFee}</p>
              </div>
            </div>
          </div>

          {/* Details Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Visiting Information */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Visiting Information</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Visiting Hours</p>
                      <p className="text-muted-foreground">{temple.visitingHours}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Best Time to Visit</p>
                      <p className="text-muted-foreground">{temple.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Entry Fee</p>
                      <p className="text-muted-foreground">{temple.entryFee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Facilities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {temple.facilities.map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Location</h3>
                  <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Map Coming Soon
                  </div>
                </div>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isFavorite
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                </button>

                <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all">
                  Plan Visit
                </button>
              </div>
            </div>
          </div>

          {/* Related Temples */}
          {relatedTemples.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Related Temples</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTemples.map((relatedTemple) => (
                  <TempleCard key={relatedTemple.id} temple={relatedTemple} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
