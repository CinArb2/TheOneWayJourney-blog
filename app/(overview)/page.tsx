import React from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '@/comps/PostCard'
import { postsQuery } from '@/shared/queries'
import { getPosts } from '@/shared/server/get-posts'

export default async function Home() {
  const { posts } = await getPosts(postsQuery)

  return (
    <div className={styles.containerPost}>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
