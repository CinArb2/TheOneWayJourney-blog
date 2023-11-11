import '@/styles/globals.css'
import Layout from '@/app/components/layout'
import { fetchData } from '@/shared/server/gql.server'
import { categories, logo } from '@/shared/queries'
import { Raleway } from 'next/font/google'
import { GeistSans } from 'geist/font'

const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

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
    <html lang="en" className={`${raleway.variable} ${GeistSans.variable}`}>
      <body>
        <Layout menu={categories} logo={logo}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
