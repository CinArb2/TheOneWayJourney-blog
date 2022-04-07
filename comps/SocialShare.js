import style from '../styles/SocialShare.module.css'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

const SocialShare = ({post}) => {
  return (
    <div className={style.socialContainer}>
        <h3>Share Article</h3>
        <FacebookShareButton
          url={`http://theonewayjourney.com/${post.slug}/`} >
          <FacebookIcon size={50} round />
        </FacebookShareButton>
        <PinterestShareButton
          url={`http://theonewayjourney.com/${post.slug}/`} >
          <PinterestIcon size={50} round />
        </PinterestShareButton>
        <RedditShareButton
          url={`http://theonewayjourney.com/${post.slug}/`} >
          <RedditIcon size={50} round />
        </RedditShareButton>
        <WhatsappShareButton
          url={`http://theonewayjourney.com/${post.slug}/`} >
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={`http://theonewayjourney.com/${post.slug}/`} >
          <LinkedinIcon size={50} round />
        </LinkedinShareButton>
      </div>
  )
}

export default SocialShare

