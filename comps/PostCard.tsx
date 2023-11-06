import Image from 'next/image'
import Link from 'next/link'
import style from '../styles/PostCard.module.css'

const PostCard = ({ post }) => {
  return (
    <div className={style.cardWrapper}>
      <Link href={`/post/${post.slug}/`}>
        <div>
          <div className={style.imageWrapper}>
            <div className={style.overlayBg}></div>
            <Image
              src={post.featuredImage.url}
              alt="icon-logo"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
            <div className={style.textImgWrapper}>
              {post.tags?.map((tag) => (
                <span key={tag.id} className={style.tag}>
                  {tag.name}
                </span>
              ))}
              <h2 className={style.title}>
                {' '}
                <span>{post.title}</span>{' '}
              </h2>
            </div>
          </div>

          <div className={style.PostContent}>
            <p>{post.summary}</p>
          </div>

          {/* <Link href={`/post/${post.slug}/`}>
            <button className={style.buttonCard}>Read More</button>
          </Link> */}
        </div>
      </Link>
    </div>
  )
}

export default PostCard
