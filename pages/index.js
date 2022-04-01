import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../comps/Layout'
import { getAllMenus, getAllPostsForHome, getLogo, getFeaturedPosts, getAuthor } from '../lib/api'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'

export default function Home({ posts, menu, logo, featuredPosts, author }) {
  
  return (
    <Layout menu={menu} logo={logo}>
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
        </aside>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  
  const res = await getAllPostsForHome()
  const res2 = await getAllMenus()
  const res3 = await getLogo()
  const res4 = await getFeaturedPosts()
  const res5 = await getAuthor()

  return {
    props: {
      posts: res.nodes,
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      featuredPosts: res4.nodes,
      author: res5.nodes,
    },
    
  }
}

