import { useState } from 'react'
import Modal from './Modal'
import styles from '../styles/Form.module.css'
import { useForm } from 'react-hook-form'

const Form = () => {
  const { register, handleSubmit } = useForm()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data) => {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <>
      {submitted && <Modal setSubmitted={setSubmitted} />}
      <div className={styles.container}>
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formTop}>
            <div className={styles.containerHeader}>
              <label htmlFor="" className={styles.top}>
                Your name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className={styles.inputTop}
              />
            </div>
            <div className={styles.containerHeader}>
              <label htmlFor="" className={styles.top}>
                Your email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className={styles.inputTop}
              />
            </div>
          </div>
          <div className={styles.formBottom}>
            <label htmlFor="" className={styles.bottom}>
              Your message
            </label>
            <textarea
              {...register('message', { required: true, maxLength: 200 })}
              className={styles.inputBottom}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Form
