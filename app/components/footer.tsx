import style from '@/styles/Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/shared/types/posts'

const Footer = ({
  categoryFooter,
  logo,
}: {
  categoryFooter: Category[]
  logo: string
}) => {
  return (
    <footer className={style.footer}>
      <div className={style.footerLogo}>
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
      </div>
      <div className={style.footerDescription}>
        <p>“The journey of a thousand miles begins with a single step.”</p>
        <p className={style.copyright}>© 2021, All Rights Reserved.</p>
      </div>
      <div className={style.quickLinks}>
        <h3>Quick Links</h3>
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
        <Link href="/sitemap.xml">Site map</Link>
      </div>
      <div className={style.category}>
        <h3>Category</h3>
        {categoryFooter.map((category) => {
          return (
            <Link href={`/category/${category.slug}`} key={category.id}>
              {category.name}
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
