'use client'

import { Edit, Plus, Star, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { mockTemples } from '@/lib/mock-temples'

interface TempleFormData {
  name: string
  location: string
  state: string
  deity: string
  rating: number
  reviews: number
  entryFee: string
  visitingHours: string
}

export default function AdminDashboard() {
  const [temples, setTemples] = useState(mockTemples)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<TempleFormData>({
    name: '',
    location: '',
    state: '',
    deity: '',
    rating: 4.5,
    reviews: 0,
    entryFee: 'Free',
    visitingHours: '6:00 AM - 9:00 PM',
  })

  const handleAddTemple = () => {
    if (!formData.name || !formData.location || !formData.state) {
      alert('Please fill in all required fields')
      return
    }

    const newTemple = {
      id: String(temples.length + 1),
      ...formData,
      image: 'https://images.unsplash.com/photo-1599581423571-7d830c90c6b6?w=500&h=400&fit=crop',
      description: 'Temple description',
      founded: 2024,
      architecture: 'Modern',
      facilities: [],
      bestTimeToVisit: 'Year-round',
    }

    setTemples([...temples, newTemple])
    setFormData({
      name: '',
      location: '',
      state: '',
      deity: '',
      rating: 4.5,
      reviews: 0,
      entryFee: 'Free',
      visitingHours: '6:00 AM - 9:00 PM',
    })
    setShowAddModal(false)
    alert('Temple added successfully!')
  }

  const handleDeleteTemple = (id: string) => {
    if (confirm('Are you sure you want to delete this temple?')) {
      setTemples(temples.filter((t) => t.id !== id))
      alert('Temple deleted successfully!')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground">Manage temples and view statistics</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all w-full md:w-auto mt-4 md:mt-0 justify-center md:justify-start"
            >
              <Plus className="w-5 h-5" />
              Add Temple
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Temples</p>
                  <p className="text-4xl font-bold text-foreground">{temples.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                  <p className="text-4xl font-bold text-foreground">
                    {(temples.reduce((sum, t) => sum + t.rating, 0) / temples.length).toFixed(1)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
                  <p className="text-4xl font-bold text-foreground">
                    {temples.reduce((sum, t) => sum + t.reviews, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Temples List */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Temple Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Deity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Reviews</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {temples.map((temple) => (
                    <tr key={temple.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{temple.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{temple.location}</td>
                      <td className="px-6 py-4 text-muted-foreground">{temple.deity}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-foreground font-medium">{temple.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{temple.reviews}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingId(temple.id)}
                            className="p-2 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTemple(temple.id)}
                            className="p-2 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Temple Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card border border-border rounded-lg max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Add New Temple</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Temple Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Temple name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="City name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="State name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Deity</label>
                    <input
                      type="text"
                      value={formData.deity}
                      onChange={(e) => setFormData({ ...formData, deity: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Primary deity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTemple}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded font-semibold hover:shadow-lg transition-all"
                  >
                    Add Temple
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
