import { useEffect, useRef, useState } from 'react'

const gallery = [
  { img: 'cours1.png', caption: 'Course platform — features list & search' },
  { img: 'cours2.png', caption: 'Sign-up with PHPMailer email confirmation' },
  { img: 'cours3.png', caption: 'User profile, uploads & login/logout system' },
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
          gallery.forEach((_, i) => {
            setTimeout(() => {
              setRevealed(prev => ({ ...prev, [i]: true }))
            }, i * 180)
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
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Featured Work</h2>
          <span className="section-jp">実績</span>
        </div>

        <div className="case">
          <div>
            <span className="case-tag">University Platform</span>
            <h3>University Study Website — Course Platform</h3>
            <p>
              A full-stack project built for a university study context: a static set of pages
              replaced with a dynamic course platform with real data persistence.
            </p>
            <ul className="case-list">
              <li>Designed and built home, courses and profile sections from scratch</li>
              <li>Sign-up flow with PHPMailer email confirmation</li>
              <li>User profiles with image upload and login/logout system</li>
              <li>Course search bar and dynamic feature filtering</li>
              <li>Clean separation of UI logic and PHP data layer</li>
            </ul>
          </div>
          <div>
            <p><strong>My role</strong></p>
            <p>Full-stack implementation — from UI to data layer to deployment.</p>
            <p><strong>Approach</strong></p>
            <p>
              Shipped incrementally, tested in a local LAMP-style environment, then deployed to
              GitHub Pages with a GitHub Actions pipeline — so the site ships the same way every
              time. This very portfolio is the current example of that discipline.
            </p>
            <div className="stack-chips">
              <span className="chip">PHP</span>
              <span className="chip">MySQL</span>
              <span className="chip">HTML</span>
              <span className="chip">CSS</span>
              <span className="chip">JavaScript</span>
              <span className="chip">CI/CD</span>
            </div>
          </div>
        </div>

        <div className="gallery">
          {gallery.map((g, i) => (
            <figure key={i} className={revealed[i] ? 'visible' : ''}>
              <img src={g.img} alt={g.caption} loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}