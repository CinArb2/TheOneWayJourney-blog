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
  postsByCategory,
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

export async function getStaticProps(context) {
  const variable = {
    slug: context.params.categoryName,
  }

  const [
    listPosts,
    responseLogo,
    responseFeaturedPosts,
    responseAuthor,
    responseTags,
    responseCategories,
  ] = await Promise.all([
    fetchData(postsByCategory, variable),
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

export async function getStaticPaths() {
  const responseCategories = await fetchData(categories)

  const paths = responseCategories?.categories.map((category) => ({
    params: { categoryName: category.name },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default Category
