
import styles from '../styles/Contact.module.css'
import Layout from '../comps/Layout'
import { getAllMenus, getLogo, getCategoryFooter } from '../lib/api'
import Head from 'next/head'

export default function contact({ menu, logo, categoryFooter }) {
  
  const handleSubmit = (e) => e.preventDefault()
  
  return (
    <>
      <Head>
        <title>The One Way Journey - Contact</title>
        <link rel='icon' href={logo}/>
      </Head>
    <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
      <div className={styles.container}>
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <div className={styles.containerHeader}> 
            <label htmlFor="" className={styles.top}>
            Your name
            </label>
            <input type="text" className={styles.inputTop}/>
            </div>
            <div className={styles.containerHeader}>
              <label htmlFor="" className={styles.top}>
              Your email
              </label>
              <input type="email" className={styles.inputTop}/>
            </div>
          </div>
          <div className={styles.formBottom}>
            <label htmlFor="" className={styles.bottom}> 
            Your message
            </label>
            <textarea className={styles.inputBottom} />
          </div>
          <button>Submit</button>
        </form>
      </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  
  const menus = await getAllMenus()
  const logo = await getLogo()
  const category = await getCategoryFooter()

  return {
    props: {
      menu: menus.nodes[0].menuItems.edges,
      logo: logo.nodes[0].sourceUrl,
      categoryFooter: category.nodes[0].menuItems.nodes
    },
    revalidate: 10,
  }
}