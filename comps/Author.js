import styles from '../styles/Author.module.css'
import Image from "next/image"

const Author = ({ author }) => {
  const mainAuthor = author[0]

  return (
    <div className={styles.authorWrapper}>
      <div className={styles.bgImgWrapper}>
        <Image
          src="/bgAuthor.avif"
          alt="icon-author"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className={styles.authorImgWrapper}>
        <Image
          src={mainAuthor.avatar.url}
          alt="icon-author"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <h3 className={styles.authorTitle}>{mainAuthor.name}</h3>
      <div className={styles.authorContent}
        dangerouslySetInnerHTML={{__html: mainAuthor.description.split('end')[0]}}
      />
    </div>
  )
}

export default Author;