import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'

export default function Page() {
  return (
    <section>
      <img
        src="/profile.jpg"
        alt="Orlando Bitencourt"
        className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-700"
      />
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-center">
        Dev Orlando Bitencourt
      </h1>
      <p className="mb-4">
        {`Sou desenvolvedor de software apaixonado por criar, otimizar e explorar novas ideias.
          Atualmente estou trabalhando na @Serasa como desenvolvedor backend senior, desde 2021. 
          Minhas principais stacks são golang e python, acredito que as linguagens são apenas 
          ferramentas para transformar as regras do negocio em codigo e otimizar soluções.`}
      </p>
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Publicações recentes</h2>
        <BlogPosts limit={5} />
        <div className="mt-4">
          <Link 
            href="/blog" 
            className="text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Ver todas →
          </Link>
        </div>
      </div>
    </section>
  )
}