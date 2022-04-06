import style from '../styles/Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Footer = ({ menu, logo }) => {
  console.log(menu)
  
  return (
    <footer className={style.footer}>
      <div>
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
        <p className={style.copyright}>© 2021, All Rights Reserved.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
      </div>
       <div>
        <h3>Category</h3>
      </div>
       <div>
        <h3>Follow us</h3>
      </div>
    </footer>
  )
}

export default Footer