import React from 'react'
import Hero from '@/app/components/hero'
import styles from '@/styles/Home.module.css'
import FeaturedPosts from '@/app/components/featured-posts'
import Author from '@/app/components/author'
import Tags from '@/app/components/tags'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Hero />
      <div className={styles.containerFlex}>
        {children}
        <aside className={styles.containerAside}>
          <FeaturedPosts />
          <Tags />
          <Author />
        </aside>
      </div>
    </>
  )
}
