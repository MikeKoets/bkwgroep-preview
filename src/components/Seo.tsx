import { useEffect } from 'react'

export function Seo({
  title,
  description,
}: {
  title: string
  description: string
}) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.append(meta)
    }
    meta.content = description
    for (const [property, content] of Object.entries({ 'og:title': title, 'og:description': description })) {
      const tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      if (tag) tag.content = content
    }
  }, [description, title])

  return null
}
