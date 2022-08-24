import NextImage from 'next/image'

import type { ImageProps } from 'next/image'

type CompulSoryImageProps = ImageProps & {
  src: string
  alt: string
}

const Image = ({ src, ...rest }: CompulSoryImageProps) => (
  <NextImage src={src} {...rest} />
)

export default Image
