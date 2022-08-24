import { useEffect, useState } from 'react'

import About from '@/components/About'
import Blogs from '@/components/Blogs'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import NewsletterForm from '@/components/NewsletterForm'
import Projects from '@/components/Projects'
import Link from '@/components/helpers/Link'
import { PageSEO } from '@/components/helpers/SEO'
import Tag from '@/components/helpers/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { PostFrontMatter } from 'types/PostFrontMatter'

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isOnTop, setIsOnTop] = useState(true)

  const handleScroll = () => {
    setIsOnTop(window.scrollY <= 25)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='bg-purplishBackground pb-10'>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className='bg-purplishBackground'>
        <Hero showElements={isOnTop} />
        <Navbar />
        <About />
        <Projects total={3} showMoreButton={true} />
        <Blogs total={3} showMoreButton={true} posts={posts} />
      </div>
      {siteMetadata.newsletter.provider !== '' && (
        <div className='flex items-center justify-center pt-4'>
          <NewsletterForm title='Subscribe to Wow, Tech! Newsletter' />
        </div>
      )}
    </div>
  )
}
