import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getChallengePosts } from 'app/challenges/utils'
import { baseUrl } from 'app/sitemap'
import Comments from 'app/components/comments'
import AuthorCard from 'app/components/author-card'
import PostTags from 'app/components/post-tags'
import SocialShare from 'app/components/social-share'
import TableOfContents from 'app/components/table-of-contents'

export async function generateStaticParams() {
  const posts = getChallengePosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getChallengePosts().find((post) => post.slug === slug)
  if (!post) return

  const {
    title,
    date: publishedTime,
    summary: description,
    thumbnail,
  } = post.metadata

  // Use the post's thumbnail or a default OG image
  const ogImage = thumbnail
    ? `${baseUrl}${thumbnail}`
    : `${baseUrl}/default.jpg`

  return {
    title,
    description: description || `Desafio ${post.metadata.platform}: ${title}`,
    openGraph: {
      title,
      description: description || `Desafio ${post.metadata.platform}: ${title}`,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/challenges/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || `Desafio ${post.metadata.platform}: ${title}`,
      images: [ogImage],
    },
  }
}

function renderStars(count: number) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current text-blue-700 dark:text-blue-300" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  )
}

export default async function ChallengePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getChallengePosts().find((post) => post.slug === slug)

  if (!post) notFound()

  const postUrl = `${baseUrl}/challenges/${post.slug}`

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.summary || `Desafio ${post.metadata.platform}: ${post.metadata.title}`,
            image: post.metadata.thumbnail
              ? `${baseUrl}${post.metadata.thumbnail}`
              : `${baseUrl}/default.jpg`,
            url: postUrl,
            author: {
              '@type': 'Person',
              name: 'Orlando Cechlar Bitencourt',
            },
            proficiencyLevel: post.metadata.difficulty,
          }),
        }}
      />

      {/* Challenge Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium flex items-center gap-1.5">
            <span className="text-neutral-600 dark:text-neutral-400 text-xs">Dificuldade:</span>
            {renderStars(post.metadata.difficulty)}
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {post.metadata.platform}
          </span>
          {post.metadata.sourceUrl && (
            <a
              href={post.metadata.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              Ver Desafio Original
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        <h1 className="title font-semibold text-2xl tracking-tighter mb-4">
          {post.metadata.title}
        </h1>

        <div className="flex justify-between items-center mb-4 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Publicado em: {formatDate(post.metadata.date)}
          </p>
        </div>

        {/* Languages */}
        {post.metadata.languages && post.metadata.languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Linguagens:</span>
            {post.metadata.languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.metadata.tags && <PostTags tags={post.metadata.tags} />}
      </div>

      {/* Thumbnail */}
      {post.metadata.thumbnail && (
        <div className="flex mb-8">
          <img
            src={post.metadata.thumbnail}
            alt={post.metadata.title}
            className="h-full w-[400px] object-contain rounded-lg"
          />
        </div>
      )}

      {/* Table of Contents */}
      <TableOfContents />

      {/* Challenge Content */}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      {/* Author Card */}
      <AuthorCard />

      {/* Social Share */}
      <SocialShare
        title={post.metadata.title}
        url={postUrl}
        description={post.metadata.summary || `Desafio ${post.metadata.platform}: ${post.metadata.title}`}
      />

      {/* Comments */}
      <Comments />
    </section>
  )
}
