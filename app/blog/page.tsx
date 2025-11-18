import { BlogPosts } from 'app/components/posts'
import { getBlogPosts, getAllTags } from './utils'

export const metadata = {
  title: 'Blog',
  description: 'Leia minhas publicações sobre desenvolvimento de software.',
}

export default function Page() {
  const posts = getBlogPosts()
  const allTags = getAllTags()

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Publicações
      </h1>
      <BlogPosts posts={posts} allTags={allTags} />
    </section>
  )
}
