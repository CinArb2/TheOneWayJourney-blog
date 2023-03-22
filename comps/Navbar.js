import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navbar = ({ menu, logo }) => {
  const router = useRouter()
  const currentRoute =
    router.asPath.length > 1 ? router.asPath + '/' : router.asPath
  const [hideHeader, setHideHeader] = useState(false)
  const [open, setOpen] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 100 && window.innerWidth > 1149) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={`${style.headerContainer} ${hideHeader ? style.active : ''}`}
      >
        <Link href="/">
          <a>
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
          <Link href="/">
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
          <Link href="/">
            <a className={currentRoute === '/' ? style.active : style.Link}>
              Home
            </a>
          </Link>
          {menu.map((menuItem) => {
            return (
              <Link key={menuItem.id} href={`/category/${menuItem.slug}`}>
                <a
                  className={
                    currentRoute === `/category/${menuItem.slug}/`
                      ? style.active
                      : style.Link
                  }
                >
                  {menuItem.name}
                </a>
              </Link>
            )
          })}
          <Link href="/about">
            <a
              className={currentRoute === '/about/' ? style.active : style.Link}
            >
              About us
            </a>
          </Link>
          <Link href="/contact">
            <a
              className={
                currentRoute === '/contact/' ? style.active : style.Link
              }
            >
              Contact us
            </a>
          </Link>
        </nav>
      </header>
      <nav className={`${style.NavbarMobile} ${open ? style.active : ''}`}>
        {menu.map((menuItem) => {
          return (
            <Link key={menuItem.id} href={`/category/${menuItem.slug}`}>
              <a
                className={
                  currentRoute === menuItem.name ? style.active : style.Link
                }
              >
                {menuItem.name}
              </a>
            </Link>
          )
        })}
      </nav>
      <div className={style.menu} onClick={() => setOpen((prev) => !prev)}>
        <span className={open ? style.active : ''}></span>
        <span className={open ? style.active : ''}></span>
        <span className={open ? style.active : ''}></span>
      </div>
    </>
  )
}

export default Navbar
