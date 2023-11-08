'use client'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/styles/PostCard.module.css'
import { SummaryPost } from '@/shared/types/posts'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const PostCard = ({ post }: { post: SummaryPost }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className={style.cardWrapper} ref={ref}>
      <Link href={`/post/${post.slug}/`}>
        <div
          style={{
            transform: isInView ? 'none' : 'translateX(-200px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
        >
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
        </div>
      </Link>
    </div>
  )
}

export default PostCard
