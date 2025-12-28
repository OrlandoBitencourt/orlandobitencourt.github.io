'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  children: string
  className?: string
  inline?: boolean
}

export default function CodeBlock({ children, className, inline }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isDark, setIsDark] = useState(true)

  // Extrair a linguagem do className (ex: "language-javascript")
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : 'text'

  // Detectar tema do sistema
  if (typeof window !== 'undefined') {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark !== darkMode) {
      setIsDark(darkMode)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar código:', err)
    }
  }

  // Para código inline (backtick simples)
  if (inline) {
    return (
      <code className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-red-600 dark:text-red-400 rounded text-sm font-mono">
        {children}
      </code>
    )
  }

  // Para blocos de código (triple backticks)
  return (
    <div className="relative group my-6">
      {/* Header com linguagem e botão copiar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 dark:bg-neutral-900 border-b border-neutral-700 rounded-t-lg">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Código com syntax highlighting */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 0.5rem 0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#6b7280',
            userSelect: 'none',
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
