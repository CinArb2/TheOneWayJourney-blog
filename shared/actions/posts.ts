'use server'

import { posts } from '../queries'
import { fetchData } from '../server/gql.server'

export async function getPostList(variables: any) {
  const data = await fetchData(posts, variables)

  return data
}
