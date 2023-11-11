import React from 'react'
import styles from '@/styles/About.module.css'
import Image from 'next/image'
import { fetchData } from '@/shared/server/gql.server'
import { aboutPage } from '@/shared/queries'

async function getAboutInfo() {
  try {
    const aboutPageData = await fetchData(aboutPage)
    return aboutPageData?.aboutPages?.[0]
  } catch (error) {
    console.error('Error fetching about page:', error)
    throw error
  }
}

export default async function Page() {
  const aboutPage = await getAboutInfo()

  return (
    <div>
      <div className={styles.imageWrapper}>
        <div className={styles.overlayBg}></div>
        <Image
          src={aboutPage.featureImageAbout.url}
          alt="featured image"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={styles.headerTitle}>
        <h1>{aboutPage.title}</h1>
        <div
          className={styles.aboutContent}
          dangerouslySetInnerHTML={{ __html: aboutPage.contentAbout.html }}
        />
      </div>
    </div>
  )
}
