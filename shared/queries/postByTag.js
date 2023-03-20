export const postByTag = `query MyQuery($slug: String = "") {
      posts(where: {tags_some: {slug: $slug}}) {
        id
        title
        slug
        summary
        featuredImage {
          id
          url
        }
        tags {
          id
          name
        }
      }
    }`
