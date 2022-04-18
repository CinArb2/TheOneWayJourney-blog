import Image from 'next/image'
import Link from 'next/link'
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
        <div className={style.textImgWrapper}>
          {post.tags.nodes.map(tag => (
            <span key={tag.tagId} className={style.tag}>{tag.name}</span>
          ))}
            <h2 className={style.title}> <span>{post.title}</span> </h2>
        </div>
      </div>
    
      <div className={style.PostContent}
        dangerouslySetInnerHTML={{__html: post.excerpt}}
      />
      
      <Link href={`/post/${post.slug}/`}>
        <button className={style.buttonCard}>Read More</button>
      </Link>
    </div>
  )
}

export default PostCard