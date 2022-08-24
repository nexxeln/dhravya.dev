import { MDXProvider } from '@mdx-js/react'
import { getMDXComponent } from 'mdx-bundler/client'
import React, { useMemo } from 'react'

import { BlogNewsletterForm } from './NewsletterForm'
import Image from './helpers/Image'
import CustomLink from './helpers/Link'
import Pre from './helpers/Pre'
import TOCInline from './helpers/TOCInline'

import type { ComponentMap } from 'mdx-bundler/client'

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

// https://mdxjs.com/table-of-components/#components
export const MDXComponents: ComponentMap = {
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,

  Image,
  TOCInline,
  BlogNewsletterForm,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
