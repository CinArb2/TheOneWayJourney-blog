import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../comps/Layout'
import { getAllMenus, getAllPostsForHome, getLogo, getFeaturedPosts, getAuthor, getTags } from '../lib/api'
import PostCard from '../comps/PostCard'
import FeaturedPosts from '../comps/FeaturedPosts'
import Author from '../comps/Author'
import Tags from '../comps/Tags'

export default function Home({ posts, menu, logo, featuredPosts, author, tags }) {
  
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
          <Tags tags={tags}/>
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
  const res6 = await getTags()

  return {
    props: {
      posts: res.nodes,
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      featuredPosts: res4.nodes,
      author: res5.nodes,
      tags: res6.nodes,
    },
    
  }
}

