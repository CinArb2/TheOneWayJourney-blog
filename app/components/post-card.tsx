'use client'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/styles/PostCard.module.css'
import { SummaryPost } from '@/shared/types/posts'

const PostCard = ({ post }: { post: SummaryPost }) => {
  return (
    <div className={style.cardWrapper}>
      <Link href={`/post/${post.slug}/`}>
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
              <span>{post.title}</span>
            </h2>
          </div>
        </div>

        <div className={style.PostContent}>
          <p>{post.summary}</p>
        </div>

        <button className={style.buttonCard}>Read More</button>
      </Link>
    </div>
  )
}

export default PostCard
