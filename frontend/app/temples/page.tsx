'use client'

import { Layout, LayoutGrid } from 'lucide-react'
import { useMemo, useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import FilterPanel, { Filters } from '@/components/filter-panel'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import TempleCard from '@/components/temple-card'
import { mockTemples } from '@/lib/mock-temples'

const ITEMS_PER_PAGE = 12

export default function TemplesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({
    state: [],
    rating: 0,
    architecture: [],
    sortBy: 'name',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort temples
  const filteredTemples = useMemo(() => {
    let result = [...mockTemples]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (temple) =>
          temple.name.toLowerCase().includes(query) ||
          temple.location.toLowerCase().includes(query) ||
          temple.deity.toLowerCase().includes(query) ||
          temple.description.toLowerCase().includes(query)
      )
    }

    // State filter
    if (filters.state.length > 0) {
      result = result.filter((temple) => filters.state.includes(temple.state))
    }

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter((temple) => temple.rating >= filters.rating)
    }

    // Architecture filter
    if (filters.architecture.length > 0) {
      result = result.filter((temple) => filters.architecture.includes(temple.architecture))
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'founded':
        result.sort((a, b) => a.founded - b.founded)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [searchQuery, filters])

  // Pagination
  const totalPages = Math.ceil(filteredTemples.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTemples = filteredTemples.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Explore Temples</h1>
            <p className="text-lg text-muted-foreground">
              Browse {filteredTemples.length} sacred temples across India
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
                aria-label="List view"
              >
                <Layout className="w-5 h-5" />
              </button>
              <div className="ml-4 text-sm text-muted-foreground">
                {filteredTemples.length} temples found
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Filters
            </button>
          </div>

          {/* Filters and Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {filteredTemples.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-foreground mb-2">No temples found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilters({
                        state: [],
                        rating: 0,
                        architecture: [],
                        sortBy: 'name',
                      })
                      setCurrentPage(1)
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paginatedTemples.map((temple) => (
                        <TempleCard key={temple.id} temple={temple} variant="grid" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paginatedTemples.map((temple) => (
                        <TempleCard key={temple.id} temple={temple} variant="list" />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
