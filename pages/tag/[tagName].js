import { getAllMenus, getLogo, getFeaturedPosts, getAuthor, getTags, getCategoryFooter } from '../../lib/api'
import Layout from '../../comps/Layout'
import PostCard from '../../comps/PostCard'
import FeaturedPosts from '../../comps/FeaturedPosts'
import Author from '../../comps/Author'
import Tags from '../../comps/Tags'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'

const Category = ({ posts, menu, logo, featuredPosts, author, tags, categoryFooter, pageTitle }) => {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - {pageTitle}</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
      <div className={styles.containerFlex}>
        <div className={styles.containerPost}>
          <div className={styles.containerTags}>
            <h2>Browsed tag:</h2>
            {
              posts[0].tags.nodes.map(tag => (
                <span key={tag.tagId} className={styles.tagIndv}>{tag.name}</span>
              ))
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
  
  const res = await fetch('http://my-wordpress.theonewayjourney.com/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
      query categoryPosts($tag: String = "") {
      posts(where: {tag: $tag}, last: 30) {
        nodes {
          title
          excerpt
          slug
          id
          featuredImage {
            node {
              sourceUrl
            }
          }
          tags {
            nodes {
              name
              tagId
            }
          }
        }
      }
    }
      `,
      variables: {
        tag: context.params.tagName,
      }
    }),
  })

  const json = await res.json()
  
  const menus = await getAllMenus()
  const logo = await getLogo()
  const posts = await getFeaturedPosts()
  const author = await getAuthor()
  const tags = await getTags()
  const category = await getCategoryFooter()
  

  return {
    props: {
      posts: json.data.posts.nodes,
      menu: menus.nodes[0].menuItems.edges,
      logo: logo.nodes[0].sourceUrl,
      featuredPosts: posts.nodes,
      author: author.nodes,
      tags: tags.nodes,
      categoryFooter: category.nodes[0].menuItems.nodes,
      pageTitle: context.params.tagName,
    },
  }
}

export async function getStaticPaths() {
  const response = await fetch('http://my-wordpress.theonewayjourney.com/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
        query allTags {
          tags(last: 50) {
            nodes {
              slug
              id
            }
          }
        }
      `,
    }),
  })

  const json = await response.json()

  const tags = json.data.tags.nodes;

  const paths = tags.map((tag) => ({
    params: {tagName: tag.slug},
  }))
  
  return {
    paths,
    fallback: false,
  }
}


export default Category;