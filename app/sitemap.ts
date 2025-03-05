import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codeepedia.com/',
      changeFrequency: 'yearly',
      priority: 1,
    }
  ]
}