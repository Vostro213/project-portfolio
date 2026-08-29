import { useEffect, useRef, useState } from 'react'

const certs = [
  { icon: 'fab fa-html5', label: 'HTML & CSS Fundamentals' },
  { icon: 'fab fa-js', label: 'JavaScript Essentials' },
  { icon: 'fab fa-react', label: 'React Basics' },
  { icon: 'fas fa-shield-alt', label: 'Cybersecurity Principles' },
  { icon: 'fas fa-pencil-ruler', label: 'UI/UX Design Introduction' },
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
      <div className="container" ref={ref}>
        <h2 className="section-title">About me</h2>

        <div className="about-grid">
          <div>
            <p className="about-text">
              I'm a passionate Full Stack Developer with a Degree in Computer Science from{' '}
              <a href="https://www.univ-sba.dz/en/home-new/" target="_blank" rel="noreferrer">
                Université Djillali Liabès
              </a>.
              I Specialize in Building responsive and interactive web applications using modern technologies like{' '}
              <strong>HTML, CSS, JavaScript, React, PHP and MySQL</strong>. I am currently learning{' '}
              <strong>Japanese (日本語)</strong> and open to an <strong>internship in Tokyo, Japan</strong>.
            </p>

            <div className="info-box">
              <p><i className="fas fa-calendar"></i> Age: 21</p>
              <p><i className="fas fa-map-marker-alt"></i> Location: Algeria</p>
              <p><i className="fas fa-language"></i> Languages: Arabic, English, Japanese</p>
            </div>

            <div className="about-actions">
              <a href="/Ishak-Cv-Professional.pdf" download className="tag-btn">
                <i className="fas fa-download"></i> Download CV
              </a>
            </div>

            <blockquote className="quote">
              &ldquo;Turning ideas into reality through code. よろしくお願いします！&rdquo;
            </blockquote>
          </div>

          <div className="about-image">
            <img src="/about-img.jpg" alt="About" loading="lazy" />
          </div>

          <div className="certificates">
            <h3><i className="fas fa-certificate"></i> Certificates</h3>
            <ul>
              {certs.map((c, i) => (
                <li
                  key={i}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                  }}
                >
                  <i className={c.icon}></i>
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
