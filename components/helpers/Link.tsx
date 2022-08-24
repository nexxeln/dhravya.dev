/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}></a>
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest}></a>
  }

  return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
}

export default CustomLink
