import { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import MyContext from '../lib/context'
import Cookie from 'js-cookie'
import 'tailwindcss/tailwind.css'

export default function _App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null)
  const [urls, setUrls] = useState([])

  useEffect(() => {
    const jwt = Cookie.get('jwt')

    if (jwt) {
      ;(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )

        const data = await response.json()
        if (data.error) {
          Cookie.remove('jwt')
          setUser(null)
        } else {
          setUser(data)
        }
      })()
    }
  }, [])

  return (
    <MyContext.Provider
      value={{
        user: user,
        isLoggedIn: !!user,
        setUser,
        setUrls,
        urls,
      }}
    >
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}
