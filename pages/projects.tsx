import Head from 'next/head'

import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

import type { NextPage } from 'next'

const Home: NextPage = () => {
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

        <Projects total={80} fullscreen={true} />
      </main>
    </>
  )
}

export default Home
