'use client'

import { useEffect } from 'react'

export default function Comments() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'OrlandoBitencourt/ob-blog-comments')
    script.setAttribute('data-repo-id', 'R_kgDOQU5iGg')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOQU5iGs4CltEV')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '1')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'noborder_dark')
    script.setAttribute('data-lang', 'pt')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById('comments')
    if (comments) {
      comments.appendChild(script)
    }

    return () => {
      if (comments) {
        comments.innerHTML = ''
      }
    }
  }, [])

  return <div id="comments" className="mt-12" />
}
