import Link from 'next/link'
import styles from '../styles/NotFound.module.css'
import Layout from '../comps/Layout'
import { fetchData } from '../shared/server/gql.server'
import { categories, logo } from '../shared/queries'

export default function NotFound({ logo, categories }) {
  return (
    <Layout menu={categories} logo={logo}>
      <div className={styles.container}>
        <h1>404</h1>
        <p>
          It looks like nothing was found at this location.{' '}
          <Link href="/">Return to Home Page</Link>
        </p>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const [responseLogo, responseCategories] = await Promise.all([
    fetchData(logo),
    fetchData(categories),
  ])

  return {
    props: {
      categories: responseCategories?.categories,
      logo: responseLogo.logos[0].logoImage.url,
    },
    revalidate: 10,
  }
}
