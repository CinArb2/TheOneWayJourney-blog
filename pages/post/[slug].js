import Layout from "../../comps/Layout"
import { getAllMenus, getLogo, getCategoryFooter } from '../../lib/api'
import style from '../../styles/PostDetail.module.css'
import Image from "next/image"
import SocialShare from "../../comps/SocialShare"
import Head from 'next/head'

const Details = ({ post, menu, logo, categoryFooter, pageTitle }) => {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
      <div className={style.headerContent}>
        <div className={style.imageWrapper}>
          <div className={style.overlayBg}></div>
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt="featured image"
            objectFit="cover"
            layout="fill"
          />
          <div className={style.headerTitle}>
            {
              post.tags.nodes.map(tag => (
                <span key={tag.id} className={style.postTags}>{tag.name}</span>
              ))
            }
            <h1 className={style.postTitle}>{post.title}</h1>
            <div className={style.flexContainer}>
              <div className={style.iconWrapper}>
                <Image
                  src={post.author.node.avatar.url}
                  alt="featured image"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <h3 >{post.author.node.name} /</h3>
              <p>{post.date}</p>
            </div>
          </div>
        </div>
      </div>
        
      <div className={style.PostContent}
      dangerouslySetInnerHTML={{__html: post.content}}
      />
      <SocialShare post={post}/>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost/oneW/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
      query allSlugs($id: ID = "id", $idType: PostIdType = ID) {
        post(id: $id, idType: $idType) {
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          tags {
            nodes {
              name
              id
            }
          }
          date
          author {
            node {
              avatar {
                url
              }
              name
            }
          }
        }
      }
      `,
      variables: {
        id: context.params.slug,
        idType: 'SLUG'
      }
    }),
  })

  const res2 = await getAllMenus()
  const res3 = await getLogo()
  const json = await res.json()
  const res7 = await getCategoryFooter()

  
  return {
    props: {
      post: json.data.post,
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      categoryFooter: res7.nodes[0].menuItems.nodes,
      pageTitle: context.params.slug
    },
  }

}

export async function getStaticPaths() {
  
  const response = await fetch('http://localhost/oneW/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
        query allSlugs {
          posts(last: 50) {
            nodes {
              id
              slug
            }
          }
        }
      `,
    }),
  })

  const json = await response.json()

  const posts = json.data.posts.nodes;

  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }))
  
  return {
    paths,
    fallback: false,
  }
}

export default Details

