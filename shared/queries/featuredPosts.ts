export const featuredPosts = `
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
