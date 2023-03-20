import styles from '../styles/Home.module.css'
import Layout from '../comps/Layout'
import PostCard from '../comps/PostCard'
import Hero from '../comps/Hero'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'
import Head from 'next/head'
import { fetchData } from '../shared/server/gql.server'
import {
  posts,
  logo,
  featuredPosts,
  author,
  tags,
  categories,
} from '../shared/queries'

export default function Home({
  posts,
  logo,
  featuredPosts,
  author,
  categories,
  tags,
}) {
  return (
    <>
      <Head>
        <title>The One Way Journey - Tips</title>
        <link rel="icon" href={logo} />
      </Head>
      <Layout menu={categories} logo={logo}>
        <Hero />
        <div className={styles.containerFlex}>
          <div className={styles.containerPost}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <aside className={styles.containerAside}>
            <Author author={author} />
            <FeaturedPosts featuredPosts={featuredPosts} />
            <Tags tags={tags} />
          </aside>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
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

  return {
    props: {
      posts: listPosts?.posts,
      categories: responseCategories?.categories,
      logo: responseLogo.logos[0].logoImage.url,
      featuredPosts: responseFeaturedPosts?.posts,
      author: responseAuthor?.authors,
      tags: responseTags?.tags,
    },
    revalidate: 10,
  }
}
