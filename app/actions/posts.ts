'use server'

import { posts } from '../../shared/queries'
import { fetchData } from '../../shared/server/gql.server'

export async function getPostList(variables: any) {
  try {
    const data = await fetchData(posts, variables)

    return data
  } catch (error) {
    // Log the error for server-side visibility
    console.error('Failed to fetch post list:', error)
    // Return an error object to the client
    return { data: null, error: 'Failed to fetch data' }
  }
}
