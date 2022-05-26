import Link from 'next/link'
import styles from '../styles/NotFound.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getLogo, getCategoryFooter } from '../lib/api'


export default function NotFound({  menu, logo, categoryFooter }) {
  
  return (
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
      <div className={styles.container}>
        <h1>404</h1>
        <p>It looks like nothing was found at this location. <Link href="/"><a>Return to Home Page</a></Link></p>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  
  const menus = await getAllMenus()
  const logo = await getLogo()
  const footer = await getCategoryFooter()

  return {
    props: {
      menu: menus?.nodes[0].menuItems.edges,
      logo: logo?.nodes[0].sourceUrl,
      categoryFooter: footer?.nodes[0].menuItems.nodes
    },
    revalidate: 10,
  }
}