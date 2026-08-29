import { useEffect, useRef, useState } from 'react'

const words = [
  'React · PHP · MySQL',
  'Clean, reliable web applications',
  '日本語を勉強しています',
  'Building for a team in Tokyo',
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
          <div className="eyebrow">Full-Stack Developer · Open to relocation — Japan</div>
          <h1>
            Building clean, reliable
            <br />
            web products <span className="accent">end&nbsp;to&nbsp;end.</span>
          </h1>
          <div className="changing-text">
            <span>{display}</span>
            <span className="cursor" style={{ opacity: cursor ? 1 : 0 }}>|</span>
          </div>
          <p className="hero-jp">日本での就業機会を探しているフルスタック開発者です。丁寧で正確な仕事を心がけています。</p>
          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('projects') }}
            >
              See featured work
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('contact') }}
            >
              Get in touch
            </a>
            <a
              href="Ishak-Cv-Professional.pdf"
              download
              className="btn btn-ghost"
            >
              <i className="fas fa-download"></i> CV
            </a>
          </div>
        </div>
        <div className="tategaki">開発者・東京へ</div>
      </div>
    </header>
  )
}