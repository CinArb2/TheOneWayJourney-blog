import React from 'react'
import styles from '@/styles/Home.module.css'
import PostList from '@/components/post-list'
import { getPostList } from '@/shared/actions/posts'

export default async function Home() {
  const variables = {
    first: 5,
  }
  const data = await getPostList(variables)

  return (
    <div className={styles.containerPost}>
      <PostList data={data} />
    </div>
  )
}
