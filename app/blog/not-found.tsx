import Link from 'next/link'

export default function BlogNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Ícone */}
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-neutral-400 dark:text-neutral-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 5v4a2 2 0 002 2h4"
          />
        </svg>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Post Não Encontrado
      </h1>

      {/* Mensagem */}
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        O post que você está procurando não existe ou foi removido.
        Que tal explorar outros conteúdos?
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
        <Link
          href="/blog"
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl text-center"
        >
          Ver Todos os Posts
        </Link>
        
        <Link
          href="/"
          className="flex-1 px-6 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg transition-colors text-center"
        >
          Voltar para Home
        </Link>
      </div>

      {/* Sugestão de busca */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg max-w-md">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Dica:</strong> Use a busca na página do blog para encontrar posts sobre temas específicos!
        </p>
      </div>
    </section>
  )
}