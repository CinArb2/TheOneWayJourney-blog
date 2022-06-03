import Footer from "./Footer"
import Navbar from "./Navbar"
import style from '../styles/Layout.module.css'

const Layout = ({ children, menu, logo}) => {
 
  return (
    <div>
      <Navbar menu={menu} logo={ logo}/>
      {children}
      <div className={style.container}>
        <div className={style.containerFooter}>
          <Footer categoryFooter={menu} logo={ logo} />
        </div>
      </div>
    </div>
  )
}



export default Layout