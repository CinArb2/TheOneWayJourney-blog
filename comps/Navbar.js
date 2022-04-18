import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navbar = ({menu, logo}) => {
  const router = useRouter()
  const currentRoute = router.asPath.length > 1 ? router.asPath + '/' : router.asPath
  const [hideHeader, setHideHeader] = useState(false);
  const [open, setOpen] = useState(false)
  
  const handleScroll = () => {
      if (window.scrollY > 100) {
        setHideHeader(true)
      } else {
        setHideHeader(false)
      }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <>
      <header className={`${style.headerContainer} ${hideHeader ? style.active : ''}`}>
        <Link href="/" >
          <a className={hideHeader ? style.hide : ''}>
            <div className={style.logoContainer}>
              <Image
                src={logo}
                alt="icon-logo"
                objectFit="cover"
                layout="fill"
                />
            </div>
          </a>
        </Link>
        <nav className={style.Navbar}>
          <Link href="/" >
            <a className={hideHeader ? '' : style.hide}>
              <div className={style.logoNavbar}>
                <Image
                  src={logo}
                  alt="icon-logo"
                  objectFit="cover"
                  layout="fill"
                  />
              </div>
            </a>
          </Link>
          {menu.map(menuItem => {
            return (
                <Link key={menuItem.node.id} href={menuItem.node.path}>
                  <a className={currentRoute === menuItem.node.path ? style.active : style.Link}>{menuItem.node.label}</a>
                </Link>
              )
            })}
        </nav>
        
      </header>
      <nav className={`${style.NavbarMobile} ${open ? style.active : ''}`}>
          {menu.map(menuItem => {
            const newPath = menuItem.node.path.slice(5)
            return (
                <Link key={menuItem.node.id} href={newPath}>
                  <a className={currentRoute === newPath ? style.active : style.Link}>{menuItem.node.label}</a>
                </Link>
              )
            })}
        </nav>
      <div className={style.menu} onClick={()=>setOpen(prev=> !prev)}>
        <span className={open ? style.active : ''}></span>
        <span className={open ? style.active : ''}></span>
        <span className={open ? style.active : ''}></span>
      </div>
    </>  
  )
}



export default Navbar;

