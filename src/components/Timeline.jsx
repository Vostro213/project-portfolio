import { useEffect, useRef, useState } from 'react'

const items = [
  {
    year: '2020 - 2024',
    title: 'Degree in Computer Science',
    org: 'Université Djillali Liabès, Algeria',
    desc: 'Studied software engineering, algorithms, databases and web development.',
    icon: 'fas fa-graduation-cap',
  },
  {
    year: '2024',
    title: 'Full-Stack Web Development',
    org: 'Self-taught + University Projects',
    desc: 'Built the university course platform — PHP, MySQL, email confirmation flows and authentication.',
    icon: 'fas fa-code',
  },
  {
    year: '2025',
    title: 'Retail POS System',
    org: 'Python · SQLite · PySide6',
    desc: 'Built a full point-of-sale application: credit ledgers, stock control, QR invoices and thermal receipt printing, shipped as a Windows executable.',
    icon: 'fas fa-cash-register',
  },
  {
    year: '2025',
    title: 'Solo Life — Desktop App',
    org: 'Tauri 2 · React 19 · TypeScript',
    desc: 'Shipped an offline-first habit tracker with its own XP and rank progression engine, 76 automated tests and native Windows installers.',
    icon: 'fas fa-desktop',
  },
  {
    year: 'Now',
    title: 'Open to Full-Stack Roles in Japan',
    org: 'Tokyo, Japan',
    desc: 'Studying Japanese daily and looking to join a Japanese product team.',
    icon: 'fas fa-plane',
  },
]

export default function Timeline() {
  const [revealed, setRevealed] = useState({})
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, i) => {
            setTimeout(() => {
              setRevealed(prev => ({ ...prev, [i]: true }))
            }, i * 140)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="timeline-section" id="timeline" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Journey</h2>
          <span className="section-jp">経歴</span>
        </div>
        <div className="timeline">
          {items.map((item, i) => (
            <div
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} ${revealed[i] ? 'visible' : ''}`}
              key={item.title}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="timeline-dot">
                <i className={item.icon}></i>
              </div>
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <h4>{item.org}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
