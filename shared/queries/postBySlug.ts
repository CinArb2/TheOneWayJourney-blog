export const postBySlug = `
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
