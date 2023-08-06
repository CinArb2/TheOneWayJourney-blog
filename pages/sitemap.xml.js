import { allSlugs } from '../shared/queries'
import { fetchData } from '../shared/server/gql.server'

const URL = process.env.NEXT_PUBLIC_URL

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/about</loc>
     </url>
      <url>
       <loc>${URL}/contact</loc>
     </url>
     ${posts.posts
    .map(({ slug }) => {
      return `
           <url>
               <loc>${`${URL}/post/${slug}`}</loc>
           </url>
         `
    })
    .join('')}
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  const slugs = await fetchData(allSlugs)

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(slugs)

  res.setHeader('Content-Type', 'text/xml')
  // Send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {}
