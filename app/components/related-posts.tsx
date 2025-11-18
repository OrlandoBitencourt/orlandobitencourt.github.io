'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    thumbnail?: string
    tags?: string[]
  }
}

interface RelatedPostsProps {
  currentSlug: string
  currentTags?: string[]
  allPosts: Post[]
}

function formatDate(date: string) {
  let targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  return targetDate.toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function RelatedPosts({ currentSlug, currentTags = [], allPosts }: RelatedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Atualizar número de cards visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    updateCardsToShow()
    window.addEventListener('resize', updateCardsToShow)
    return () => window.removeEventListener('resize', updateCardsToShow)
  }, [])

  // Calcular posts relacionados
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug) // Excluir post atual
    .map(post => {
      // Calcular score de relevância
      let score = 0
      
      // Posts com tags em comum ganham pontos
      if (currentTags.length > 0 && post.metadata.tags) {
        const commonTags = post.metadata.tags.filter(tag => currentTags.includes(tag))
        score += commonTags.length * 10
      }
      
      // Posts mais recentes ganham pontos
      const daysSincePublished = Math.floor(
        (Date.now() - new Date(post.metadata.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      score += Math.max(0, 30 - daysSincePublished) // Máximo 30 pontos para posts recentes
      
      return { ...post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6) // Máximo 6 posts relacionados

  if (relatedPosts.length === 0) return null

  const maxIndex = Math.max(0, relatedPosts.length - cardsToShow)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Posts Relacionados
        </h2>
        
        {/* Navigation Arrows - Desktop */}
        {relatedPosts.length > cardsToShow && (
          <div className="hidden sm:flex gap-2">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`p-2 rounded-full transition-all ${
                canGoPrev
                  ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
              }`}
              aria-label="Post anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-2 rounded-full transition-all ${
                canGoNext
                  ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
              }`}
              aria-label="Próximo post"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-500 ease-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex-shrink-0 group"
              style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 16 / cardsToShow}px)` }}
            >
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500">
                {/* Thumbnail */}
                {post.metadata.thumbnail && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.metadata.thumbnail}
                      alt={post.metadata.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                  
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.metadata.title}
                  </h3>
                  
                  {post.metadata.summary && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                      {post.metadata.summary}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.metadata.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.metadata.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs">
                          +{post.metadata.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots Indicator - Mobile */}
      {relatedPosts.length > cardsToShow && (
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-blue-400 w-6'
                  : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Navigation Arrows */}
      {relatedPosts.length > cardsToShow && (
        <div className="flex sm:hidden justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`px-4 py-2 rounded-lg transition-all ${
              canGoPrev
                ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
            }`}
          >
            ← Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`px-4 py-2 rounded-lg transition-all ${
              canGoNext
                ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
            }`}
          >
            Próximo →
          </button>
        </div>
      )}
    </div>
  )
}
