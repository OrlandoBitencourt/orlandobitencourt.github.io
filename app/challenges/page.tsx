import { ChallengePosts } from 'app/components/challenge-posts'
import { getChallengePosts, getAllTags, getTagCounts, getDifficultyCounts, getAllPlatforms } from './utils'

export const metadata = {
  title: 'Desafios',
  description: 'Soluções de desafios de programação de várias plataformas.',
}

export default function Page() {
  const posts = getChallengePosts()
  const allTags = getAllTags()
  const tagCounts = getTagCounts()
  const difficultyCounts = getDifficultyCounts()
  const allPlatforms = getAllPlatforms()

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Desafios de Programação
      </h1>
      <ChallengePosts
        posts={posts}
        allTags={allTags}
        tagCounts={tagCounts}
        difficultyCounts={difficultyCounts}
        allPlatforms={allPlatforms}
      />
    </section>
  )
}
