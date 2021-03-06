import style from '../styles/Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Footer = ({ categoryFooter, logo }) => {
  
  return (
    <footer className={style.footer}>
      <div className={style.footerLogo}>
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
      </div>
      <div className={style.footerDescription}>
        <p>“The journey of a thousand miles begins with a single step.”</p>
        <p className={style.copyright}>© 2021, All Rights Reserved.</p>
      </div>
      <div className={style.quickLinks}>
        <h3>Quick Links</h3>
        <Link href="/" >
          <a className={style.listLinks}>Home</a>
        </Link>
        <Link href="/about" >
          <a className={style.listLinks}>About us</a>
        </Link>
        <Link href="/contact" >
          <a className={style.listLinks}>Contact us</a>
        </Link>
      </div>
       <div className={style.category}>
        <h3>Category</h3>
        {
          categoryFooter.map(category => {
            
              return (
                <Link href={`/category/${category.slug}`} key={category.id} >
                  <a className={style.listLinks}>{category.name}</a>
                </Link>
              )
          })
        }
      </div>
    </footer>
  )
}

export default Footer