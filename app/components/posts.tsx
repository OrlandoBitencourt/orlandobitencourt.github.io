'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import BlogSearch from './blog-search'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    thumbnail?: string
    tags?: string[]
  }
  content: string
}

interface BlogPostsProps {
  posts: Post[]
  allTags: string[]
  limit?: number
  tagCounts: Record<string, number>
}

function formatDate(date: string) {
  let targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  return targetDate.toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogPosts({ posts, allTags, limit, tagCounts}: BlogPostsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    let filtered = posts

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.metadata.tags?.includes(selectedTag)
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
        return titleMatch || summaryMatch || contentMatch || tagsMatch
      })
    }

    // Sort by date
    filtered = filtered.sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [posts, searchQuery, selectedTag, limit])

  return (
    <div>
      {/* Only show search on pages without limit (full blog page) */}
      {!limit && (
        <BlogSearch
          allTags={allTags}
          onSearch={setSearchQuery}
          onTagFilter={setSelectedTag}
          selectedTag={selectedTag}
          tagCounts={tagCounts}
        />
      )}

      {/* Results count */}
      {(searchQuery || selectedTag) && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post encontrado' : 'posts encontrados'}
        </p>
      )}

      {/* Posts list */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400 mb-2">
            Nenhum post encontrado
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedTag(null)
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div>
          {filteredBlogs.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col md:flex-row gap-4 mb-6 hover:opacity-80 transition-opacity"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.thumbnail && (
                <img
                  src={post.metadata.thumbnail}
                  alt={post.metadata.title}
                  className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex flex-col justify-center">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">
                  {formatDate(post.metadata.publishedAt)}
                </p>
                <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight mb-2">
                  {post.metadata.title}
                </h3>
                {post.metadata.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-2">
                    {post.metadata.summary}
                  </p>
                )}
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
