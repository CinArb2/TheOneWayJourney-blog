import '@/styles/globals.css'
import Layout from '@/components/layout'
import { fetchData } from '@/shared/server/gql.server'
import { categories, logo } from '@/shared/queries'

export const metadata = {
  title: 'The One Way Journey - Tips',
  description: 'Welcome to The One Way Journey',
}

async function getInitialData() {
  const [responseLogo, responseCategories] = await Promise.all([
    fetchData(logo),
    fetchData(categories),
  ])

  return {
    logo: responseLogo?.logos?.[0]?.logoImage?.url,
    ...responseCategories,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logo, categories } = await getInitialData()

  return (
    <html lang="en">
      <body>
        <Layout menu={categories} logo={logo}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
