export const posts = `
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
