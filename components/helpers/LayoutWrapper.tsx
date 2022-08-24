import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

import Logo from '@/data/logo.svg'

import Footer from '../Footer'

import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div>
      <div className='flex h-screen flex-col justify-between'>
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutWrapper
