import Layout from '../../comps/Layout'
import PostCard from '../../comps/PostCard'
import FeaturedPosts from '../../comps/FeaturedPosts'
import Author from '../../comps/Author'
import Tags from '../../comps/Tags'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { fetchData } from '../../shared/server/gql.server'
import {
  author,
  categories,
  featuredPosts,
  logo,
  postByTag,
  tags,
} from '../../shared/queries'

const Category = ({
  posts,
  logo,
  featuredPosts,
  author,
  tags,
  categories,
  pageTitle,
}) => {
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel="icon" href={logo} />
      </Head>
      <Layout menu={categories} logo={logo}>
        <div className={styles.containerFlex}>
          <div className={styles.containerPost}>
            <div className={styles.containerTags}>
              <h2>Browsed tag:</h2>
              {<span className={styles.tagIndv}>{pageTitle}</span>}
            </div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <aside className={styles.containerAside}>
            <Tags tags={tags} />
            <FeaturedPosts featuredPosts={featuredPosts} />
            <Author author={author} />
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

  const [
    listPosts,
    responseLogo,
    responseFeaturedPosts,
    responseAuthor,
    responseTags,
    responseCategories,
  ] = await Promise.all([
    fetchData(postByTag, variable),
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
      pageTitle: context.params.tagName,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const responseTags = await fetchData(tags)

  const paths = responseTags?.tags.map((tag) => ({
    params: { tagName: tag.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Category
