import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSingle } from '../lib/shortener'

const AliasView = ({ error }) => {
  const router = useRouter()
  useEffect(() => {
    if (error) {
      return router.push('/')
    }
  }, [])
  return null
}

export async function getServerSideProps({ params }) {
  const url = await getSingle(params.alias)
  if (url.data && (url.data?.attributes?.results[0] || false) && !url.error) {
    return {
      redirect: {
        destination: url.data.attributes.results[0].url,
        permanent: false,
      },
    }
  }
  return {
    props: { error: 'error' },
  }
}

export default AliasView

// As can be seen, we use the `getServerSideProps` to check if the alias exists in our record, if so we redirect to the actual URL.

export async function getServerSideProps({ params }) {
  const url = await getSingle(params.alias)
  if (url.data && (url.data?.attributes?.results[0] || false) && !url.error) {
    return {
      redirect: {
        destination: url.data.attributes.results[0].url,
        permanent: false,
      },
    }
  }
  return {
    props: { error: 'error' },
  }
}

// If we can’t find it, we pass the `error` prop to the actual component:

// return {
//   props: { error: 'error' },
// }

// Then in our component, we redirect the user to the home page since the alias isn't in our record.

const AliasView = ({ error }) => {
  const router = useRouter()
  useEffect(() => {
    if (error) {
      return router.push('/')
    }
  }, [])
  return null
}
