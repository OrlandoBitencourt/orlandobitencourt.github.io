import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChallengePosts, formatDate, getAllTags } from 'app/challenges/utils'

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
    title: `Desafios sobre ${decodedTag}`,
    description: `Todos os desafios sobre ${decodedTag}`,
  }
}

function renderStars(count: number) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-current text-blue-700 dark:text-blue-300" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  )
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const allPosts = getChallengePosts()
  const filteredPosts = allPosts
    .filter(post => post.metadata.tags?.includes(decodedTag))
    .sort((a, b) => {
      if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
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
          href="/challenges"
          className="text-sm bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30 dark:hover:text-neutral-100 mb-4 inline-flex items-center gap-1"
        >
          ← Voltar para desafios
        </Link>
        <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
          Desafios sobre: {decodedTag}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'desafio encontrado' : 'desafios encontrados'}
        </p>
      </div>

      <div>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col md:flex-row gap-4 mb-6 hover:opacity-80 transition-opacity"
            href={`/challenges/${post.slug}`}
          >
            {post.metadata.thumbnail && (
              <img
                src={post.metadata.thumbnail}
                alt={post.metadata.title}
                className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded text-xs font-medium flex items-center gap-1">
                  {renderStars(post.metadata.difficulty)}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                  {post.metadata.platform}
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                  {formatDate(post.metadata.date, false)}
                </p>
              </div>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold tracking-tight mb-2">
                {post.metadata.title}
              </h3>
              {post.metadata.summary && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-2">
                  {post.metadata.summary}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {post.metadata.languages && post.metadata.languages.length > 0 && (
                  post.metadata.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))
                )}
                {post.metadata.tags && post.metadata.tags.map((postTag) => (
                  <span
                    key={postTag}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      postTag === decodedTag
                        ? 'bg-neutral-600 text-white'
                        : 'bg-gradient-to-r from-neutral-50 to-indigo-50 dark:from-neutral-950/30 dark:to-indigo-950/30'
                    }`}
                  >
                    {postTag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
