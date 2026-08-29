import { useEffect, useRef, useState } from 'react'

const certs = [
  { icon: 'fab fa-html5', label: 'HTML & CSS Fundamentals' },
  { icon: 'fab fa-js', label: 'JavaScript Essentials' },
  { icon: 'fab fa-react', label: 'React Basics' },
  { icon: 'fas fa-shield-alt', label: 'Cybersecurity Principles' },
  { icon: 'fas fa-pencil-ruler', label: 'UI/UX Design Introduction' },
]

const facts = [
  { k: 'Based in', v: 'Sidi Bel Abbès, Algeria' },
  { k: 'Target', v: 'Full-stack roles, Japan' },
  { k: 'Languages', v: 'Arabic · English · Japanese' },
  { k: 'Visa status', v: 'Seeking internship / sponsorship' },
  { k: 'Core stack', v: 'HTML · CSS · JS · React · PHP · MySQL' },
]

export default function About() {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about">
      <div className="wrap" ref={ref}>
        <div className="section-head">
          <span className="section-num">01</span>
          <h2 className="section-title">About</h2>
          <span className="section-jp">自己紹介</span>
        </div>

        <div className="about-grid">
          <div>
            <p>
              I'm a full-stack developer working across <strong>HTML, CSS, JavaScript, React,
              PHP, and MySQL</strong> — building responsive web applications for real users, not
              just demos. My recent work centers on a university study platform where I designed
              and shipped dynamic features end to end: sign-up flows with email confirmation,
              user profiles with image upload, authentication, and course search.
            </p>
            <p>
              I'm methodical about handoffs: merging cleanly into existing codebases, documenting
              decisions, and treating deployment as part of the product. I hold a Degree in
              Computer Science from{' '}
              <a href="https://www.univ-sba.dz/en/home-new/" target="_blank" rel="noreferrer">
                Université Djillali Liabès
              </a>.
              I'm currently learning <strong>Japanese (日本語)</strong> and am focused on
              relocating to <strong>Tokyo, Japan</strong> — the city inspires my portfolio theme
              as much as my career goal.
            </p>
            <blockquote className="quote">
              &ldquo;Turning ideas into reality through code. よろしくお願いします！&rdquo;
            </blockquote>
          </div>
          <ul className="facts">
            {facts.map(f => (
              <li key={f.k}>
                <span>{f.k}</span>
                <span>{f.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-extras">
          <div className="extra-card certificates">
            <h3><i className="fas fa-certificate"></i> Certificates</h3>
            <ul>
              {certs.map((c, i) => (
                <li
                  key={i}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.6s var(--ease-smooth) ${i * 0.08}s, transform 0.6s var(--ease-smooth) ${i * 0.08}s`,
                  }}
                >
                  <i className={c.icon}></i>
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="extra-card">
            <h3><i className="fas fa-handshake"></i> Working strengths</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', marginBottom: '12px' }}>
              What I bring to a team client — especially one in Japan — is reliability.
            </p>
            <ul>
              <li><i className="fas fa-check"></i> Clean, maintainable React & PHP code</li>
              <li><i className="fas fa-check"></i> Detail-oriented UI implementation</li>
              <li><i className="fas fa-check"></i> Honest documentation of decisions</li>
              <li><i className="fas fa-check"></i> Fast learner, open feedback</li>
              <li><i className="fas fa-check"></i> Familiar with Agile workflows</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}