import { IndividualPost, Post, Posts, SummaryPost } from "../types/posts"
import { fetchData } from "./gql.server"


export async function getPost(query: string, slug: string): Promise< IndividualPost > {
  const variable = { slug }
  try {
    const post = await fetchData(query, variable)

    return post
  } catch (error) {
    // Handle the error here
    console.error('Error fetching post:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export async function getPosts(query: string, slug: string = ''): Promise< Posts > {
  const variable = slug ? { slug } : {}
  try {
    const postsRes = await fetchData(query, variable)

    return postsRes
  } catch (error) {
    // Handle the error here
    console.error('Error fetching posts:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}
