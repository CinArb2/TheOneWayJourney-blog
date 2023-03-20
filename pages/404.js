import Link from 'next/link'
import styles from '../styles/NotFound.module.css'
import Layout from '../comps/Layout'
import { getLogo, getCategories } from '../lib/api'

export default function NotFound({ logo, categories }) {
  return (
    <Layout menu={categories} logo={logo}>
      <div className={styles.container}>
        <h1>404</h1>
        <p>
          It looks like nothing was found at this location.{' '}
          <Link href="/">
            <a>Return to Home Page</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const logo = await getLogo()
  const categories = await getCategories()

  return {
    props: {
      categories,
      logo: logo?.[0].logoImage.url,
    },
    revalidate: 10,
  }
}
