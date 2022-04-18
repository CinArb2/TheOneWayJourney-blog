import Layout from '../comps/Layout'
import { getAllMenus, getLogo, getCategoryFooter } from '../lib/api'
import Head from 'next/head'
import Form from '../comps/Form'

export default function contact({ menu, logo, categoryFooter }) {

  
  return (
    <>
      <Head>
        <title>The One Way Journey - Contact</title>
        <link rel='icon' href={logo}/>
      </Head>
      <Layout menu={menu} logo={logo} categoryFooter={categoryFooter}>
        <Form/>
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