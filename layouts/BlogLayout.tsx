import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ProgressBar from 'react-scroll-progress-bar'

import PElement from '@/components/PElement'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Comments from '@/components/comments'
import Image from '@/components/helpers/Image'
import Link from '@/components/helpers/Link'
import { BlogSEO } from '@/components/helpers/SEO'
import SectionContainer from '@/components/helpers/SectionContainer'
import Tag from '@/components/helpers/Tag'
import { classes, icons } from '@/data/clss'
import siteMetadata from '@/data/siteMetadata'

import type { ReactNode } from 'react'
import type { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import type { PostFrontMatter } from 'types/PostFrontMatter'

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`,
  )}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  // in format 17th august 2020
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
}

function Author({ authorDetails }: { authorDetails: AuthorFrontMatter[] }) {
  return (
    <dl className='pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700'>
      <dt className='sr-only'>Authors</dt>
      <dd>
        <ul className='flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8'>
          {authorDetails.map((author) => (
            <li className='flex items-center space-x-2' key={author.name}>
              {author.avatar && (
                <Image
                  src={author.avatar}
                  width='38px'
                  height='38px'
                  alt='avatar'
                  className='h-10 w-10 rounded-full'
                />
              )}
              <dl className='whitespace-nowrap text-sm font-medium leading-5'>
                <dt className='sr-only'>Name</dt>
                <dd className='text-gray-900'>{author.name}</dd>
                <dt className='sr-only'>Twitter</dt>
                <dd>
                  {author.twitter && (
                    <Link
                      href={author.twitter}
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      {author.twitter.replace('https://twitter.com/', '@')}
                    </Link>
                  )}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}: Props) {
  const { slug, fileName, date, title, tags, topic, summary, ogImage } =
    frontMatter

  return (
    <div>
      <ProgressBar bgcolor='#8e5cba' duration='0.2' />
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
          <header className='pt-2 xl:pb-6 relative min-h-screen'>
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, type: 'spring', delay: 0.5 }}
              className='md:absolute z-10 relative md:right-10 md:bottom-20 top-10  md:top-auto md:mx-0'
            >
              <motion.div
                animate={{ y: [-5, 0, 5, 0, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                {ogImage && (
                  <div className='md:w-[40vw] mx-10'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ogImage} className='rounded-lg' alt={''} />
                  </div>
                )}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, type: 'spring', delay: 0.5 }}
              className={`flex justify-between mx-8 md:mx-16 mt-5 p-8 md:p-20 rounded-xl  md:min-h-[75vh] md:w-[75vw]  ${
                classes[topic ? topic : 'programming']
              }`}
            >
              <div className='mt-10 md:mt-0'>
                <div className='inline-flex items-center h-min gap-2'>
                  <span className='rounded-full bg-blue-500 px-3 text-white text-sm py-1'>
                    {topic?.toUpperCase()}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {new Date(date).toLocaleDateString(
                      siteMetadata.locale,
                      postDateTemplate,
                    )}
                  </span>
                </div>
                <div className='mt-5'>
                  <h1 className='font-poppins font-extrabold text-4xl mb-5'>
                    {title}
                  </h1>
                  <div className='md:w-1/2 text-xl'>{summary}</div>
                  <div className='w-fit '>
                    {/* Divider */}
                    <div className='w-full h-px bg-gray-200 mt-10'> </div>
                    <Author authorDetails={authorDetails} />
                  </div>
                </div>
              </div>

              <div className='hidden md:block'>{icons[topic]}</div>
            </motion.div>
          </header>

          <SectionContainer>
            <div
              className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
                <div className='prose max-w-none pt-10 pb-8 dark:prose-dark'>
                  {children}
                </div>
                <div className='pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'>
                  <Link href={discussUrl(slug)} rel='nofollow'>
                    {'Discuss on Twitter'}
                  </Link>
                  {` • `}
                  <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
                </div>
                <Comments frontMatter={frontMatter} />
              </div>
              <footer>
                <div className='divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                  {tags && (
                    <div className='py-4 xl:py-8'>
                      <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                        Tags
                      </h2>
                      <div className='flex flex-wrap'>
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
                      {prev && (
                        <div>
                          <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                            Previous Article
                          </h2>
                          <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                            <Link href={`/blog/${prev.slug}`}>
                              {prev.title}
                            </Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                            Next Article
                          </h2>
                          <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                            <Link href={`/blog/${next.slug}`}>
                              {next.title}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className='pt-4 xl:pt-8'>
                  <Link
                    href='/blog'
                    className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </SectionContainer>
        </div>
      </article>
    </div>
  )
}
