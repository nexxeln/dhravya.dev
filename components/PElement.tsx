import Link from 'next/link'
import React from 'react'

import { icons } from '@/data/clss'

import type { Topic } from 'types/PostFrontMatter'

function PElement({
  className,
  title,
  topic,
  description,
  custom_icon,
  href,
  projectPage = false,
  tags = [],
}: {
  className?: string
  title?: string
  description?: string
  topic?: Topic
  custom_icon?: React.ReactNode
  href?: string
  tags?: string[]
  projectPage?: boolean
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
                  <span className='rounded-full px-2 bg-blue-300 mx-1 text-xs sm:text-sm py-1 text-slate-600 border border-blue-400'>
                    {tag}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={`flex font-semibold justify-start mx-5 mt-4 mb-8 ${
              // According to title length, change font size
              title?.split(' ').length > 12 ? 'text-xl' : 'text-2xl'
            } 
            ${projectPage ? 'text-white' : 'text-slate-800'}
            
            font-poppins`}
          >
            {title}
          </div>
          <div
            className={`mx-2 mb-5 md:mx-5 ${
              projectPage ? 'text-white' : 'text-slate-800'
            }`}
          >
            {description}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PElement
