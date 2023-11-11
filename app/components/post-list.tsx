'use client'

import { getPostList } from '../actions/posts'
import PostCard from './post-card'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PostCardSkeleton } from './skeletons'
import { useTransition } from 'react'

export default function PostList({ data }: { data: any }) {
  const { edges, pageInfo } = data.postsConnection
  const [postList, setPostList] = useState(edges)
  const [pagination, setPagination] = useState(pageInfo)
  const [, startTransition] = useTransition()

  const handleClick = async () => {
    const variable = {
      first: pagination.pageSize + 5,
      before: pagination.endCursor,
    }
    const postRes = await getPostList(variable)

    setPostList(postRes.postsConnection.edges)
    setPagination(postRes.postsConnection.pageInfo)
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={postList.length} // items that are currently being rendered
        next={() => startTransition(handleClick)}
        hasMore={pagination?.hasNextPage}
        loader={<PostCardSkeleton />}
      >
        {postList?.map((edge: any) => {
          const post = edge?.node
          return <PostCard key={post.id} post={post} />
        })}
      </InfiniteScroll>
    </div>
  )
}
