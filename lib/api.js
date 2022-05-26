
import { GraphQLClient, gql } from 'graphql-request'
const API_URL = process.env.GRAPHCMS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }


  // ... or create a GraphQL client instance to send requests
  const client = new GraphQLClient(API_URL, { headers: {} })

  const queryQL = gql`${query}`

  const data = await client.request(queryQL, variables)
 
  // const json = await res.json()

  // if (json.errors) {
  //   console.error(json.errors)
  //   throw new Error('Failed to fetch API')
  // }
  // return json.data

  return data
}

export async function getAllPostsForHome() {

  const data = await fetchAPI(
    `
       {
        posts(last: 10) {
          id
          slug
          title
          content {
            html
          }
          featuredImage {
            url
          }
          tags {
            name
            id
          }
        }
      }
    `
  )

  return data?.posts
}

// export async function getAllMenus() {
 
//   const data = await fetchAPI(
//     `
//      {
//         menus {
//           nodes {
//             id
//             databaseId
//             name
//             menuItems {
//               edges {
//                 node {
//                   id
//                   label
//                   parentId
//                   path
//                 }
//               }
//             }
//           }
//         }
//       }
//     `
//   )

//   return data?.menus
// }

export async function getLogo() {
 
  const data = await fetchAPI(
    `
     {
      logos {
        logoImage {
          url
        }
      }
    }
    `
  )
  return data?.logos
}

export async function getFeaturedPosts() {
 
  const data = await fetchAPI(
    `
     {
      posts(last: 4) {
        id
        slug
        title
        featuredImage {
          url
        }
        author {
          name
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
     {
      authors {
        id
        name
        avatar {
          url
        }
      }
    }
    `
  )

  return data?.authors
}

export async function getTags() {
 
  const data = await fetchAPI(
    `
     {
      tags {
        id
        name
        slug
      }
    }
    `
  )

  return data?.tags
}

// export async function getCategoryFooter() {
 
//   const data = await fetchAPI(
//     `
//     query CategoryFooter {
//       menus(where: {location: PRIMARY}) {
//         nodes {
//           menuItems {
//             nodes {
//               path
//               id
//               label
//             }
//           }
//         }
//       }
//     }
//     `
//   )

//   return data?.menus
// }

export async function getAboutPage() {
 
  const data = await fetchAPI(
    `
    {
      aboutPages {
        id
        title
        contentAbout {
          html
        }
      }
    }
    `
  )

  return data?.aboutPages
}