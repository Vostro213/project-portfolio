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
    title: 'Full Stack Web Development',
    org: 'Self-taught + University Projects',
    desc: 'Built real-world projects with HTML, CSS, JavaScript, React, PHP and MySQL.',
    icon: 'fas fa-code',
  },
  {
    year: '2025',
    title: 'Cybersecurity Fundamentals',
    org: 'Personal Learning Journey',
    desc: 'Learning networking, Linux, OWASP Top 10 and ethical hacking basics in parallel.',
    icon: 'fas fa-shield-alt',
  },
  {
    year: 'Now',
    title: 'Open to Internship in Japan',
    org: 'Tokyo, Japan',
    desc: 'Currently learning Japanese and eager to join a Japanese tech team.',
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
            }, i * 200)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
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
              style={{ transitionDelay: `${i * 0.1}s` }}
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