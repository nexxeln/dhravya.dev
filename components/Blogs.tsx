import { LightBulbIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import PElement from './PElement'

import type { PostFrontMatter } from 'types/PostFrontMatter'

function Blogs({
  total = 3,
  posts,
  showMoreButton = false,
  fullscreen = false,
}: {
  total: number
  posts: PostFrontMatter[]
  showMoreButton?: boolean
  fullscreen?: boolean
}) {
  console.log(posts)

  return (
    <div className={`px-5 pt-10 md:px-10 ${fullscreen && 'min-h-screen'}`}>
      <div className='flex items-center justify-center mt-6 text-3xl font-semibold text-purple-300 md:text-5xl font-poppins'>
        Blogs
      </div>
      <div className='md:flex-wrap md:flex justify-evenly'>
        {posts
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
                className='bg-blue-700'
                href={`/blog/${blog.slug}`}
              />
            )
          })
          .filter(Boolean)}
      </div>
      {showMoreButton && (
        <div className='flex w-full justify-end mr-8 text-white mt-4'>
          <Link href='/blogs'>
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
    </div>
  )
}

export default Blogs
