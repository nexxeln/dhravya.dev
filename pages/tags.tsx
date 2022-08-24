import Navbar from '@/components/Navbar'
import Link from '@/components/helpers/Link'
import { PageSEO } from '@/components/helpers/SEO'
import Tag from '@/components/helpers/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>
}> = async () => {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <div className='bg-purplishBackground'>
      <PageSEO
        title={`Tags - ${siteMetadata.author}`}
        description='Things I blog about'
      />

      <Navbar />
      <div className='flex flex-col min-h-screen items-start justify-start divide-y divide-gray-700 md:flex-row md:mt-32 md:justify-center md:space-x-6 md:divide-y-0 mx-5 md:mx-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Tags
          </h1>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className='mt-2 mb-2 mr-5'>
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className='-ml-2 text-sm font-semibold uppercase text-gray-300'
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
