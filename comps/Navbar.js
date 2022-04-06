import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'

const Navbar = ({menu, logo}) => {

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
            console.log(newPath)
            //{`/category/${menuItem.node.label}`} / {newPath}
            return (
              <Link key={menuItem.node.id} href={newPath}>
                <a>{menuItem.node.label}</a>
              </Link>
            )
          })}
      </nav>
    </header>
  )
}



export default Navbar;

