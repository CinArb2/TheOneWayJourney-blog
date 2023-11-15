'use client'
import styles from '@/styles/Form.module.css'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { sendEmail } from '@/app/actions/send-email'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useRef } from 'react'

const initialState = {
  name: '',
  email: '',
  message: '',
  success: '',
}

function SubmitButton() {
  // useFormStatus can only be used as a child of a form element
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      Sent
    </button>
  )
}

const Form = () => {
  const [state, formAction] = useFormState(sendEmail, initialState)
  const { toast } = useToast()
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success !== '') {
      toast({
        variant: state.success ? 'default' : 'destructive',
        title: state.success
          ? 'Form submitted successfully!'
          : 'Oops! Something went wrong',
        description: state.message,
      })
      ref.current?.reset()
    }
  }, [state, toast])

  return (
    <div className={styles.container}>
      <h1>Contact us</h1>
      <form action={formAction} ref={ref}>
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
      </form>
    </div>
  )
}

export default Form
