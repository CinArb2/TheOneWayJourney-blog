import React from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '@/app/components/post-card'
import { fetchData } from '@/shared/server/gql.server'
import { categories, postsByCategory } from '@/shared/queries'
import { getPosts } from '@/shared/server/get-posts'

export const dynamicParams = false

interface Categorie {
  slug: string
  name: string
  id: string
}

export async function generateStaticParams() {
  const responseCategories: { categories: Categorie[] } = await fetchData(
    categories
  )

  return responseCategories?.categories.map((category) => ({
    categoryName: category.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: { categoryName: string }
}) {
  const { posts } = await getPosts(postsByCategory, params.categoryName)

  return (
    <div className={styles.containerPost}>
      {posts.length === 0 && (
        <div className={styles.containerTags}>
          <h2>No entries for category:</h2>
          {<span className={styles.tagIndv}>{params.categoryName}</span>}
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
