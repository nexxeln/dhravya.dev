import React, { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({
  title = 'Subscribe to the newsletter',
  description,
}: {
  title: string
  description?: string
}) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error: resError } = await res.json()
    if (resError) {
      setError(true)
      setMessage(
        'Your e-mail address is invalid or you are already subscribed!',
      )
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div className='rounded-lg w-full flex flex-col md:flex-row items-center justify-between bg-slate-800 p-3 md:p-5 py-10 mx-5 md:mx-10'>
      <div>
        <h3 className='pb-1 text-xl md:text-3xl font-mukta font-semibold text-gray-100'>
          {title}
        </h3>
        <div className='pb-1 text-gray-200 text-sm max-w-fit'>
          {description}
        </div>
      </div>

      <form onSubmit={subscribe}>
        <div className='flex flex-col sm:flex-row'>
          <div>
            <label className='sr-only' htmlFor='email-input'>
              Email address
            </label>
            <input
              autoComplete='email'
              className='w-52 md:w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black'
              id='email-input'
              name='email'
              placeholder={
                subscribed ? "You're subscribed !  🎉" : 'Enter your email'
              }
              ref={inputEl}
              required
              type='email'
              disabled={subscribed}
            />
          </div>
          <div className='mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3'>
            <button
              className={`w-52 md:w-72 rounded-md bg-purple-600 py-2 px-4 font-medium text-white sm:py-0 ${
                subscribed
                  ? 'cursor-default'
                  : 'hover:bg-primary-700 dark:hover:bg-primary-400'
              } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
              type='submit'
              disabled={subscribed}
            >
              {subscribed ? 'Thank you!' : 'Sign up'}
            </button>
          </div>
        </div>

        <div className='mt-2 text-slate-500 text-xs'>
          I'll never spam you and you can unsubscribe any time.
        </div>
      </form>
      {error && (
        <div className='w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96'>
          {message}
        </div>
      )}
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className='flex items-center justify-center'>
    <div className='bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8'>
      <NewsletterForm title={title} />
    </div>
  </div>
)
