import style from '@/styles/PostDetail.module.css'
import Image from 'next/image'
import SocialShare from '@/comps/SocialShare'
import { fetchData } from '@/shared/server/gql.server'
import { allSlugs, postBySlug } from '@/shared/queries'
import { notFound } from 'next/navigation'

export async function getPost(params) {
  const variable = {
    slug: params.slug,
  }
  try {
    const post = await fetchData(postBySlug, variable)
    return post
  } catch (error) {
    // Handle the error here
    console.error('Error fetching post:', error)
    throw error // Re-throw the error to propagate it to the caller if needed
  }
}

export async function generateStaticParams() {
  const slugs = await fetchData(allSlugs)

  return slugs?.posts?.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Page({ params }) {
  const { post } = await getPost(params)

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className={style.headerContent}>
        <div className={style.imageWrapper}>
          <div className={style.overlayBg}></div>
          <Image
            src={post.featuredImage?.url}
            alt="featured image"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className={style.headerTitle}>
            {post.tags?.map((tag) => (
              <span key={tag.id} className={style.postTags}>
                {tag.name}
              </span>
            ))}
            <h1 className={style.postTitle}>{post.title}</h1>
            {post.author?.avatar.url && (
              <div className={style.flexContainer}>
                <div className={style.iconWrapper}>
                  <Image
                    src={post.author?.avatar.url}
                    alt="featured image"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h3>{post.author?.name} /</h3>
                <p>{post.date}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={style.PostContent}
        dangerouslySetInnerHTML={{ __html: `<p>${post?.content?.html}</p>` }}
      />
      <SocialShare post={post} />
    </>
  )
}
