
const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query HomePageQuery {
      posts {
        nodes {
          id
          title
          uri
          excerpt
          slug
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
    `
  )

  return data?.posts
}

export async function getAllMenus() {
 
  const data = await fetchAPI(
    `
    query menu {
        menus {
          nodes {
            id
            databaseId
            name
            menuItems {
              edges {
                node {
                  id
                  label
                  parentId
                }
              }
            }
          }
        }
      }
    `
  )

  return data?.menus
}

export async function getLogo() {
 
  const data = await fetchAPI(
    `
    query Logo {
      mediaItems(where: {title: "logo"}) {
        nodes {
          sourceUrl
        }
      }
    }
    `
  )

  return data?.mediaItems
}

export async function getFeaturedPosts() {
 
  const data = await fetchAPI(
    `
    query featuredPosts {
      posts(last: 4) {
        nodes {
          title
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          id
        }
      }
    }
    `
  )

  return data?.posts
}

export async function getAuthor() {
 
  const data = await fetchAPI(
    `
    query author {
      users {
        nodes {
          avatar {
            url
          }
          id
          name
          description
        }
      }
    }
    `
  )

  return data?.users
}