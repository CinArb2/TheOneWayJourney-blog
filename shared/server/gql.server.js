/*eslint no-undef: "error"*/
/*eslint-env node*/

import { GraphQLClient, gql } from 'graphql-request'
const API_URL = process.env.GRAPHCMS_API_URL

const client = new GraphQLClient({
  url: API_URL,
  headers: {},
})

export async function fetchData(query, variables = {}) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const queryQL = gql`
    ${query}
  `

  const data = await client.request(queryQL, variables)

  if (data.errors) {
    throw new Error('Failed to fetch API')
  }

  return data
}
