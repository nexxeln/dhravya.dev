import '@fontsource/inter/variable-full.css'
import 'katex/dist/katex.css'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'

import Analytics from '@/components/analytics'
import { ClientReload } from '@/components/helpers/ClientReload'
import LayoutWrapper from '@/components/helpers/LayoutWrapper'
import '@/css/prism.css'
import '@/css/tailwind.css'
import siteMetadata from '@/data/siteMetadata'

import type { AppProps } from 'next/app'

// // @ts-ignore
// const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
//   ssr: false,
// })

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <NextNProgress color='linear-gradient(to right, #9061F9, #E74694)' />
      {/* @ts-ignore */}
      {/* <AnimatedCursor innerSize={8} outerSize={15} color='230, 230, 230' outerAlpha={0.2} innerScale={0.7} outerScale={3} */}
      {/* /> */}
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
