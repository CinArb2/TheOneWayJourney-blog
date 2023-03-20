/*eslint no-undef: "error"*/
/*eslint-env node*/

import { GraphQLClient, gql } from 'graphql-request'
const API_URL = process.env.GRAPHCMS_API_URL

async function fetchAPI(query, variables = {}) {
  const client = new GraphQLClient(API_URL, { headers: {} })

  const queryQL = gql`
    ${query}
  `

  const data = await client.request(queryQL, variables)

  if (data.errors) {
    throw new Error('Failed to fetch API')
  }

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
          summary
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
        summary
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
        description {
          html
        }
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

export async function getCategories() {
  const data = await fetchAPI(
    `
     {
      categories {
        slug
        name
        id
      }
    }
    `
  )

  return data?.categories
}

export async function getPostsByCategory(variable) {
  const query = `
    query MyQuery($slug: String = "") {
      posts(where: {category: { slug: $slug}}) {
        id
        title
        summary

        slug
        featuredImage {
          id
          url
        }
        tags {
          id
          name
        }
      }
}

  `

  const data = await fetchAPI(query, variable)

  return data?.posts
}

export async function getPost(variable) {
  const query = `
    query MyQuery($slug: String = "") {
    post(where: {slug: $slug}){
      id
      title
      date
      author {
    	  id
        name
        avatar {
          id
          url
        }
    	}
          content {
            html
          }
          slug
          featuredImage {
            id
            url
          }
          tags {
            id
            name
          }
    }
  }
    `

  const data = await fetchAPI(query, variable)

  return data?.post
}

export async function getPostsByTag(variable) {
  const query = `
    query MyQuery($slug: String = "") {
      posts(where: {tags_some: {slug: $slug}}) {
        id
        title
        slug
        summary
        featuredImage {
          id
          url
        }
        tags {
          id
          name
        }
      }
    }
    `

  const data = await fetchAPI(query, variable)

  return data?.posts
}

export async function getAllSlugs() {
  const data = await fetchAPI(
    `
    {
      posts {
        slug
      }
    }
    `
  )

  return data?.posts
}

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
        featureImageAbout {
          url
        }
      }
    }
    `
  )

  return data?.aboutPages[0]
}
