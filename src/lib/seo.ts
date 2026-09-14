import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Forensic Science Learning Platform'

interface MetaInput {
  title?: string
  description?: string
  path?: string
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO({ title, description, path }: MetaInput) {
  const location = useLocation()
  const currentPath = path ?? location.pathname

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle
    if (description) {
      setMeta('description', description)
    }
    const url = `https://forensics.example${currentPath}`
    setOg('og:title', fullTitle)
    setOg('og:description', description ?? 'Interactive forensic science learning platform')
    setOg('og:url', url)
    setOg('og:type', 'website')
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (canonical) {
      canonical.setAttribute('href', url)
    }
  }, [title, description, currentPath])
}