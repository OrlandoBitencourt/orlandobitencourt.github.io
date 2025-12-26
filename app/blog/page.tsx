import { BlogPosts } from 'app/components/posts'
import { getBlogPosts, getAllTags, getTagCounts } from './utils'

export const metadata = {
  title: 'Artigos',
  description: 'Leia meus artigos sobre desenvolvimento de software.',
}

export default function Page() {
  const posts = getBlogPosts()
  const allTags = getAllTags()
  const tagCounts = getTagCounts()

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center">
        Artigos
      </h1>
      <BlogPosts posts={posts} allTags={allTags} tagCounts={tagCounts} />
    </section>
  )
}
