'use client'

import { useEffect } from 'react'

export default function Comments({ identifier, title, url }: {
  identifier: string
  title: string
  url: string
}) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://orlandobitencourt.disqus.com/embed.js'
    script.async = true
    script.setAttribute('data-timestamp', Date.now().toString())

    document.body.appendChild(script)

    return () => {
      const el = document.getElementById('dsq-embed-scr')
      if (el) el.remove()
    }
  }, [])

  return <div id="disqus_thread" className="mt-12" />
}
