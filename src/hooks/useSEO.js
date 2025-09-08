import { useEffect } from 'react'
import { seoConfig } from '../data/seo'

// Custom hook for managing SEO meta tags
export const useSEO = ({ 
  title, 
  description, 
  keywords = [], 
  image = seoConfig.images.default,
  url = seoConfig.siteUrl 
}) => {
  
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | ${seoConfig.siteName}`
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords && keywords.length > 0) {
      const allKeywords = [...seoConfig.keywords, ...keywords]
      metaKeywords.setAttribute('content', allKeywords.join(', '))
    }

    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')
    const ogUrl = document.querySelector('meta[property="og:url"]')

    if (ogTitle && title) {
      ogTitle.setAttribute('content', `${title} | ${seoConfig.siteName}`)
    }
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description)
    }
    if (ogImage && image) {
      ogImage.setAttribute('content', `${seoConfig.siteUrl}${image}`)
    }
    if (ogUrl && url) {
      ogUrl.setAttribute('content', url)
    }

    // Update Twitter meta tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    const twitterDescription = document.querySelector('meta[property="twitter:description"]')
    const twitterImage = document.querySelector('meta[property="twitter:image"]')
    const twitterUrl = document.querySelector('meta[property="twitter:url"]')

    if (twitterTitle && title) {
      twitterTitle.setAttribute('content', `${title} | ${seoConfig.siteName}`)
    }
    if (twitterDescription && description) {
      twitterDescription.setAttribute('content', description)
    }
    if (twitterImage && image) {
      twitterImage.setAttribute('content', `${seoConfig.siteUrl}${image}`)
    }
    if (twitterUrl && url) {
      twitterUrl.setAttribute('content', url)
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink && url) {
      canonicalLink.setAttribute('href', url)
    }

  }, [title, description, keywords, image, url])
}

// Helper function to add structured data
export const addStructuredData = (data, id = 'structured-data') => {
  // Remove existing structured data
  const existingScript = document.getElementById(id)
  if (existingScript) {
    existingScript.remove()
  }

  // Add new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

// Preload critical resources
export const preloadResources = (resources = []) => {
  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as || 'image'
    if (resource.type) link.type = resource.type
    document.head.appendChild(link)
  })
}
