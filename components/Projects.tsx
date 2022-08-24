import { LightBulbIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import projectsData from '@/data/projectsData'

import PElement from './PElement'

function Projects({
  total = 3,
  showMoreButton = false,
  fullscreen = false,
}: {
  total: number
  showMoreButton?: boolean
  fullscreen?: boolean
}) {
  return (
    <div className={`px-5 pt-10 md:px-10 ${fullscreen && 'min-h-screen'}`}>
      <div className='flex items-center justify-center mt-6 text-3xl font-semibold text-purple-300 md:text-5xl font-poppins'>
        Projects
      </div>
      <div className='md:flex-wrap md:flex justify-evenly'>
        {projectsData
          .map((project, index) => {
            if (index >= total) return null
            return (
              <PElement
                key={project.title}
                topic='project'
                custom_icon={
                  project.iconType === 'image' ? (
                    <Image
                      width={48}
                      height={48}
                      alt={`${project.title} logo`}
                      className='w-12 h-12'
                      src={project.icon}
                      unoptimized
                    />
                  ) : (
                    project.icon
                  )
                }
                title={project.title}
                description={project.description}
                className={project.className}
              />
            )
          })
          .filter(Boolean)}
      </div>
      {showMoreButton && (
        <div className='flex w-full justify-end mr-8 text-white mt-4'>
          <Link href='/projects'>
            <a className='flex gap-2 group'>
              {' '}
              View all projects
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

export default Projects
