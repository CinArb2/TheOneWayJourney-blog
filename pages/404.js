import Link from 'next/link'
import { useEffect } from 'react'
import {useRouter, userouter} from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [])

  return (
    <div>
    <h1>Ooops...</h1>
    <p>Go back</p>
    <Link href="/"><a>Home</a></Link>
    </div>
  )
}

export default NotFound