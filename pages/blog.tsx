import { useState } from 'react'

import Blogs from '@/components/Blogs'
import Navbar from '@/components/Navbar'
import { PageSEO } from '@/components/helpers/SEO'
import siteMetadata from '@/data/siteMetadata'
import type ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 6

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>['posts']
  initialDisplayPosts: ComponentProps<typeof ListLayout>['initialDisplayPosts']
  pagination: ComponentProps<typeof ListLayout>['pagination']
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='bg-purplishBackground'>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />

      <Navbar />

      <Blogs
        total={50}
        posts={posts}
        fullscreen={true}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </div>
  )
}
