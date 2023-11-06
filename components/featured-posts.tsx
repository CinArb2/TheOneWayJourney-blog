import style from '@/styles/FeaturedPosts.module.css'
import FeaturedIndiv from './feature-individual'
import { fetchData } from '@/shared/server/gql.server'
import { featuredPosts } from '@/shared/queries'
import { DetailedPostList } from '@/shared/types/posts'

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
  const { posts: featuredPosts }: DetailedPostList = await getFeaturedPosts()

  return (
    <div className={style.ContainerAside}>
      <h2 className={style.asideTitle}>Featured posts</h2>
      {featuredPosts?.map((post) => (
        <FeaturedIndiv key={post.id} post={post} />
      ))}
    </div>
  )
}
