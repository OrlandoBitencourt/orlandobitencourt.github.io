import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        Ops! Parece que você encontrou uma página que não existe. 
        Talvez ela tenha sido movida ou o link está incorreto.
      </p>
      
      {/* Imagem 404 */}
      <div className="mb-8">
        <img
          src="/404.jpg"
          alt="Página não encontrada"
          className="w-13 h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link
          href="/"
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl text-center"
        >
          ← Voltar para Home
        </Link>
        
        <Link
          href="/blog"
          className="flex-1 px-6 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg transition-colors text-center"
        >
          Ver Blog
        </Link>
      </div>

      {/* Links Úteis */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 w-full max-w-md">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Ou explore outras páginas:
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/about"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sobre Mim
          </Link>
          <span className="text-neutral-400">•</span>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Contato
          </Link>
          <span className="text-neutral-400">•</span>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Todos os Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
