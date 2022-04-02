import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'

const Navbar = ({menu, logo}) => {
  
  return (
    <header href="/">
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
        {
          menu.map(menuItem => (
            <Link key={menuItem.node.id} href="/"><a>{menuItem.node.label}</a></Link>
          ))
        }
      </nav>
    </header>
  )
}



export default Navbar;

