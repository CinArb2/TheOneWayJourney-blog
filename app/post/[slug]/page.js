import style from '../../../styles/PostDetail.module.css'
import Image from 'next/image'
import React from 'react'
import SocialShare from '../../../comps/SocialShare'
import { fetchData } from '../../../shared/server/gql.server'
import { allSlugs, postBySlug } from '../../../shared/queries'

export async function getPost(params) {
  const variable = {
    slug: params.slug,
  }

  const post = await fetchData(postBySlug, variable)

  return post
}

export async function generateStaticParams() {
  const slugs = await fetchData(allSlugs)

  return slugs?.posts?.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Page({ params }) {
  const { post } = await getPost(params)

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
