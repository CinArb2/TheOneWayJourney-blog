import styles from '../styles/FeaturedIndiv.module.css'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedIndiv = ({ feat }) => {
  console.log(feat)
  return (
    <div className={styles.wrapperFeatured}>
      <div className={styles.imageWrapper}>
        <Image
          src={feat.featuredImage.url}
          alt="icon-logo"
          objectFit="cover"
          layout="fill"
          />
      </div>
      <div className={styles.FeaturedBody} >
        <Link href={`/post/${feat.slug}`}>
          <a className={styles.FeaturedTitle}>
            <h3 >{feat.title}</h3>
          </a>
        </Link>
        <p className={styles.FeaturedAuthor}> <img src="https://img.icons8.com/ios/50/000000/user--v1.png"/>  {feat.author.name}</p>
      </div>
    </div>
  )
}

export default FeaturedIndiv