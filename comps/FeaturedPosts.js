import style from '../styles/FeaturedPosts.module.css'
import FeaturedIndiv from './FeaturedIndiv'

const FeaturedPosts = ({ featuredPosts }) => {
  return (
    <div className={style.ContainerAside}>
      <h2 className={style.asideTitle}>Featured posts</h2>
      {featuredPosts.map((feat) => (
        <FeaturedIndiv key={feat.id} feat={feat} />
      ))}
    </div>
  )
}

export default FeaturedPosts
