import React from 'react'
import styles from '@/styles/Home.module.css'
import PostCard from '@/components/post-card'
import { fetchData } from '@/shared/server/gql.server'
import { postByTag, tags } from '@/shared/queries'
import { Tag } from '@/shared/types/posts'
import { getPosts } from '@/shared/server/get-posts'

export const dynamicParams = false

export async function generateStaticParams() {
  const responseTags: { tags: Tag[] } = await fetchData(tags)

  return responseTags?.tags.map((tag) => ({
    tagName: tag.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: { tagName: string }
}) {
  const { posts } = await getPosts(postByTag, params.tagName)

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
