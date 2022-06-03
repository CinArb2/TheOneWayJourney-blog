
import Layout from "../../comps/Layout"
import { getLogo, getPost, getAllSlugs, getFeaturedPosts, getCategories, getAuthor, getTags } from '../../lib/api'
import style from '../../styles/PostDetail.module.css'
import Image from "next/image"
import SocialShare from "../../comps/SocialShare"
import Head from 'next/head'

const Details = ({ post,
      categories,
      logo,
      featuredPosts,
      author,
      tags,
      pageTitle }) => {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={categories} logo={logo}>
      <div className={style.headerContent}>
        <div className={style.imageWrapper}>
          <div className={style.overlayBg}></div>
          <Image
            src={post.featuredImage?.url}
            alt="featured image"
            objectFit="cover"
            layout="fill"
          />
          <div className={style.headerTitle}>
            {
              post.tags?.map(tag => (
                <span key={tag.id} className={style.postTags}>{tag.name}</span>
              ))
            }
            <h1 className={style.postTitle}>{post.title}</h1>
            <div className={style.flexContainer}>
              <div className={style.iconWrapper}>
                <Image
                  src={post.author?.avatar.url}
                  alt="featured image"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <h3 >{post.author.name} /</h3>
              <p>{post.date}</p>
            </div>
          </div>
        </div>
      </div>
        
      <div className={style.PostContent}
      dangerouslySetInnerHTML={{__html: post.content.html}}
      />
      <SocialShare post={post}/>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {

  const variable = {
    slug: context.params.slug,
  }
  const post = await getPost(variable)
  const logo = await getLogo()
  const featured = await getFeaturedPosts()
  const author = await getAuthor()
  const tags = await getTags()
  const categories = await getCategories()

  
  return {
    props: {
      post,
      categories,
      logo: logo?.[0].logoImage.url,
      featuredPosts: featured,
      author,
      tags,
      pageTitle: context.params.slug
    },
    revalidate: 10,
  }

}

export async function getStaticPaths() {

  const slugs = await getAllSlugs()

  const paths = slugs.map((el) => ({
    params: { slug: el.slug},
  }))
  
  return {
    paths,
    fallback: 'blocking',
  }
}

export default Details

