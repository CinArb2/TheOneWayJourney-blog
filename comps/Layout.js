import Footer from "./Footer"
import Navbar from "./Navbar"
import style from '../styles/Layout.module.css'

const Layout = ({ children, menu, logo, categoryFooter}) => {
 
  
  return (
    <div>
      <Navbar menu={menu} logo={ logo}/>
      {children}
      <div className={style.container}>
        <div className={style.wavesLayout}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d3d3ed" fillOpacity="1" d="M0,64L40,101.3C80,139,160,213,240,224C320,235,400,181,480,176C560,171,640,213,720,234.7C800,256,880,256,960,224C1040,192,1120,128,1200,106.7C1280,85,1360,107,1400,117.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>
        <div className={style.containerFooter}>
          <Footer categoryFooter={categoryFooter} logo={ logo} />
        </div>
      </div>
    </div>
  )
}



export default Layout