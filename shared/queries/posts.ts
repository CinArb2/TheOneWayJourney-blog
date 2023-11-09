export const posts = `query Posts($first: Int, $after: String){
  postsConnection(orderBy:  createdAt_DESC, first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        slug
        title
        summary
        createdAt
        featuredImage {
          url
        }
        tags {
          name
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      pageSize
    }
  }
}`
