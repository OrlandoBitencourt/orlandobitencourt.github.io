import Link from 'next/link'

export default function ChallengeNotFound() {
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Desafio Não Encontrado
      </h1>

      {/* Mensagem */}
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        O desafio que você está procurando não existe ou foi removido.
        Que tal explorar outros desafios?
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
        <Link
          href="/challenges"
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl text-center"
        >
          Ver Todos os Desafios
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
          💡 <strong>Dica:</strong> Use a busca na página de desafios para encontrar desafios por plataforma, dificuldade ou tecnologia!
        </p>
      </div>
    </section>
  )
}
