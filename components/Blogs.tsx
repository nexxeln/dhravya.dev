import { LightBulbIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import PElement from './PElement'
import Pagination from './helpers/Pagination'

import type { ComponentProps } from 'react'
import type { PostFrontMatter } from 'types/PostFrontMatter'

function Blogs({
  total = 300,
  posts,
  title,
  showMoreButton = false,
  fullscreen = false,
  initialDisplayPosts,
  pagination,
}: {
  total?: number
  posts: PostFrontMatter[]
  title?: string
  showMoreButton?: boolean
  fullscreen?: boolean
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts?.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts

  return (
    <div className={`px-5 pt-10 md:px-10 ${fullscreen && 'min-h-screen'}`}>
      <div className='flex items-center justify-center mt-6 text-3xl font-semibold text-purple-300 md:text-5xl font-poppins'>
        {title ? title : !fullscreen ? 'Latest Blogs' : 'Blogs'}
      </div>

      <div className='flex items-center justify-center mt-5 '>
        {fullscreen && (
          <div className='relative w-80'>
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles'
              className='block w-full rounded-md border  px-4 py-2  focus:border-primary-500 focus:ring-primary-500 border-gray-900 bg-gray-800 text-gray-100'
            />
            <svg
              className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        )}
      </div>

      <div className='md:flex-wrap md:flex justify-evenly'>
        {!filteredBlogPosts.length && 'No posts found.'}
        {displayPosts
          .map((blog, index) => {
            if (index >= total) return null
            return (
              <PElement
                key={blog.title}
                tags={blog.tags}
                title={blog.title}
                description={
                  blog.summary.slice(0, 100) +
                  (blog.summary.length > 100 ? '...' : '')
                }
                topic={blog.topic}
                className={
                  blog.topic == 'programming' ? 'bg-purple-300' : 'bg-blue-300'
                }
                href={`/blog/${blog.slug}`}
              />
            )
          })
          .filter(Boolean)}
      </div>
      {showMoreButton && (
        <div className='flex w-full justify-end mr-8 text-white mt-4'>
          <Link href='/blog'>
            <a className='flex gap-2 group'>
              {' '}
              View all Blogs
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 group-hover:translate-x-3 ease-in-out duration-150'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </a>
          </Link>
        </div>
      )}

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  )
}

export default Blogs
