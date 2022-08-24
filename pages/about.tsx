import { MDXLayoutRenderer } from '@/components/MDXComponents'
import Navbar from '@/components/Navbar'
import SectionContainer from '@/components/helpers/SectionContainer'
import { getFileBySlug } from '@/lib/mdx'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const DEFAULT_LAYOUT = 'AuthorLayout'

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter }
}> = async () => {
  const authorDetails = await getFileBySlug('authors', ['default'])
  const { mdxSource, frontMatter } = authorDetails
  return { props: { authorDetails: { mdxSource, frontMatter } } }
}

export default function About({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <div className='bg-purplishBackground dark'>
      <Navbar />
      <SectionContainer>
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
        />
      </SectionContainer>
    </div>
  )
}
