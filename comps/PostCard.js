import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import style from '../styles/PostCard.module.css'



const PostCard = ({ post }) => {
  
  return (
    <div className={style.cardWrapper}>
      
      <div className={style.imageWrapper}>
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt="icon-logo"
          objectFit="cover"
          layout="fill"
          />
      </div>
    
      <h2 className={style.title}>{post.title}</h2>
      <div className={style.PostContent}
        dangerouslySetInnerHTML={{__html: post.excerpt}}
      />
      <span>Tags</span>
      <Link href={`/post/${post.slug}`}>
        <button className={style.buttonCard}>Read More</button>
      </Link>
    </div>
  )
}

export default PostCard