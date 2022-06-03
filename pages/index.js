import styles from '../styles/Home.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getAllPostsForHome, getLogo, getFeaturedPosts, getAuthor, getTags, getCategoryFooter, getCategories } from '../lib/api'
import PostCard from '../comps/PostCard'
import Hero from '../comps/Hero'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'
import Head from 'next/head'


export default function Home(
  { posts,
    logo,
    featuredPosts,
    author,
    categories,
    tags }) {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - Tips</title>
        <link rel='icon' href={logo}/>
      </Head>
      <Layout menu={categories} logo={logo}>
        <Hero/>
        <div className={styles.containerFlex}>
          <div className={styles.containerPost}>
          {
            posts.map(post => (
              <PostCard key={post.id} post={post}/>
            ))
          }
         </div>
          <aside className={styles.containerAside}>
          <Author author={author}/>
          <FeaturedPosts featuredPosts={featuredPosts} />
          <Tags tags={tags}/>
         </aside>
       </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  
  const res = await getAllPostsForHome()
  const logo = await getLogo()
  const featured = await getFeaturedPosts()
  const author = await getAuthor()
  const tags = await getTags()
  const categories = await getCategories()
  
  return {
    props: {
      posts: res,
      categories,
      logo: logo?.[0].logoImage.url,
      featuredPosts: featured,
      author,
      tags,
    },
    revalidate: 10,
  }
}

