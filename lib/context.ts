import { createContext } from 'react'

const MyContext = createContext({
  user: null,
  isLoggedIn: false,
  setUser: (any) => {},
  setUrls: (any) => {},
  urls: [],
})

export default MyContext
