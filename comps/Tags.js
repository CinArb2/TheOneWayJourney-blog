import Link from 'next/link'
import style from '../styles/Tags.module.css'

const Tags = ({ tags }) => {
  
  return (
    <div className={style.tagContainer}>
      <h1 className={style.tagsTitle}>Tags</h1>
      <div>
        {tags.map(tag => (
          <Link href={`/tag/${tag.slug}`} key={tag.id} >
            <a>
              <span className={style.tags}>{tag.name }</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tags