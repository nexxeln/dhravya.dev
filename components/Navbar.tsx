import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import styles from '@/css/Neon.module.css'
import headerNavLinks from '@/data/headerNavLinks'
// import icon from '@/public/static/icon.png'

import Link from './helpers/Link'
import MobileNav from './helpers/MobileNav'

function Navbar() {
  return (
    <div className='sticky top-0 p-2 flex items-center justify-between bg-inherit z-50 transition-all duration-150 ease-in-out'>
      <Link href='/'>
        <a className='flex mx-3 md:mx-6 items-center'>
          <Image
            width={48}
            height={48}
            alt='Dhravya Shah'
            src={'/static/icon.png'}
            className='w-12 h-12'
          />
          <div
            className={`mx-3 font-poppins font-bold
                  uppercase text-white text-2xl md:text-3xl
                  selection:bg-blue-200 selection:text-gray-400
                  focus:outline-none ${styles.animateFlicker}`}
          >
            Dhravya Shah
          </div>
        </a>
      </Link>

      <div className='flex items-center text-base leading-5'>
        <div className='hidden sm:block'>
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className='p-1 font-medium text-gray-100 sm:p-4'
            >
              {link.title}
            </Link>
          ))}
        </div>
        <MobileNav />
      </div>
    </div>
  )
}

export default Navbar
