'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Buscar todos os headings (h2, h3) do artigo
    const article = document.querySelector('article')
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const headingsList: Heading[] = []

    elements.forEach((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') || ''
      
      // Adicionar ID ao elemento se não tiver
      if (!element.id) {
        element.id = id
      }

      headingsList.push({
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      })
    })

    setHeadings(headingsList)

    // Observer para detectar qual seção está visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="mb-8 p-5 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Neste artigo
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
