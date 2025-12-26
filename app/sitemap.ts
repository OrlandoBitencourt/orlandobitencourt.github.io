import { getBlogPosts } from 'app/blog/utils'
import { getChallengePosts } from 'app/challenges/utils'

export const baseUrl = 'https://orlandobitencourt.github.io'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let challenges = getChallengePosts().map((post) => ({
    url: `${baseUrl}/challenges/${post.slug}`,
    lastModified: post.metadata.date,
  }))

  let routes = ['', '/blog', '/challenges'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...challenges]
}
