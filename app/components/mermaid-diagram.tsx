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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))
  const handleResetZoom = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (isFullscreen) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
    }
  }

  const renderDiagram = (isModal: boolean = false) => (
    <div
      className={`flex items-center justify-center mermaid-diagram ${
        isModal && zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{
        transform: isModal ? `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` : undefined,
        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
      }}
      onMouseDown={isModal ? handleMouseDown : undefined}
      onMouseMove={isModal ? handleMouseMove : undefined}
      onMouseUp={isModal ? handleMouseUp : undefined}
      onMouseLeave={isModal ? handleMouseUp : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )

  return (
    <>
      <div className={`my-8 ${className}`}>
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
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
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 rounded-md bg-neutral-800/50 px-3 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
              title="Ver em tela cheia"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              Expandir
            </button>
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
            <div ref={elementRef}>{renderDiagram(false)}</div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && !isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullscreen(false)
          }}
        >
          <div className="relative h-full w-full" onWheel={handleWheel}>
            {/* Header */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-6 py-4 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-neutral-200">{title || 'Diagrama'}</h3>
              <div className="flex items-center gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/50 p-1">
                  <button
                    onClick={handleZoomOut}
                    className="rounded p-1.5 transition-colors hover:bg-neutral-700"
                    title="Zoom out"
                    disabled={zoom <= 0.5}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="min-w-[4rem] text-center text-sm font-medium text-neutral-300">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="rounded p-1.5 transition-colors hover:bg-neutral-700"
                    title="Zoom in"
                    disabled={zoom >= 3}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="ml-1 rounded px-2 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-700"
                    title="Reset zoom"
                  >
                    Reset
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-neutral-800"
                  title="Fechar"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Diagram Container */}
            <div className="flex h-full items-center justify-center overflow-hidden p-20">
              {renderDiagram(true)}
            </div>

            {/* Helper Text */}
            {zoom > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg border border-neutral-700 bg-neutral-900/90 px-4 py-2 text-xs text-neutral-400 backdrop-blur-sm">
                💡 Arraste para mover • Use scroll para zoom
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
