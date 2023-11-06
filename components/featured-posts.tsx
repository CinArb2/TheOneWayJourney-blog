import style from '@/styles/FeaturedPosts.module.css'
import FeaturedIndiv from '@/comps/FeaturedIndiv'
import { fetchData } from '@/shared/server/gql.server'
import { featuredPosts } from '@/shared/queries'

export async function getFeaturedPosts() {
  try {
    const featuredPostsRes = await fetchData(featuredPosts)
    return featuredPostsRes
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

export default async function FeaturedPosts() {
  const { posts: featuredPosts } = await getFeaturedPosts()

  return (
    <div className={style.ContainerAside}>
      <h2 className={style.asideTitle}>Featured posts</h2>
      {featuredPosts?.map((feat) => (
        <FeaturedIndiv key={feat.id} feat={feat} />
      ))}
    </div>
  )
}
