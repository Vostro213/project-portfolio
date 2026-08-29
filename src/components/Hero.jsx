import { useEffect, useRef, useState } from 'react'

const words = ["Full Stack Developer", "I create modern web apps", "Learning Japanese (日本語)", "Open to Tokyo, Japan"]

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
    <section className="hero">
      <div className="hero-badge">開発者 ・ 東京</div>
      <img src="avatar.jpg" alt="Saim Ishak - Web Developer" className="hero-avatar" />
      <h1>Hi, my name is <span>Saim Ishak</span></h1>
      <div className="changing-text">
        <span>{display}</span>
        <span className="cursor" style={{ opacity: cursor ? 1 : 0 }}>|</span>
      </div>
      <div className="hero-buttons">
        <a
          href="#about"
          className="tag"
          onClick={(e) => {
            e.preventDefault()
            if (onNavigate) onNavigate('about')
          }}
        >
          Know more
        </a>
        <a
          href="#contact"
          className="tag tag-alt"
          onClick={(e) => {
            e.preventDefault()
            if (onNavigate) onNavigate('contact')
          }}
        >
          <i className="fas fa-paper-plane"></i> Contact me
        </a>
      </div>
    </section>
  )
}
