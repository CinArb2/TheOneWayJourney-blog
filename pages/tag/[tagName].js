import { getAllMenus, getLogo, getFeaturedPosts, getAuthor, getTags } from '../../lib/api'
import Layout from '../../comps/Layout'
import PostCard from '../../comps/PostCard'
import FeaturedPosts from '../../comps/FeaturedPosts'
import Author from '../../comps/Author'
import Tags from '../../comps/Tags'
import styles from '../../styles/Home.module.css'

const Category = ({ posts, menu, logo, featuredPosts, author, tags }) => {
  
  return (
    <Layout menu={menu} logo={logo}>
      <div className={styles.containerFlex}>
        <div className={styles.containerPost}>
          <div className={styles.containerTags}>
            <h2>Browse tag:</h2>
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
  )
}

export async function getStaticProps(context) {
  console.log(context)
  const res = await fetch('http://localhost/oneW/graphql', {
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
  
  const res2 = await getAllMenus()
  const res3 = await getLogo()
  const res4 = await getFeaturedPosts()
  const res5 = await getAuthor()
  const res6 = await getTags()

  return {
    props: {
      posts: json.data.posts.nodes,
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      featuredPosts: res4.nodes,
      author: res5.nodes,
      tags: res6.nodes,
    },
  }
}

export async function getStaticPaths() {
  const response = await fetch('http://localhost/oneW/graphql', {
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