import React from 'react'
import Hero from '../../comps/Hero'
import styles from '../../styles/Home.module.css'
import FeaturedPosts from '../components/featured-posts'
import Author from '../components/author'
import Tags from '../components/tags'

export default async function Layout({ children }) {
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
