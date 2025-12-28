'use client'

import { useState } from 'react'

interface BlogSearchProps {
  allTags: string[]
  tagCounts: Record<string, number>
  onSearch: (query: string) => void
  onTagFilter: (tag: string | null) => void
  selectedTag: string | null
}

export default function BlogSearch({ allTags, tagCounts, onSearch, onTagFilter, selectedTag }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      onTagFilter(null)
    } else {
      onTagFilter(tag)
    }
  }

  // Contar posts únicos
  const uniquePostsCount = tagCounts['__total__'] || 0

  const hasActiveFilters = selectedTag !== null

  return (
    <div className="mb-8">
      {/* Search Input with Filter Button */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar posts por título ou conteúdo..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-500"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap relative"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

      {/* Collapsible Filters */}
      {showFilters && allTags.length > 0 && (
        <div className="space-y-6 pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
          {/* Tags Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-neutral-700 dark:text-neutral-300">
              Filtrar por categoria:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onTagFilter(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-neutral-600 text-white'
                    : 'bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                Todas
                <span className="ml-1.5 text-xs opacity-80">
                  ({uniquePostsCount})
                </span>
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-neutral-600 text-white'
                      : 'bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {tag}
                  <span className="ml-1.5 text-xs opacity-80">
                    ({tagCounts[tag] || 0})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
