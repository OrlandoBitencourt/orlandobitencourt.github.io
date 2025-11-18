import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  thumbnail?: string
  tags?: string[]
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
    
    // Handle tags array
    if (trimmedKey === 'tags') {
      // Check if it's an array format
      if (value.startsWith('[') && value.endsWith(']')) {
        metadata.tags = value
          .slice(1, -1)
          .split(',')
          .map(tag => tag.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      }
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

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function getAllTags() {
  const posts = getBlogPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  
  return Array.from(tagsSet).sort()
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
