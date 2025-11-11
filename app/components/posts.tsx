import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold tracking-tighter">
        Publicações
      </h2>
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
            className="block p-4 rounded-xl hover:bg-neutral-950 hover:scale-[1.02] transition-transform border border-neutral-800 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <div className="flex justify-center">
                <img
                  src={post.metadata.thumbnail}
                  alt={post.metadata.title}
                  className="h-24 w-auto object-contain"
                />
              </div>

              <li>
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <p className="text-sm text-gray-400">{post.metadata.summary}</p>
              </li>
            </div>
          </Link>
        ))}
    </div>
  )
}
