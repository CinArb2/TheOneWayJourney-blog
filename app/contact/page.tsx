'use client'
import styles from '@/styles/Form.module.css'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { sendEmail } from '@/shared/actions/action'

const initialState = {
  name: '',
  email: '',
  message: '',
}

function SubmitButton() {
  // useFormStatus can only be used as a child of a form element
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Pending...' : 'Sent'}
    </button>
  )
}

const Form = () => {
  const [state, formAction] = useFormState(sendEmail, initialState)

  return (
    <div className={styles.container}>
      <h1>Contact us</h1>
      <form action={formAction}>
        <div className={styles.formTop}>
          <div className={styles.containerHeader}>
            <label htmlFor="" className={styles.top}>
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className={styles.inputTop}
            />
          </div>
          <div className={styles.containerHeader}>
            <label htmlFor="" className={styles.top}>
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className={styles.inputTop}
            />
          </div>
        </div>
        <div className={styles.formBottom}>
          <label htmlFor="" className={styles.bottom}>
            Your message
          </label>
          <textarea
            name="message"
            id="message"
            required
            className={styles.inputBottom}
          />
        </div>
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </div>
  )
}

export default Form
