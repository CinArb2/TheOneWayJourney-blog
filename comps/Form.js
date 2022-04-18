import { useState } from 'react'
import Modal from './Modal'
import styles from '../styles/Form.module.css'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
     setFormData(prevFormData => {
        return {
            ...prevFormData,
            [e.target.name]: e.target.value
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.message !== '' && formData.email !== '' ) {
      
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((res) => {
        console.log('Response received')
        if (res.status === 200) {
          console.log('Response succeeded!')
            setSubmitted(true)
            setFormData({
              name: '',
              email: '',
              message: ''
            })
          }
        })
    }
    
  }
  
  return (
    <>
    {submitted && <Modal setSubmitted={setSubmitted}/>}
    <div className={styles.container}>
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <div className={styles.containerHeader}> 
            <label htmlFor="" className={styles.top}>
            Your name
            </label>
                <input
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.inputTop} />
            </div>
            <div className={styles.containerHeader}>
              <label htmlFor="" className={styles.top}>
              Your email
              </label>
                <input
                  type="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.inputTop} />
            </div>
          </div>
          <div className={styles.formBottom}>
            <label htmlFor="" className={styles.bottom}> 
            Your message
            </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                className={styles.inputBottom} />
          </div>
          <button>Submit</button>
          
        </form>
      </div>
    </>
  )
}

export default Form