import { useEffect, useRef, useState } from 'react'

const skills = [
  { icon: 'fab fa-html5', name: 'HTML5', width: '90%', href: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5' },
  { icon: 'fab fa-css3-alt', name: 'CSS3', width: '85%', href: 'https://www.css3.info/' },
  { icon: 'fab fa-js-square', name: 'JavaScript', width: '75%', href: 'https://www.w3schools.com/js/' },
  { icon: 'fab fa-react', name: 'React', width: '65%', href: 'https://react.dev/' },
  { icon: 'fas fa-shield-alt', name: 'Cybersecurity', width: '60%', href: 'https://www.cisco.com/site/us/en/learn/topics/security/what-is-cybersecurity.html' },
  { icon: 'fab fa-php', name: 'PHP', width: '70%', href: 'https://www.php.net/' },
  { icon: 'fas fa-database', name: 'MySQL', width: '68%', href: 'https://www.mysql.com/' },
  { icon: 'fab fa-git-alt', name: 'Git', width: '55%', href: 'https://git-scm.com/' },
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
    skills.forEach((_, i) => {
      setTimeout(() => {
        setRevealed(prev => ({ ...prev, [i]: true }))
      }, i * 150)
    })
  }, [visible])

  return (
    <section className="skills" id="skills" ref={ref}>
      <h2 className="section-title">My Skills</h2>
      <div className="skills-container">
        {skills.map((s, i) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={`skill-link ${revealed[i] ? 'visible' : ''}`}
            title={`Learn more about ${s.name}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="skill-card">
              <i className={s.icon}></i>
              <h3>{s.name}</h3>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: revealed[i] ? s.width : '0%',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {revealed[i] ? s.width : ''}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
