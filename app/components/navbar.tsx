import Link from 'next/link'
import Image from 'next/image'
import style from '@/styles/Navbar.module.css'
import { useRef, useState } from 'react'
import { Category } from '@/shared/types/posts'
import {
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
  motion,
} from 'framer-motion'
import { useWindowSize } from '@uidotdev/usehooks'

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

const navVariant = {
  open: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
}

const Navbar = ({ menu, logo }: { menu: Category[]; logo: string }) => {
  const { scrollY } = useScroll()
  const ref = useRef<HTMLHeadingElement>(null)
  const [hideHeader, setHideHeader] = useState(false)
  const [open, setOpen] = useState(false)
  const size = useWindowSize()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const $header = ref.current

    if (!$header || !size.width) return

    const currScrollY = scrollY.get()
    const offsetHeight = $header?.offsetHeight
    setHideHeader(currScrollY > offsetHeight)

    if (currScrollY > offsetHeight && size.width > 1150) {
      $header.style.top = `-${offsetHeight - 100}px`
    } else {
      $header.style.top = `0`
    }
  })

  return (
    <>
      {open && (
        <div className={style.backdrop} onClick={() => setOpen(false)}></div>
      )}
      <header ref={ref} className={`${style.headerContainer}`}>
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
                transition={{ duration: 0.2 }}
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
      <motion.div initial={false} animate={open ? 'open' : 'closed'}>
        <motion.nav
          className={`${style.NavbarMobile} ${open ? style.active : ''}`}
          variants={navVariant}
        >
          {menu.map((menuItem) => {
            return (
              <motion.div key={menuItem.id} variants={itemVariants}>
                <Link
                  href={`/category/${menuItem.slug}`}
                  onClick={() => setOpen(false)}
                >
                  {menuItem.name}
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>
        <motion.div
          whileTap={{ scale: 0.8 }}
          className={style.menu}
          onClick={() => setOpen(!open)}
        >
          <span className={open ? style.active : ''}></span>
          <span className={open ? style.active : ''}></span>
          <span className={open ? style.active : ''}></span>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navbar
