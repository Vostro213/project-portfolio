import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-container">
        <div className="contact-info">
          <p><i className="fas fa-envelope"></i> ishaksaim0@gmail.com</p>
          <p><i className="fas fa-phone"></i> +213 5 54 67 53 88</p>
          <p><i className="fas fa-map-marker-alt"></i> Sidi Bel Abbès, Algeria</p>
          <div className="social-icons">
            <a href="https://github.com/Vostro213" target="_blank" rel="noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/ishak-saim-245549369" target="_blank" rel="noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:ishaksaim0@gmail.com" title="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} action="https://formspree.io/f/mvgqpayq" method="POST">
          <input type="text" name="name" placeholder="Your Name" required pattern="^[\p{L}\s]+$" title="Please enter letters only (no numbers or symbols)" />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="form-feedback success">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="form-feedback error">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}
