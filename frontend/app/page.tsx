'use client'

import { ArrowRight, MapPin, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SearchBar from '@/components/search-bar'
import TempleCard from '@/components/temple-card'
import { mockTemples } from '@/lib/mock-temples'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const featuredTemples = mockTemples.slice(0, 6)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-card to-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Discover Sacred Temples</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Explore India&apos;s Spiritual
                <span className="text-primary"> Heritage</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Discover, explore, and plan your pilgrimage to India&apos;s most sacred temples. Connect with centuries of spiritual tradition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/temples"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Explore Temples
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Temples Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Temples</h2>
            <p className="text-lg text-muted-foreground">
              Explore some of India&apos;s most revered and visited temples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/temples"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              View All Temples
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-card border-y border-border py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose TempleConnect?</h2>
              <p className="text-lg text-muted-foreground">Your complete guide to spiritual exploration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: 'Discover Temples',
                  description: 'Browse comprehensive information about India&apos;s sacred temples across all states.',
                },
                {
                  icon: Users,
                  title: 'Community Insights',
                  description: 'Read reviews and ratings from pilgrims who have visited these holy sites.',
                },
                {
                  icon: Sparkles,
                  title: 'Plan Your Journey',
                  description: 'Get detailed information about visiting hours, facilities, and best times to visit.',
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore hundreds of temples, plan your itinerary, and connect with India&apos;s rich spiritual heritage.
            </p>
            <Link
              href="/temples"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
