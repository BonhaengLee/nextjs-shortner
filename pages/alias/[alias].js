import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSingle } from '../../lib/shortener'

const AliasView = ({ error }) => {
  const router = useRouter()

  useEffect(() => {
    if (error) {
      return router.push('/')
    }
  }, [])

  return null
}

export async function getStaticPaths({ params }) {
  const url = await getSingle(params.alias)

  if (url.data && (url.data?.attributes?.results[0] || false) && !url.error) {
    return {
      paths: [{ params: { alias: url.data.attributes.results[0].alias } }],
      fallback: false,
    }
  }
}

export async function getStaticProps() {
  return {
    props: { error: 'error' },
  }
}

export default AliasView
