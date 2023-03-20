import Layout from '../comps/Layout'
import { getLogo, getCategories } from '../lib/api'
import Head from 'next/head'
import Form from '../comps/Form'

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
