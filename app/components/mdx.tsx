'use client'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import React from 'react'

export function CustomMDX({ source }: { source: string }) {
  const [mdxModule, setMdxModule] = React.useState<any>(null)

  React.useEffect(() => {
    evaluate(source, { ...runtime, Fragment: React.Fragment })
      .then((mod) => setMdxModule(mod))
      .catch(console.error)
  }, [source])

  if (!mdxModule) {
    return <div>Loading...</div>
  }

  const { default: MDXContent } = mdxModule
  return <MDXContent />
}