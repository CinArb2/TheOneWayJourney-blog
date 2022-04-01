import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navbar.module.css'

const Navbar = ({menu, logo}) => {
  
  return (
    <header>
      <div style={{
          display: "flex",
          justifyContent: "center",
      }}
      className={style.logoContainer}
      >
        <Image
        src={logo}
        alt="icon-logo"
        width={400}
        height={129}
        objectFit="cover"
      />
      </div>
      
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

