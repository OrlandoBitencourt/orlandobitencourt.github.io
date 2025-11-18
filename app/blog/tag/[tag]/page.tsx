import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPosts, formatDate, getAllTags } from 'app/blog/utils'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `Posts sobre ${decodedTag}`,
    description: `Todos os posts sobre ${decodedTag}`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const allPosts = getBlogPosts()
  const filteredPosts = allPosts
    .filter(post => post.metadata.tags?.includes(decodedTag))
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <section>
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 dark:hover:text-neutral-100 mb-4 inline-flex items-center gap-1"
        >
          ← Voltar para o blog
        </Link>
        <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
          Posts sobre: {decodedTag}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
        </p>
      </div>

      <div>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col md:flex-row gap-4 mb-6 hover:opacity-80 transition-opacity"
            href={`/blog/${post.slug}`}
          >
            {post.metadata.thumbnail && (
              <img
                src={post.metadata.thumbnail}
                alt={post.metadata.title}
                className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex flex-col justify-center">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight mb-2">
                {post.metadata.title}
              </h3>
              {post.metadata.summary && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-2">
                  {post.metadata.summary}
                </p>
              )}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        tag === decodedTag
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
