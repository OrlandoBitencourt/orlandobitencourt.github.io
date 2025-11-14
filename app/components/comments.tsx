'use client'
import { useEffect } from 'react'

export default function Comments() {
  useEffect(() => {
    // Evita inserir o script duas vezes
    const hasUtterances = document.querySelector('script[src="https://utteranc.es/client.js"]')
    if (hasUtterances) return

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'OrlandoBitencourt/ob-blog-comments')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('crossorigin', 'anonymous')

    const comments = document.getElementById('comments')
    comments?.appendChild(script)
  }, [])

  return <div id="comments" className="mt-12" />
}
