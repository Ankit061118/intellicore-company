import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_DESCRIPTION = 'Nexora Labs brings strategy, design, and technology together to build useful digital products and intelligent systems.'
const DEFAULT_IMAGE = '/images/circuit-board.jpg'

function getMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.append(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
  return element
}

function useDocumentTitle(title, description = DEFAULT_DESCRIPTION, { image = DEFAULT_IMAGE, type = 'website', noIndex = false } = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = `${title || 'Digital Product & AI Studio'} | Nexora Labs`
    const pageDescription = description || DEFAULT_DESCRIPTION
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
    const canonicalUrl = new URL(pathname, `${siteUrl.replace(/\/+$/, '')}/`).href
    const imageUrl = new URL(image, `${siteUrl.replace(/\/+$/, '')}/`).href

    document.title = pageTitle
    getMeta('meta[name="description"]', { name: 'description', content: pageDescription })
    getMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalUrl

    getMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    getMeta('meta[property="og:description"]', { property: 'og:description', content: pageDescription })
    getMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    getMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    getMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    getMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Nexora Labs' })
    getMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    getMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    getMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: pageDescription })
    getMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })
  }, [description, image, noIndex, pathname, title, type])
}

export default useDocumentTitle