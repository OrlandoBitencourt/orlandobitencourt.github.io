'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ExecutableCodeProps {
  code: string
  language?: string
  output: string
  title?: string
}

export default function ExecutableCode({
  code,
  language = 'go',
  output,
  title = 'Exemplo Interativo'
}: ExecutableCodeProps) {
  const [isExecuting, setIsExecuting] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [copied, setCopied] = useState(false)

  const executeCode = async () => {
    setIsExecuting(true)
    setShowOutput(false)

    // Simula tempo de execução (10ms como solicitado)
    await new Promise(resolve => setTimeout(resolve, 10))

    setIsExecuting(false)
    setShowOutput(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar código:', err)
    }
  }

  return (
    <div className="my-6 border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-semibold text-neutral-400 ml-2">
            {title}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
            aria-label="Copiar código"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copiado
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </>
            )}
          </button>
          <button
            onClick={executeCode}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded transition-colors"
            aria-label="Executar código"
          >
            {isExecuting ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Executando...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Executar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5',
            background: 'transparent',
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
          {code.trim()}
        </SyntaxHighlighter>
      </div>

      {/* Output */}
      {showOutput && (
        <div className="border-t border-neutral-700 bg-black">
          <div className="px-4 py-2 bg-neutral-800 border-b border-neutral-700">
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Output
            </span>
          </div>
          <div className="px-4 py-3 font-mono text-sm text-green-400">
            <pre className="whitespace-pre-wrap">{output.trim()}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
