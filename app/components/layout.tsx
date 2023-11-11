'use client'
import { Category } from '@/shared/types/posts'
import Footer from './footer'
import Navbar from './navbar'
import style from '@/styles/Layout.module.css'

const Layout = ({
  children,
  logo,
  menu,
}: {
  children: React.ReactNode
  logo: string
  menu: Category[]
}) => {
  return (
    <div>
      <Navbar menu={menu} logo={logo} />
      {children}
      <div className={style.container}>
        <Footer categoryFooter={menu} logo={logo} />
      </div>
    </div>
  )
}

export default Layout
