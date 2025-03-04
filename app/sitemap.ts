import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codeepedia.com/',
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://codeepedia.com/courses',
      priority: 0.9,
    },
    {
      url:'https://codeepedia.com/learn',
      priority: 0.5,
    },
    {
      url:'https://codeepedia.com/lesson',
      priority: 0.4,
    },
    {
      url:'https://codeepedia.com/quests',
      priority:0.3,
    }
  ]
}