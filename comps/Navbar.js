import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = ({menu, logo}) => {
  const router = useRouter()
  const currentRoute = router.asPath.length > 1 ? router.asPath + '/' : router.asPath
  
  return (
    <header>
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
        {menu.map(menuItem => {
          const newPath = menuItem.node.path.slice(5)
          
            return (
              <Link key={menuItem.node.id} href={newPath}>
                <a className={currentRoute === newPath ? style.active : ''}>{menuItem.node.label}</a>
              </Link>
            )
          })}
      </nav>
    </header>
  )
}



export default Navbar;

