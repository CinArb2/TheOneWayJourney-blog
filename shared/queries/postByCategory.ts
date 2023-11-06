export const postsByCategory = `
    query MyQuery($slug: String = "") {
      posts(where: {category: { slug: $slug}}) {
        id
        title
        summary

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
