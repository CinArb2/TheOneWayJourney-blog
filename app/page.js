import React from 'react'
import Layout from '../comps/Layout'
import Hero from '../comps/Hero'
import styles from '../styles/Home.module.css'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'
import { fetchData } from '../shared/server/gql.server'
import {
  posts,
  logo,
  featuredPosts,
  author,
  tags,
  categories,
} from '../shared/queries'

async function getPosts() {
  const [
    listPosts,
    responseLogo,
    responseFeaturedPosts,
    responseAuthor,
    responseTags,
    responseCategories,
  ] = await Promise.all([
    fetchData(posts),
    fetchData(logo),
    fetchData(featuredPosts),
    fetchData(author),
    fetchData(tags),
    fetchData(categories),
  ])
  console.log(responseLogo.logos[0].logoImage.url)

  return {
    ...listPosts,
    logo: responseLogo.logos[0].logoImage.url,
    featuredPosts: responseFeaturedPosts.posts,
    ...responseAuthor,
    ...responseTags,
    ...responseCategories,
  }
}

export default async function Home() {
  const {
    posts,
    logo,
    featuredPosts,
    authors: author,
    categories,
    tags,
  } = await getPosts()

  return (
    <>
      <Layout menu={categories} logo={logo}>
        <Hero />
        <div className={styles.containerFlex}>
          <div className={styles.containerPost}>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <aside className={styles.containerAside}>
            <FeaturedPosts featuredPosts={featuredPosts} />
            <Tags tags={tags} />
            <Author author={author} />
          </aside>
        </div>
      </Layout>
    </>
  )
}
