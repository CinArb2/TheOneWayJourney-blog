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
  
  const res2 = await getAllMenus()
  const res3 = await getLogo()
  const res7 = await getCategoryFooter()

  return {
    props: {
      menu: res2.nodes[0].menuItems.edges,
      logo: res3.nodes[0].sourceUrl,
      categoryFooter: res7.nodes[0].menuItems.nodes
    },
  }
}