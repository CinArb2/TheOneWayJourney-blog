
export interface Tag {
  id: string
  name: string
  slug?: string
}
interface FeaturedImage {
  id: string
  url: string
}

export interface Avatar {
  id: string
  url: string
}

export interface Author {
  id: string
  name: string
  avatar: Avatar
}

export interface Post {
  id: string
  title: string
  date: string
  author: Author
  content: { html: string }
  slug: string
  featuredImage: FeaturedImage,
  tags: Tag[]
}

export interface SummaryPost extends Omit<Post, 'date' | 'author' | 'content'> {
  summary: string
}

export interface Posts {
  posts: SummaryPost[]
}

export interface IndividualPost {
  post: Post
}
