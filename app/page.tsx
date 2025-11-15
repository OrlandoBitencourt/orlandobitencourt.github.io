import { BlogPosts } from 'app/components/posts'

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
        <BlogPosts />
      </div>
    </section>
  )
}
