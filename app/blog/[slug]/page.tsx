import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import Comments from 'app/components/comments'
import AuthorCard from 'app/components/author-card'

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) return

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  // Use the post's image, thumbnail, or a default OG image
  const ogImage = image 
    ? `${baseUrl}${image}` 
    : post.metadata.thumbnail 
    ? `${baseUrl}${post.metadata.thumbnail}`
    : `${baseUrl}/default.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) notFound()

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : post.metadata.thumbnail
              ? `${baseUrl}${post.metadata.thumbnail}`
              : `${baseUrl}/default-og.png`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Orlando Cechlar Bitencourt',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Data de publicação: {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <div className="flex">
        <img
          src={post.metadata.thumbnail}
          alt={post.metadata.title}
          className="h-full w-[400px] object-contain"
        />
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
        <AuthorCard />
        <Comments />
      </article>
    </section>
  )
}