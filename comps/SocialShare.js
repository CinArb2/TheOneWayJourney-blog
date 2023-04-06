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
} from 'next-share'

const SocialShare = ({ post }) => {
  return (
    <div className={style.socialContainer}>
      <h3>Share Article</h3>
      <FacebookShareButton
        url={`https://www.theonewayjourney.com/post/${post.slug}/`}
      >
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <PinterestShareButton
        url={`https://www.theonewayjourney.com/post/${post.slug}/`}
      >
        <PinterestIcon size={50} round />
      </PinterestShareButton>
      <RedditShareButton
        url={`https://www.theonewayjourney.com/post/${post.slug}/`}
      >
        <RedditIcon size={50} round />
      </RedditShareButton>
      <WhatsappShareButton
        url={`https://www.theonewayjourney.com/post/${post.slug}/`}
      >
        <WhatsappIcon size={50} round />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={`https://www.theonewayjourney.com/post/${post.slug}/`}
      >
        <LinkedinIcon size={50} round />
      </LinkedinShareButton>
    </div>
  )
}

export default SocialShare
