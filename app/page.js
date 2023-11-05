import React from 'react'
// import Layout from '../comps/Layout'
import Hero from '../comps/Hero'
import styles from '../styles/Home.module.css'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'
import { fetchData } from '../shared/server/gql.server'
import { posts, featuredPosts, author, tags } from '../shared/queries'

async function getPosts() {
  try {
    const [listPosts, responseFeaturedPosts, responseAuthor, responseTags] =
      await Promise.all([
        fetchData(posts),
        fetchData(featuredPosts),
        fetchData(author),
        fetchData(tags),
      ])

    return {
      ...listPosts,
      featuredPosts: responseFeaturedPosts?.posts,
      ...responseAuthor,
      ...responseTags,
    }
  } catch (error) {
    // Handle the error here
    console.error('Error fetching posts:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export default async function Home() {
  const { posts, featuredPosts, authors: author, tags } = await getPosts()

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
          <Tags tags={tags} />
          <Author author={author} />
        </aside>
      </div>
    </>
  )
}
