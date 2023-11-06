import React from 'react'
import Link from 'next/link'
import style from '../../styles/Tags.module.css'
import { tags } from '../../shared/queries'
import { fetchData } from '../../shared/server/gql.server'

export async function getTags() {
  try {
    const tagRes = await fetchData(tags)
    return tagRes
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

export default async function Tags() {
  const { tags } = await getTags()

  return (
    <div className={style.tagContainer}>
      <h1 className={style.tagsTitle}>Tags</h1>
      <div className={style.tagsList}>
        {tags?.map((tag) => (
          <Link href={`/tag/${tag.slug}`} key={tag.id}>
            <span className={style.tags}>{tag.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
