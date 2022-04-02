import style from '../styles/Tags.module.css'

const Tags = ({ tags }) => {
  console.log(tags)
  return (
    <div className={style.tagContainer}>
      <h1 className={style.tagsTitle}>Tags</h1>
      <div>
        {tags.map(tag => (
          <span key={tag.id} className={style.tags}>{tag.name }</span>
        ))}
      </div>
    </div>
  )
}

export default Tags