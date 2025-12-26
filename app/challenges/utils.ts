import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  slug: string
  platform: string
  difficulty: 1 | 2 | 3 | 4 | 5
  languages: string[]
  tags: string[]
  sourceUrl?: string
  date: string
  summary?: string
  thumbnail?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes

    const trimmedKey = key.trim()

    // Handle array fields (tags, languages)
    if (trimmedKey === 'tags' || trimmedKey === 'languages') {
      // Check if it's an array format
      if (value.startsWith('[') && value.endsWith(']')) {
        (metadata as any)[trimmedKey] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      }
    } else if (trimmedKey === 'difficulty') {
      // Convert difficulty to number
      (metadata as any)[trimmedKey] = parseInt(value, 10)
    } else {
      // Type assertion to avoid TypeScript errors
      (metadata as any)[trimmedKey] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getChallengePosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'challenges', 'posts'))
}

export function getAllTags() {
  const posts = getChallengePosts()
  const tagsSet = new Set<string>()

  posts.forEach(post => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach(tag => tagsSet.add(tag))
    }
  })

  return Array.from(tagsSet).sort()
}

export function getTagCounts() {
  const posts = getChallengePosts()
  const tagCounts: Record<string, number> = {}

  posts.forEach(post => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // Adicionar contagem total de posts únicos
  tagCounts['__total__'] = posts.length

  return tagCounts
}

export function getAllPlatforms() {
  const posts = getChallengePosts()
  const platformsSet = new Set<string>()

  posts.forEach(post => {
    if (post.metadata.platform) {
      platformsSet.add(post.metadata.platform)
    }
  })

  return Array.from(platformsSet).sort()
}

export function getPlatformCounts() {
  const posts = getChallengePosts()
  const platformCounts: Record<string, number> = {}

  posts.forEach(post => {
    if (post.metadata.platform) {
      platformCounts[post.metadata.platform] = (platformCounts[post.metadata.platform] || 0) + 1
    }
  })

  return platformCounts
}

export function getDifficultyCounts() {
  const posts = getChallengePosts()
  const difficultyCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }

  posts.forEach(post => {
    if (post.metadata.difficulty) {
      difficultyCounts[post.metadata.difficulty]++
    }
  })

  return difficultyCounts
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}a atrás`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}m atrás`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d atrás`
  } else {
    formattedDate = 'Hoje'
  }

  let fullDate = targetDate.toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
