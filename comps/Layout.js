import Footer from "./Footer"
import Navbar from "./Navbar"


const Layout = ({ children, menu, logo}) => {
 
  
  return (
    <div>
      <Navbar menu={menu} logo={ logo}/>
      {children}
      <Footer menu={menu} logo={ logo}/>
    </div>
  )
}



export default Layout