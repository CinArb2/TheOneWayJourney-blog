import styles from '../styles/Modal.module.css'

const Modal = ({ setSubmitted }) => {
  return (
    <>
      <div className={styles.modalBackdrop}></div>
      <div className={styles.modalContainer}>
        <h1>Thank you for getting in touch! </h1>
        <p>
          We appreciate you contacting us. One of our colleagues will get back
          in touch with you soon!Have a great day!
        </p>
        <img
          className={styles.imageModal}
          src="https://img.icons8.com/color/96/000000/checked--v1.png"
        />
        <button className={styles.closeBtn} onClick={() => setSubmitted(false)}>
          <img src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" />
        </button>
      </div>
    </>
  )
}

export default Modal
