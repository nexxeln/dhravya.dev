import Head from 'next/head'

import type ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter, getAllProjectFrontMatter } from '@/lib/mdx'

import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 6

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>['posts']
}> = async () => {
  const postsUnfiltered = await getAllProjectFrontMatter()

  const posts = postsUnfiltered.filter(
    (post) => !post.tags?.includes('big-project'),
  )

  return { props: { posts } }
}

export default function Project({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts)

  return (
    <>
      <Head>
        <title>Projects | Dhravya Shah</title>
        <meta
          name='description'
          content='A collection of all my projects - big and small!'
        />
      </Head>

      <main className='bg-[#380d79]'>
        <Navbar />

        <Projects total={80} fullscreen={true} displayPosts={posts} />
      </main>
    </>
  )
}
