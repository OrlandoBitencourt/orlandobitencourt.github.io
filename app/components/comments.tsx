'use client'

import Giscus from '@giscus/react'

export default function Comments() {
  return (
    <div className="mt-12">
      <Giscus
        id="comments"
        repo="OrlandoBitencourt/ob-blog-comments"
        repoId="R_kgDOQU5iGg"
        category="Comments"
        categoryId="DIC_kwDOQU5iGs4CxyHO"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="noborder_dark"
        lang="pt"
        loading="lazy"
      />
    </div>
  )
}
