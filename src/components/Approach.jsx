import { useEffect, useRef, useState } from 'react'

const principles = [
  {
    icon: 'fas fa-vial-circle-check',
    title: 'Tests without a test framework',
    body:
      'The Solo Life rules engine is covered by 76 test cases written directly on node:assert/strict — no Jest, no Vitest. The runner executes TypeScript in Node through a custom resolver hook, so the full suite finishes in under a second and adds nothing to the shipped bundle.',
  },
  {
    icon: 'fas fa-bug',
    title: 'Fault injection over happy paths',
    body:
      'The persistence tests inject a storage driver that fails on demand, then assert that a write error surfaces in the UI and leaves the previous save intact. Recovery is a tested behaviour, not an assumption.',
  },
  {
    icon: 'fas fa-layer-group',
    title: 'Logic kept out of the UI',
    body:
      'The 690-line data module in the POS system imports no UI library at all, and the 509-line rules engine in Solo Life imports no React. Both are callable and verifiable without rendering a single pixel.',
  },
  {
    icon: 'fas fa-diagram-project',
    title: 'Decisions recorded, including rejections',
    body:
      'Project notes cover architecture choices that were considered and declined — why SQLite was not used in the desktop app, why cloud sync was rejected on privacy grounds — and they list known defects rather than hiding them.',
  },
  {
    icon: 'fas fa-lock',
    title: 'Least privilege by default',
    body:
      'The desktop app ships with a restrictive Content Security Policy, fonts served from the bundle instead of a CDN, and filesystem permissions scoped to three specific directories instead of a blanket grant.',
  },
  {
    icon: 'fas fa-arrows-rotate',
    title: 'Shipping is part of the feature',
    body:
      'Every push to this repository runs lint and a production build on GitHub Actions, then publishes to GitHub Pages. A broken build never reaches the live site.',
  },
]

export default function Approach() {
  const [visible, setVisible] = useState(false)
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
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="approach" id="approach" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">How I Build</h2>
          <span className="section-jp">開発方針</span>
        </div>

        <div className="approach-grid">
          {principles.map((p, i) => (
            <article
              className={`approach-card ${visible ? 'visible' : ''}`}
              key={p.title}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <i className={p.icon}></i>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
