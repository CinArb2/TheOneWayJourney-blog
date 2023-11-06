import React from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '@/components/post-card'
import { fetchData } from '@/shared/server/gql.server'
import { categories, postsByCategory } from '@/shared/queries'
import { getPosts } from '@/shared/server/get-posts'

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
    categoryName: category.name,
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
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
