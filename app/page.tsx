import { BlogPosts } from 'app/components/posts'
import { ChallengePosts } from 'app/components/challenge-posts'
import { getBlogPosts, getAllTags, getTagCounts } from 'app/blog/utils'
import { getChallengePosts, getAllTags as getAllChallengeTags, getTagCounts as getChallengeTagCounts, getDifficultyCounts, getAllPlatforms } from 'app/challenges/utils'
import Link from 'next/link'

export default function Page() {
  const posts = getBlogPosts()
  const allTags = getAllTags()
  const tagCounts = getTagCounts()

  const challenges = getChallengePosts()
  const allChallengeTags = getAllChallengeTags()
  const challengeTagCounts = getChallengeTagCounts()
  const difficultyCounts = getDifficultyCounts()
  const allPlatforms = getAllPlatforms()

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
        <h2 className="text-xl font-semibold mb-4">Últimas Publicações</h2>
        <BlogPosts posts={posts} allTags={allTags} tagCounts={tagCounts} limit={3} />
        <div className="mt-4">
          <Link
            href="/blog"
            className="text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Ver todas as publicações →
          </Link>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Últimos Desafios de Código</h2>
        <ChallengePosts
          posts={challenges}
          allTags={allChallengeTags}
          tagCounts={challengeTagCounts}
          difficultyCounts={difficultyCounts}
          allPlatforms={allPlatforms}
          limit={3}
        />
        <div className="mt-4">
          <Link
            href="/challenges"
            className="text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            Ver todos os desafios →
          </Link>
        </div>
      </div>
    </section>
  )
}