'use client'

import Giscus from '@giscus/react'

export default function Comments() {
  return (
    <div className="mt-12">
      <Giscus
        id="comments"
        repo="https://OrlandoBitencourt/orlandobitencourt.github.io"
        repoId="R_kgDOQSgBjQ"
        category="General"
        categoryId="DIC_kwDOQSgBjc4Cxv"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="noborder_dark"
        lang="pt"
        loading="lazy"
      />
    </div>
  )
}
