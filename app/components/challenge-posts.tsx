'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ChallengeSearch from './challenge-search'

type Post = {
  slug: string
  metadata: {
    title: string
    slug: string
    platform: string
    difficulty: 1 | 2 | 3 | 4 | 5
    languages: string[]
    tags: string[]
    sourceUrl?: string
    date: string
    summary?: string
    thumbnail?: string
  }
  content: string
}

interface ChallengePostsProps {
  posts: Post[]
  allTags: string[]
  limit?: number
  tagCounts: Record<string, number>
  difficultyCounts: Record<number, number>
  allPlatforms: string[]
}

function formatDate(date: string) {
  let targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  return targetDate.toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function renderStars(count: number) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-current text-blue-700 dark:text-blue-300" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  )
}

export function ChallengePosts({ posts, allTags, limit, tagCounts, difficultyCounts, allPlatforms }: ChallengePostsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  // Filter and search logic
  const filteredChallenges = useMemo(() => {
    let filtered = posts

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.metadata.tags?.includes(selectedTag)
      )
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter(post =>
        post.metadata.difficulty === selectedDifficulty
      )
    }

    // Filter by platform
    if (selectedPlatform) {
      filtered = filtered.filter(post =>
        post.metadata.platform === selectedPlatform
      )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => {
        const titleMatch = post.metadata.title.toLowerCase().includes(query)
        const summaryMatch = post.metadata.summary?.toLowerCase().includes(query)
        const contentMatch = post.content.toLowerCase().includes(query)
        const tagsMatch = post.metadata.tags?.some(tag =>
          tag.toLowerCase().includes(query)
        )
        const platformMatch = post.metadata.platform.toLowerCase().includes(query)
        return titleMatch || summaryMatch || contentMatch || tagsMatch || platformMatch
      })
    }

    // Sort by date
    filtered = filtered.sort((a, b) => {
      if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
        return -1
      }
      return 1
    })

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [posts, searchQuery, selectedTag, selectedDifficulty, selectedPlatform, limit])

  return (
    <div>
      {/* Only show search on pages without limit (full challenges page) */}
      {!limit && (
        <ChallengeSearch
          allTags={allTags}
          allPlatforms={allPlatforms}
          onSearch={setSearchQuery}
          onTagFilter={setSelectedTag}
          onDifficultyFilter={setSelectedDifficulty}
          onPlatformFilter={setSelectedPlatform}
          selectedTag={selectedTag}
          selectedDifficulty={selectedDifficulty}
          selectedPlatform={selectedPlatform}
          tagCounts={tagCounts}
          difficultyCounts={difficultyCounts}
        />
      )}

      {/* Results count */}
      {(searchQuery || selectedTag || selectedDifficulty || selectedPlatform) && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          {filteredChallenges.length} {filteredChallenges.length === 1 ? 'desafio encontrado' : 'desafios encontrados'}
        </p>
      )}

      {/* Challenges list */}
      {filteredChallenges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400 mb-2">
            Nenhum desafio encontrado
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedTag(null)
              setSelectedDifficulty(null)
              setSelectedPlatform(null)
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div>
          {filteredChallenges.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col md:flex-row gap-4 mb-6 hover:opacity-80 transition-opacity"
              href={`/challenges/${post.slug}`}
            >
              {post.metadata.thumbnail && (
                <img
                  src={post.metadata.thumbnail}
                  alt={post.metadata.title}
                  className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded text-xs font-medium flex items-center gap-1">
                    {renderStars(post.metadata.difficulty)}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    {post.metadata.platform}
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                    {formatDate(post.metadata.date)}
                  </p>
                </div>
                <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight mb-2">
                  {post.metadata.title}
                </h3>
                {post.metadata.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-2">
                    {post.metadata.summary}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {post.metadata.languages && post.metadata.languages.length > 0 && (
                    post.metadata.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                      >
                        {lang}
                      </span>
                    ))
                  )}
                  {post.metadata.tags && post.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
