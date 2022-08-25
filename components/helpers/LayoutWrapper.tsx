import { useRouter } from 'next/router'

import Footer from '../Footer'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const router = useRouter()

  const isBlogPage =
    router.pathname.startsWith('/blog/') &&
    !router.pathname.startsWith('/blog/page')
  return (
    <div>
      <div className='flex h-screen flex-col justify-between'>
        <main className='mb-auto'>{children}</main>
        <Footer bg={isBlogPage ? 'bg-[#171717]' : 'bg-purplishBackground'} />
      </div>
    </div>
  )
}

export default LayoutWrapper
