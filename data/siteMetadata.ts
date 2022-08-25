const siteMetadata = {
  title: 'Dhravya Shah | Blog',
  author: 'Dhravya Shah',
  headerTitle: 'Dhravya Shah',
  description:
    'A blog where I write about my coding journey, tips, experiences , fun, everything.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://dhravya.dev',
  siteRepo: 'https://github.com/dhravya/dhravya.dev',
  siteLogo: '/static/images/icon.png',
  favicon: '/favicon.ico',
  image: '/static/images/icon.png',
  socialBanner: '/twitter-banner.png',
  email: 'hello@dhravya.dev',
  github: 'https://github.com/dhravya',
  twitter: 'https://twitter.com/DhravyaShah',
  youtube: 'https://www.youtube.com/channel/UCYJ4Ay7j0Xk8NfgcXaBna5g',
  linkedin: 'https://www.linkedin.com/in/dhravya-shah-248b381b5/',
  locale: 'en-US',
  analytics: {
    umamiWebsiteId: 'f5aafacd-c00a-47ea-9ff5-2fc558c241b2',
  },
  newsletter: {
    provider: 'revue',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'dark',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
}

export default siteMetadata
