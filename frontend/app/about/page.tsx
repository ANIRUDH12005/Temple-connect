'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">About TempleConnect</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                TempleConnect is dedicated to preserving and promoting India&apos;s rich spiritual and cultural heritage. Our mission is to make information about sacred temples accessible to pilgrims, travelers, and spiritual seekers worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are a team of cultural enthusiasts, developers, and spiritual seekers passionate about connecting people with India&apos;s thousands of sacred temples. Our platform brings together comprehensive information, visitor experiences, and pilgrimage guidance in one place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What We Offer</h2>
              <ul className="space-y-4">
                {[
                  'Comprehensive temple directories with detailed information',
                  'Visitor reviews and ratings from authentic pilgrims',
                  'Practical visiting information including hours and facilities',
                  'Journey planning tools for pilgrims and travelers',
                  'Cultural and historical context about sacred sites',
                  'Community features to connect spiritual seekers',
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Authenticity',
                    description: 'We verify information and maintain accuracy in all temple details.',
                  },
                  {
                    title: 'Respect',
                    description: 'We honor the spiritual significance and religious traditions of all temples.',
                  },
                  {
                    title: 'Accessibility',
                    description: 'We make spiritual heritage information available to everyone, everywhere.',
                  },
                  {
                    title: 'Community',
                    description: 'We foster connections between pilgrims and spiritual seekers.',
                  },
                ].map((value, index) => (
                  <div key={index} className="bg-card border border-border p-6 rounded-lg">
                    <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions or suggestions? We&apos;d love to hear from you. Contact us at{' '}
                <a href="mailto:hello@templeconnect.com" className="text-primary hover:underline">
                  hello@templeconnect.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
