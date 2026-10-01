import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">06</span>
          <h2 className="section-title">Outside of Work</h2>
          <span className="section-jp">趣味</span>
        </div>
        <div className="craft" style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            className="craft-icon"
            style={{
              width: 52, height: 52, border: '1px solid var(--indigo)', flex: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--indigo)', fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600,
            }}
          >
            <i className="fas fa-shield-halved" style={{ fontSize: '1.3rem' }}></i>
          </div>
          <p style={{ margin: 0, color: 'var(--ink-soft)', maxWidth: 600 }}>
            When I'm not coding, I study cybersecurity fundamentals and ethical hacking — a habit
            that keeps my systems thinking sharp. I also design logic-puzzle concepts with a
            sci-fi aesthetic as a creative outlet, and I write up what I learn so the reasoning
            survives after the project ships.
          </p>
        </div>
      </div>

      <div className="contact-box" id="contact-box" style={{ marginTop: 48 }}>
        <div className="wrap" style={{ padding: 0 }}>
          <h2>Let's talk.</h2>
          <p>
            Open to full-stack and desktop engineering roles, remote or on-site. Happy to share more
            code, walk through the CI/CD setup, or talk specifics about a team's needs.
          </p>
          <div className="contact-links">
            <a href="mailto:ishaksaim0@gmail.com"><i className="fas fa-envelope"></i> Email</a>
            <a href="tel:+213554675388"><i className="fas fa-phone"></i> +213 5 54 67 53 88</a>
            <a href="https://github.com/Vostro213" target="_blank" rel="noreferrer"><i className="fab fa-github"></i> GitHub</a>
            <a href="https://www.linkedin.com/in/ishak-saim-245549369" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
          </div>

          <div className="form-panel">
            <h3>Sending a message</h3>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault()
                setStatus('sending')
                const form = e.target
                try {
                  const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                  })
                  if (res.ok) { setStatus('success'); form.reset() } else { setStatus('error') }
                } catch {
                  setStatus('error')
                }
              }}
              action="https://formspree.io/f/mvgqpayq"
              method="POST"
            >
              <input type="text" name="name" placeholder="Your Name" required pattern="^[\p{L}\s]+$" title="Please enter letters only (no numbers or symbols)" />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="form-feedback success">Message sent successfully!</p>}
              {status === 'error' && <p className="form-feedback error">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}