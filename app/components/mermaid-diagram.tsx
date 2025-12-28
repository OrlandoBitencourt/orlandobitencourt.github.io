'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  title?: string
  className?: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart, title, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const renderDiagram = async () => {
      try {
        setIsLoading(true)

        // Dynamic import to ensure it runs only on client
        const mermaid = (await import('mermaid')).default

        // Initialize only once
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              primaryColor: '#3b82f6',
              primaryTextColor: '#fff',
              primaryBorderColor: '#1e40af',
              lineColor: '#64748b',
              secondaryColor: '#8b5cf6',
              tertiaryColor: '#10b981',
              background: '#0f172a',
              mainBkg: '#1e293b',
              secondBkg: '#334155',
              textColor: '#e2e8f0',
              border1: '#475569',
              border2: '#64748b',
            },
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              curve: 'basis',
            },
            sequence: {
              useMaxWidth: true,
              diagramMarginX: 20,
              diagramMarginY: 20,
            },
          })
          mermaidInitialized = true
        }

        if (!isMounted) return

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg } = await mermaid.render(id, chart)

        if (isMounted) {
          setSvg(svg)
          setError('')
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
          setIsLoading(false)
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [chart])

  if (error) {
    return (
      <div className="my-8 rounded-lg border border-red-500/20 bg-red-500/10 p-6">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 shrink-0 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-400">Erro ao renderizar diagrama</h3>
            <p className="mt-1 text-sm text-red-300/80">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`my-8 ${className}`}>
      {title && (
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-neutral-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {title}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-neutral-500">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm">Renderizando diagrama...</span>
            </div>
          </div>
        ) : (
          <div
            ref={elementRef}
            className="flex items-center justify-center mermaid-diagram"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  )
}
