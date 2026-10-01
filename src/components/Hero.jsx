import { useEffect, useState } from 'react'

const words = [
  'Tauri 2 · React 19 · TypeScript',
  'Python · SQLite · PySide6',
  'Desktop apps that ship as real binaries',
  'Systems with a real database',
  'Clean architecture, covered by tests',
  'Available for new opportunities',
]

const stats = [
  { v: '~9,700', l: 'lines across 3 projects' },
  { v: '76', l: 'automated test cases' },
  { v: '3', l: 'shipped applications' },
  { v: 'CI', l: 'builds on every push' },
]

export default function Hero({ onNavigate }) {
  const [display, setDisplay] = useState('')
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeout

    function tick() {
      const current = words[wordIndex]
      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1)
      } else {
        charIndex = Math.min(current.length, charIndex + 1)
      }
      setDisplay(current.substring(0, charIndex))

      if (charIndex === current.length) {
        timeout = setTimeout(() => { isDeleting = true; tick() }, 2000)
      } else if (charIndex === 0 && isDeleting) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        timeout = setTimeout(tick, 500)
      } else {
        const speed = isDeleting ? 40 : 80 + Math.random() * 30
        timeout = setTimeout(tick, speed)
      }
    }

    tick()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Full-Stack Developer · Desktop & Web Systems</div>
          <h1>
            I ship applications
            <br />
            that are actually <span className="accent">finished.</span>
          </h1>
          <div className="changing-text">
            <span>{display}</span>
            <span className="cursor" style={{ opacity: cursor ? 1 : 0 }}>|</span>
          </div>
          <p className="hero-lede">
            From native desktop binaries to web systems backed by a real database — I take a project
            from the first line of code all the way to something that runs, installs and keeps
            working.
          </p>
          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('projects') }}
            >
              See the work
            </a>
            <a
              href="#approach"
              className="btn btn-ghost"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('approach') }}
            >
              How I build
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Ishak-Cv-Professional.pdf`}
              download
              className="btn btn-ghost"
            >
              <i className="fas fa-download"></i> CV
            </a>
          </div>
        </div>
        <div className="tategaki">コードから実運用まで</div>
      </div>

      <div className="wrap">
        <div className="hero-stats">
          {stats.map(s => (
            <div className="hero-stat" key={s.l}>
              <span className="hero-stat-value">{s.v}</span>
              <span className="hero-stat-label">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
