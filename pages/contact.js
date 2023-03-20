import Layout from '../comps/Layout'
import Head from 'next/head'
import Form from '../comps/Form'
import { fetchData } from '../shared/server/gql.server'
import { categories, logo } from '../shared/queries'

export default function contact({ categories, logo }) {
  return (
    <>
      <Head>
        <title>The One Way Journey - Contact</title>
        <link rel="icon" href={logo} />
      </Head>
      <Layout menu={categories} logo={logo}>
        <Form />
      </Layout>
    </>
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
