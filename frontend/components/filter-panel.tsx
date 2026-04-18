'use client'

import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

export interface Filters {
  state: string[]
  rating: number
  architecture: string[]
  sortBy: 'name' | 'rating' | 'founded'
}

interface FilterPanelProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onClose?: () => void
}

const STATES = ['Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh']
const ARCHITECTURES = ['South Indian', 'North Indian', 'Medieval', 'Modern', 'Ancient']
const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'founded', label: 'Oldest First' },
]

export default function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    state: true,
    rating: true,
    architecture: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleState = (state: string) => {
    onChange({
      ...filters,
      state: filters.state.includes(state)
        ? filters.state.filter((s) => s !== state)
        : [...filters.state, state],
    })
  }

  const toggleArchitecture = (arch: string) => {
    onChange({
      ...filters,
      architecture: filters.architecture.includes(arch)
        ? filters.architecture.filter((a) => a !== arch)
        : [...filters.architecture, arch],
    })
  }

  const handleRatingChange = (rating: number) => {
    onChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    })
  }

  const handleSortChange = (sortBy: Filters['sortBy']) => {
    onChange({
      ...filters,
      sortBy,
    })
  }

  const resetFilters = () => {
    onChange({
      state: [],
      rating: 0,
      architecture: [],
      sortBy: 'name',
    })
  }

  const hasActiveFilters = filters.state.length > 0 || filters.rating > 0 || filters.architecture.length > 0

  return (
    <div className="w-full lg:w-64 bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as Filters['sortBy'])}
          className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between mb-3 text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>Rating</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2 pl-0">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* State Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('state')}
          className="w-full flex items-center justify-between mb-3 text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>State</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.state ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.state && (
          <div className="space-y-2">
            {STATES.map((state) => (
              <label key={state} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.state.includes(state)}
                  onChange={() => toggleState(state)}
                  className="w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">{state}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Architecture Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('architecture')}
          className="w-full flex items-center justify-between mb-3 text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>Architecture</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.architecture ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.architecture && (
          <div className="space-y-2">
            {ARCHITECTURES.map((arch) => (
              <label key={arch} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.architecture.includes(arch)}
                  onChange={() => toggleArchitecture(arch)}
                  className="w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-foreground">{arch}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full py-2 px-3 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded text-sm font-medium transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  )
}
