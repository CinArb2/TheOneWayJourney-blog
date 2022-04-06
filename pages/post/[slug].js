
const Details = (data) => {
  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.content}</p>
    </div>
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
        }
      }
      `,
      variables: {
        id: context.params.slug,
        idType: 'SLUG'
      }
    }),
  })

  const json = await res.json()
  
  return {
    props: {
      post: json.data.post,
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
          posts {
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
  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

export default Details

/*
  query categoryPosts($categoryName: String!) {
    posts(where: {categoryName: $categoryName}, last: 30) {
      nodes {
        title
        excerpt
        slug
        id
      }
    },
    variables: {
      "categoryName": "health-fitness"
    }
  }
*/