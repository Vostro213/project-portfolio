import { useEffect, useRef, useState } from 'react'

const columns = [
  {
    title: 'Frontend',
    icon: 'fas fa-palette',
    items: [
      'HTML5',
      'CSS3 (flexbox, grid, animations)',
      'JavaScript (ES6+)',
      'React (hooks, state, effects)',
      'Responsive / UI-UX implementation',
    ],
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    items: [
      'PHP (procedural & OOP basics)',
      'MySQL — relational data design',
      'REST-style API endpoints',
      'Auth, sessions & image upload',
      'PHPMailer email confirmation',
    ],
  },
  {
    title: 'Delivery & Exploration',
    icon: 'fas fa-rocket',
    items: [
      'Git & GitHub',
      'GitHub Actions (CI/CD on this site)',
      'GitHub Pages deployment',
      'Linux basics',
      'Cybersecurity fundamentals',
    ],
  },
]

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const [revealed, setRevealed] = useState({})
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    columns.forEach((_, i) => {
      setTimeout(() => {
        setRevealed(prev => ({ ...prev, [i]: true }))
      }, i * 150)
    })
  }, [visible])

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2 className="section-title">Skills</h2>
          <span className="section-jp">技術スタック</span>
        </div>
        <div className="skill-cols">
          {columns.map((col, i) => (
            <div
              className={`skill-col skill-col-enter ${revealed[i] ? 'visible' : ''}`}
              key={col.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3><i className={col.icon}></i>{col.title}</h3>
              <ul>
                {col.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}