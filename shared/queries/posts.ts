export const postsQuery = `{
        posts(orderBy:  createdAt_DESC) {
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
    `
