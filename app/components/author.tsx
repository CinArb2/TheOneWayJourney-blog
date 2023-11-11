import React from 'react'
import styles from '@/styles/Author.module.css'
import Image from 'next/image'
import { fetchData } from '@/shared/server/gql.server'
import { author } from '@/shared/queries'

export async function getAuthor() {
  try {
    const authors = await fetchData(author)
    return authors
  } catch (error) {
    console.error('Error fetching author info:', error)
    throw error
  }
}

export default async function Author() {
  const { authors } = await getAuthor()
  const mainAuthor = authors?.[0]

  return (
    <div className={styles.authorWrapper}>
      <div className={styles.bgImgWrapper}>
        <div className={styles.overlayBg}></div>
        <Image
          src="/bgAuthor2.jpg"
          alt="icon-author"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={styles.authorImgWrapper}>
        <Image
          src={mainAuthor?.avatar?.url}
          alt="icon-author"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <h3 className={styles.authorTitle}>{mainAuthor?.name}</h3>
      <div
        className={styles.authorContent}
        dangerouslySetInnerHTML={{
          __html: `<p>${mainAuthor?.description.html}</p>`,
        }}
      />
    </div>
  )
}
