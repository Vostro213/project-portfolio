import { useEffect, useRef, useState } from 'react'

const facts = [
  { k: 'Based in', v: 'Sidi Bel Abbès, Algeria' },
  { k: 'Focus', v: 'Desktop apps & full-stack systems' },
  { k: 'Languages', v: 'Arabic · English · French' },
  { k: 'Work style', v: 'Remote-friendly, open to relocation' },
  { k: 'Core stack', v: 'Tauri · React · TypeScript · Python · SQLite' },
]

const certs = [
  { icon: 'fab fa-html5', label: 'HTML & CSS Fundamentals' },
  { icon: 'fab fa-js', label: 'JavaScript Essentials' },
  { icon: 'fab fa-react', label: 'React Basics' },
  { icon: 'fab fa-python', label: 'Python & Desktop Development' },
  { icon: 'fas fa-shield-alt', label: 'Cybersecurity Principles' },
  { icon: 'fas fa-pencil-ruler', label: 'UI/UX Design Introduction' },
]

const strengths = [
  'Rules engines isolated from the UI and covered by tests',
  'Data layers that never import a view framework',
  'Arabic RTL interfaces, including PDF and printed output',
  'Desktop apps packaged and installed as real binaries',
  'CI that refuses to ship a broken build',
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
              I build complete applications rather than demos — <strong>native desktop programs that
              install on Windows, and web systems with a real database behind them</strong>. My
              recent work is a Tauri and React habit tracker with its own progression engine, and a
              Python point-of-sale system handling cash sales, credit ledgers, invoices and stock
              control for a shop.
            </p>
            <p>
              The part I care about most is the part most portfolios skip: whether the thing still
              works six months later. That means keeping business logic out of the view layer,
              testing it without a heavyweight framework, and writing down the decisions I made
              along the way. I hold a Degree in Computer Science from{' '}
              <a href="https://www.univ-sba.dz/en/home-new/" target="_blank" rel="noreferrer">
                Université Djillali Liabès
              </a>
              . I am open to <strong>remote work</strong> and to relocating for the right role.
            </p>
            <blockquote className="quote">
              &ldquo;Finish the job. Ship it, then keep it working.&rdquo;
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
                  key={c.label}
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
            <h3><i className="fas fa-handshake"></i> What I bring to a team</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', marginBottom: '12px' }}>
              Generalises to any client — reliability, stated plainly.
            </p>
            <ul>
              {strengths.map(s => (
                <li key={s}><i className="fas fa-check"></i>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
