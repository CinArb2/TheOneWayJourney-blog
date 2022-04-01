import styles from '../styles/FeaturedIndiv.module.css'
import Image from 'next/image'

const FeaturedIndiv = ({feat}) => {
  return (
    <div className={styles.wrapperFeatured}>
      {/* <div className={styles.FeaturedImg}>
        <Image
          src={feat.featuredImage.node.sourceUrl}
          alt="icon-logo"
          width={100}
          height={100}
          objectFit="cover"
          />
      </div> */}
      <div className={styles.imageWrapper}>
        <Image
          src={feat.featuredImage.node.sourceUrl}
          alt="icon-logo"
          objectFit="cover"
          layout="fill"
          />
      </div>
      <div className={styles.FeaturedBody} >
        <h3 className={styles.FeaturedTitle}>{feat.title}</h3>
        <p className={styles.FeaturedAuthor}> <img src="https://img.icons8.com/ios/50/000000/user--v1.png"/>  {feat.author.node.name}</p>
       
      </div>
    </div>
  )
}

export default FeaturedIndiv