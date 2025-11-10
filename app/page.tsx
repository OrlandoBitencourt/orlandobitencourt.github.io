import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Blog de Orlando
      </h1>
      <p className="mb-4">
        {`Sou desenvolvedor de software apaixonado por criar, otimizar e explorar novas ideias.
          Atualmente estou trabalhando na Serasa como desenvolvedor backend senior, desde 2021. 
          Minhas principais stacks são golang e python, porem eu ja me aventurei com no code 
          (polêmico hehe) e agora com vibe coding (cursor + claude sonet 4.5 etc).`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
