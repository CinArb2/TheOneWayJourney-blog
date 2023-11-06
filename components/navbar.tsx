import Link from 'next/link'
import Image from 'next/image'
import style from '@/styles/Navbar.module.css'
import { useState, useEffect } from 'react'
import { Category } from '@/shared/types/posts'

const Navbar = ({ menu, logo }: { menu: Category[]; logo: string }) => {
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
          <div className={style.logoContainer}>
            <Image
              src={logo}
              alt="icon-logo"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </Link>
        <nav className={style.Navbar}>
          <Link href="/">
            <div className={style.logoNavbar}>
              <Image
                src={logo}
                alt="icon-logo"
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </Link>
          <Link href="/">Home</Link>
          {menu.map((menuItem) => {
            return (
              <Link key={menuItem.id} href={`/category/${menuItem.slug}`}>
                {menuItem.name}
              </Link>
            )
          })}
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact us</Link>
        </nav>
      </header>
      <nav className={`${style.NavbarMobile} ${open ? style.active : ''}`}>
        {menu.map((menuItem) => {
          return (
            <Link key={menuItem.id} href={`/category/${menuItem.slug}`}>
              {menuItem.name}
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
