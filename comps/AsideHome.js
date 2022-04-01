import style from '../styles/AsideHome.module.css'
import FeaturedIndiv from './FeaturedIndiv'

const AsideHome = ({featuredPosts}) => {
  return (
    <div className={style.ContainerAside}>
      <h2>Featured posts</h2>
      {
        featuredPosts.map(feat => (
          <FeaturedIndiv key={feat.id} feat={feat}/>
        ))
      }
    </div>
  )
}

export default AsideHome