import React from 'react'
import styles from '../../../../styles/Home.module.css'
import PostCard from '../../../../comps/PostCard'
import { fetchData } from '../../../../shared/server/gql.server'
import { categories, postsByCategory } from '../../../../shared/queries'

export async function generateStaticParams() {
  const responseCategories = await fetchData(categories)

  return responseCategories?.categories.map((category) => ({
    categoryName: category.name,
  }))
}

async function getPosts(params) {
  const variable = {
    slug: params.categoryName,
  }
  try {
    const postsRes = await fetchData(postsByCategory, variable)

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
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
