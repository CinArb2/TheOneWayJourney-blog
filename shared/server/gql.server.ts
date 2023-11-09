/*eslint no-undef: "error"*/
/*eslint-env node*/
import { GraphQLClient, gql } from 'graphql-request'

const API_URL = process.env.GRAPHCMS_API_URL as string

const client = new GraphQLClient(API_URL, { headers: {} })

export async function fetchData(query: string, variables = {}) {
  const queryQL = gql`
    ${query}
  `
  const data = await client.request(queryQL, variables)

  if (data.errors) {
    throw new Error('Failed to fetch API')
  }

  return data
}

export async function getISRData(query: string, variables = {}) {
  const data = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_URL,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  return data
}
