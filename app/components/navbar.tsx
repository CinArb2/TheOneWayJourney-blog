import Link from 'next/link'
import Image from 'next/image'
import style from '@/styles/Navbar.module.css'
import { useState } from 'react'
import { Category } from '@/shared/types/posts'
import {
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
  motion,
} from 'framer-motion'

const Navbar = ({ menu, logo }: { menu: Category[]; logo: string }) => {
  const { scrollY } = useScroll()
  const [hideHeader, setHideHeader] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 150) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }
  })

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
          <AnimatePresence mode="popLayout">
            {hideHeader && (
              <motion.div
                key="logo"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="icon-logo"
                    width={130}
                    height={60}
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Link>
              </motion.div>
            )}
            {menu.map((menuItem) => {
              return (
                <motion.div
                  key={menuItem.id}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <Link href={`/category/${menuItem.slug}`}>
                    {menuItem.name}
                  </Link>
                </motion.div>
              )
            })}
            <motion.div key="about" transition={{ duration: 0.2 }} layout>
              <Link href="/about">About us</Link>
            </motion.div>
            <motion.div key="contact" transition={{ duration: 0.2 }} layout>
              <Link href="/contact">Contact us</Link>
            </motion.div>
          </AnimatePresence>
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