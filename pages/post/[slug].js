import Layout from '../../comps/Layout'
import style from '../../styles/PostDetail.module.css'
import Image from 'next/image'
import SocialShare from '../../comps/SocialShare'
import Head from 'next/head'
import { fetchData } from '../../shared/server/gql.server'
import {
  allSlugs,
  author,
  categories,
  featuredPosts,
  logo,
  postBySlug,
  tags,
} from '../../shared/queries'

const Details = ({ post, categories, logo, pageTitle }) => {
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel="icon" href={logo} />
      </Head>
      <Layout menu={categories} logo={logo}>
        <div className={style.headerContent}>
          <div className={style.imageWrapper}>
            <div className={style.overlayBg}></div>
            <Image
              src={post.featuredImage?.url}
              alt="featured image"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
            <div className={style.headerTitle}>
              {post.tags?.map((tag) => (
                <span key={tag.id} className={style.postTags}>
                  {tag.name}
                </span>
              ))}
              <h1 className={style.postTitle}>{post.title}</h1>
              {post.author?.avatar.url && (
                <div className={style.flexContainer}>
                  <div className={style.iconWrapper}>
                    <Image
                      src={post.author?.avatar.url}
                      alt="featured image"
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <h3>{post.author?.name} /</h3>
                  <p>{post.date}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={style.PostContent}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />
        <SocialShare post={post} />
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const variable = {
    slug: context.params.slug,
  }

  const [
    listPosts,
    responseLogo,
    responseFeaturedPosts,
    responseAuthor,
    responseTags,
    responseCategories,
  ] = await Promise.all([
    fetchData(postBySlug, variable),
    fetchData(logo),
    fetchData(featuredPosts),
    fetchData(author),
    fetchData(tags),
    fetchData(categories),
  ])

  return {
    props: {
      post: listPosts?.post,
      categories: responseCategories?.categories,
      logo: responseLogo.logos[0].logoImage.url,
      featuredPosts: responseFeaturedPosts?.posts,
      author: responseAuthor?.authors,
      tags: responseTags?.tags,
      pageTitle: context.params.slug,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const slugs = await fetchData(allSlugs)

  const paths = slugs?.posts.map((el) => ({
    params: { slug: el.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default Details
