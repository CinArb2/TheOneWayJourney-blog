import Footer from "./Footer"
import Navbar from "./Navbar"


const Layout = ({ children, menu, logo, categoryFooter}) => {
 
  
  return (
    <div>
      <Navbar menu={menu} logo={ logo}/>
      {children}
      <Footer categoryFooter={categoryFooter} logo={ logo} />
    </div>
  )
}



export default Layout