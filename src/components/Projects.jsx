import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    img: 'cours1.png',
    title: 'University Study Website',
    desc: 'Full-Stack Project built with <strong>PHP, MySQL, HTML, CSS, and JavaScript.</strong>',
    link: '#',
  },
  {
    img: 'cours2.png',
    title: 'University Study Website',
    desc: 'Sign up page using <strong>HTML CSS</strong> and <strong>JavaScript</strong> with <strong>PHP</strong> backend and <strong>PHPmailer</strong> for email confirmation.',
    link: '#',
  },
  {
    img: 'cours3.png',
    title: 'University Study Website',
    desc: 'User Profile with image upload, login/logout system, courses section, and search bar.',
    link: '#',
  },
]

export default function Projects() {
  const [revealed, setRevealed] = useState({})
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          projects.forEach((_, i) => {
            setTimeout(() => {
              setRevealed(prev => ({ ...prev, [i]: true }))
            }, i * 200)
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
    <section className="projects" id="projects" ref={ref}>
      <h2 className="section-title">My Projects</h2>
      <div className="projects-container">
        {projects.map((p, i) => (
          <div
            className={`project-card ${revealed[i] ? 'visible' : ''}`}
            key={i}
            style={{
              opacity: revealed[i] ? 1 : 0,
              transform: revealed[i] ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <a href={p.link} target="_blank" rel="noreferrer">
              <img src={p.img} alt={p.title} loading="lazy" />
            </a>
            <div className="project-info">
              <h3>{p.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: p.desc }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
