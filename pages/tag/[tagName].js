import { getAllMenus, getLogo, getFeaturedPosts, getAuthor, getTags, getCategoryFooter, getPostsByTag, getCategories } from '../../lib/api'
import Layout from '../../comps/Layout'
import PostCard from '../../comps/PostCard'
import FeaturedPosts from '../../comps/FeaturedPosts'
import Author from '../../comps/Author'
import Tags from '../../comps/Tags'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'

const Category = ({ posts, logo, featuredPosts, author, tags, categories, pageTitle }) => {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={categories} logo={logo}>
      <div className={styles.containerFlex}>
        <div className={styles.containerPost}>
          <div className={styles.containerTags}>
            <h2>Browsed tag:</h2>
            {
              <span className={styles.tagIndv}>{pageTitle}</span>
            }
          </div>
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

export async function getStaticProps(context) {
  
  const variable = {
    slug: context.params.tagName,
  }
  
  const posts = await getPostsByTag(variable)
  const logo = await getLogo()
  const featured = await getFeaturedPosts()
  const author = await getAuthor()
  const tags = await getTags()
  const categories = await getCategories()
  

  return {
    props: {
      posts,
      categories,
      logo: logo?.[0].logoImage.url,
      featuredPosts: featured,
      author,
      tags,
      pageTitle: context.params.tagName
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  
  const tags = await getTags()

  const paths = tags.map((tag) => ({
    params: {tagName: tag.slug},
  }))
  
  return {
    paths,
    fallback: 'blocking',
  }
}


export default Category;