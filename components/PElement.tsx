import Link from 'next/link'
import React from 'react'

import type { Topic } from 'types/PostFrontMatter'

const icons = {
  project: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-12 h-12'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      />
    </svg>
  ),
  experience: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-12 h-12'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      />
    </svg>
  ),
  programming: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-12 h-12'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
    </svg>
  ),
}

function PElement({
  className,
  title,
  topic = 'programming',
  description,
  custom_icon,
  href,
  tags = [],
}: {
  className?: string
  title?: string
  description?: string
  topic?: Topic
  custom_icon?: React.ReactNode
  href?: string
  tags?: string[]
}) {
  return (
    <Link passHref href={href?.startsWith('/') ? href : `/`}>
      <a>
        <div
          className={`rounded-xl md:mx-4 flex flex-col mt-10 border-4 w-full md:w-80 xl:w-96  ${className} group hover:scale-105 ease-out duration-150`}
        >
          <div
            className={`flex items-center m-3 text-[#380d79] group-hover:text-white`}
          >
            {custom_icon ? custom_icon : icons[topic]}
            {tags &&
              tags.slice(0, 2).map((tag, index) => (
                <div key={tag}>
                  <span className='rounded-full px-2 bg-blue-300 mx-1 text-xs sm:text-sm py-1 text-slate-600'>
                    {tag}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={`flex font-semibold justify-start mx-5 mt-4 mb-8 ${
              // According to title length, change font size
              title?.split(' ').length > 12 ? 'text-xl' : 'text-2xl'
            } font-poppins`}
          >
            {title}
          </div>
          <div className='mx-2 mb-5 text-slate-300 md:mx-5'>{description}</div>
        </div>
      </a>
    </Link>
  )
}

export default PElement
