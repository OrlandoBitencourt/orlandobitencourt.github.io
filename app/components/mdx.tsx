import { MDXRemote } from 'next-mdx-remote/rsc'
import CodeBlock from './code-block'
import ExecutableCode from './executable-code'

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: any) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <a href={href} {...props}>
        {props.children}
      </a>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <img alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props: any) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  )
}

// Componente para código inline e blocos
function Code({ children, className, ...props }: any) {
  const isInline = !className

  return (
    <CodeBlock 
      className={className} 
      inline={isInline}
      {...props}
    >
      {children}
    </CodeBlock>
  )
}

// Componente para pre (wrapper do code)
function Pre({ children }: any) {
  return <>{children}</>
}

let components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  Table,
  code: Code,
  pre: Pre,
  ExecutableCode,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
