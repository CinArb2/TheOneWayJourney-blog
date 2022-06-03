
import styles from '../styles/About.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getLogo, getCategoryFooter, getAboutPage, getCategories } from '../lib/api'
import Image from 'next/image'
import Head from 'next/head'

export default function about({ categories, logo,  aboutPage }) {
  
  return (
    <>
      <Head>
        <title>The One Way Journey - About</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={categories} logo={logo}>
      <div>
        <div className={styles.imageWrapper}>
          <div className={styles.overlayBg}></div>
          <Image
            src={aboutPage.featureImageAbout.url}
            alt="featured image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className={styles.headerTitle}>
            <h1>{aboutPage.title}</h1>
            <div className={styles.aboutContent}
            dangerouslySetInnerHTML={{__html: aboutPage.contentAbout.html}}
            />
        </div>
      </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  
  const aboutPage = await getAboutPage()
  const logo = await getLogo()
  const categories = await getCategories()
  
  return {
    props: {
      categories,
      logo: logo?.[0].logoImage.url,
      aboutPage
    },
    revalidate: 10,
  }
}