import React from 'react'
import styles from '../../../../styles/Home.module.css'
import PostCard from '../../../../comps/PostCard'
import { fetchData } from '../../../../shared/server/gql.server'
import { postByTag, tags } from '../../../../shared/queries'

export async function generateStaticParams() {
  const responseTags = await fetchData(tags)

  return responseTags?.tags.map((tag) => ({
    tagName: tag.slug,
  }))
}

async function getPosts(params) {
  const variable = {
    slug: params.tagName,
  }
  try {
    const postsRes = await fetchData(postByTag, variable)

    return postsRes
  } catch (error) {
    // Handle the error here
    console.error('Error fetching posts:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export default async function Page({ params }) {
  const { posts } = await getPosts(params)

  return (
    <div className={styles.containerPost}>
      <div className={styles.containerTags}>
        <h2>Browsed tag:</h2>
        {<span className={styles.tagIndv}>{params.tagName}</span>}
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
