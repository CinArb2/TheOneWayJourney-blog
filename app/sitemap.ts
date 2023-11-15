import { allSlugs } from '@/shared/queries'
import { fetchData } from '@/shared/server/gql.server'
import { Post } from '@/shared/types/posts'

const URL = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

export default async function sitemap() {
  const { posts }: { posts: Pick<Post, 'slug'>[] } = await fetchData(allSlugs)
  const baseRoutes = [
    { url: URL },
    { url: `${URL}/about` },
    { url: `${URL}/contact` },
  ]

  const slugRoutes = posts.map((slug) => ({ url: `${URL}/${slug?.slug}` }))

  return [...baseRoutes, ...slugRoutes]
}
