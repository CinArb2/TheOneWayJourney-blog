import { getAllMenus, getLogo, getFeaturedPosts, getAuthor, getTags, getCategoryFooter } from '../../lib/api'
import Layout from '../../comps/Layout'
import PostCard from '../../comps/PostCard'
import FeaturedPosts from '../../comps/FeaturedPosts'
import Author from '../../comps/Author'
import Tags from '../../comps/Tags'
import styles from '../../styles/Home.module.css'

const Category = ({ posts, menu, logo, featuredPosts, author, tags, categoryFooter }) => {
  
  return (
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
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

export async function getStaticProps(context) {
  
  const res = await fetch('http://localhost/oneW/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
      query categoryPosts($categoryName: String!) {
        posts(where: {categoryName: $categoryName}, last: 30) {
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
        categoryName: context.params.categoryName,
      }
    }),
  })

  const json = await res.json()
  
  const res2 = await getAllMenus()
  const res3 = await getLogo()
  const res4 = await getFeaturedPosts()
  const res5 = await getAuthor()
  const res6 = await getTags()
  const res7 = await getCategoryFooter()

  return {
    props: {
      posts: json.data.posts.nodes,
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      featuredPosts: res4.nodes,
      author: res5.nodes,
      tags: res6.nodes,
      categoryFooter: res7.nodes[0].menuItems.nodes
    },
  }
}

export async function getStaticPaths() {
  const response = await fetch('http://localhost/oneW/graphql', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      query: `
        query allCategories {
          categories {
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

  const categories = json.data.categories.nodes;

  const paths = categories.map((category) => ({
    params: {categoryName: category.slug},
  }))
  
  return {
    paths,
    fallback: false,
  }
}


export default Category;