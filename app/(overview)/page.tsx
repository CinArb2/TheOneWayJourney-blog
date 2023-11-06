import React from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '@/comps/PostCard'
import { fetchData } from '@/shared/server/gql.server'
import { posts } from '@/shared/queries'

async function getPosts() {
  try {
    const postsRes = await fetchData(posts)

    return postsRes
  } catch (error) {
    // Handle the error here
    console.error('Error fetching posts:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export default async function Home() {
  const { posts } = await getPosts()

  return (
    <div className={styles.containerPost}>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
