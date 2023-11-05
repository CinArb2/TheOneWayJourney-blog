import React from 'react'
import Hero from '../comps/Hero'
import styles from '../styles/Home.module.css'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from './components/author'
import Tags from './components/tags'
import { fetchData } from '../shared/server/gql.server'
import { posts, featuredPosts } from '../shared/queries'

async function getPosts() {
  try {
    const [listPosts, responseFeaturedPosts] = await Promise.all([
      fetchData(posts),
      fetchData(featuredPosts),
    ])

    return {
      ...listPosts,
      featuredPosts: responseFeaturedPosts?.posts,
    }
  } catch (error) {
    // Handle the error here
    console.error('Error fetching posts:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export default async function Home() {
  const { posts, featuredPosts } = await getPosts()

  return (
    <>
      <Hero />
      <div className={styles.containerFlex}>
        <div className={styles.containerPost}>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <aside className={styles.containerAside}>
          <FeaturedPosts featuredPosts={featuredPosts} />
          <Tags />
          <Author />
        </aside>
      </div>
    </>
  )
}
