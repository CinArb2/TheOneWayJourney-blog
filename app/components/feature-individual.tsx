import { Post } from '@/shared/types/posts'
import styles from '@/styles/FeaturedIndiv.module.css'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedIndiv = ({ post }: { post: Post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className={styles.wrapperFeatured}>
        <div className={styles.imageWrapper}>
          <Image
            src={post.featuredImage.url}
            alt="icon-logo"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={styles.FeaturedBody}>
          <h3>{post.title}</h3>
          <p className={styles.FeaturedAuthor}>
            <img src="https://img.icons8.com/ios/50/000000/user--v1.png" />
            {post.author?.name}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedIndiv
