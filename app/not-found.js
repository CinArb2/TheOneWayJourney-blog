import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>
        It looks like nothing was found at this location.{' '}
        <Link href="/">Return to Home Page</Link>
      </p>
    </div>
  )
}
