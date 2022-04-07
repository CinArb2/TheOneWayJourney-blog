
import styles from '../styles/About.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getLogo, getCategoryFooter, getAboutPage } from '../lib/api'
import Image from 'next/image'
import Head from 'next/head'

export default function about({  menu, logo, categoryFooter, aboutContent }) {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - About</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
      <div>
        <div className={styles.imageWrapper}>
          <div className={styles.overlayBg}></div>
          <Image
            src={aboutContent.featuredImage.node.sourceUrl}
            alt="featured image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className={styles.headerTitle}>
            <h1>About us</h1>
            <div className={styles.aboutContent}
            dangerouslySetInnerHTML={{__html: aboutContent.content}}
            />
        </div>
      </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  
  const menus = await getAllMenus()
  const logo = await getLogo()
  const footer = await getCategoryFooter()
  const aboutPage = await getAboutPage()

  return {
    props: {
      menu: menus.nodes[0].menuItems.edges,
      logo: logo.nodes[0].sourceUrl,
      categoryFooter: footer.nodes[0].menuItems.nodes,
      aboutContent: aboutPage.nodes[0]
    },
  }
}