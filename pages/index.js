import styles from '../styles/Home.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getAllPostsForHome, getLogo, getFeaturedPosts, getAuthor, getTags, getCategoryFooter } from '../lib/api'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'
import Head from 'next/head'

export default function Home({ posts, menu, logo, featuredPosts, author, tags, categoryFooter }) {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - Tips</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
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
  const menus = await getAllMenus()
  const logo = await getLogo()
  const featured = await getFeaturedPosts()
  const author = await getAuthor()
  const tags = await getTags()
  const category = await getCategoryFooter()

  return {
    props: {
      posts: res.nodes,
      menu: menus.nodes[0].menuItems.edges,
      logo: logo.nodes[0].sourceUrl,
      featuredPosts: featured.nodes,
      author: author.nodes,
      tags: tags.nodes,
      categoryFooter: category.nodes[0].menuItems.nodes
    },
    
  }
}

