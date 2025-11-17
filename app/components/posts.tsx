import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ limit }: { limit?: number }) {
  let allBlogs = getBlogPosts()

  // Se um limite for especificado, corta o array
  if (limit) {
    allBlogs = allBlogs.slice(0, limit)
  }

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
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
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                  {post.metadata.summary}
                </p>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
}