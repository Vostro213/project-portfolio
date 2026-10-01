import { useEffect, useRef, useState } from 'react'

const columns = [
  {
    title: 'Frontend',
    icon: 'fas fa-palette',
    items: [
      'React 19 — hooks, state, effects',
      'TypeScript 6 — typed domain models',
      'JavaScript ES6+',
      'Zustand — state orchestration',
      'Tailwind CSS v4 & hand-written CSS',
      'Hand-rolled SVG charts, zero chart libs',
      'RTL / Arabic UI, CSS logical properties',
      'Responsive from 320px up',
    ],
  },
  {
    title: 'Backend & Desktop',
    icon: 'fas fa-server',
    items: [
      'Python 3.14 — PySide6 & Flet front-ends',
      'Tauri 2.12 — native desktop shell',
      'Rust — plugin registration, CSP',
      'SQLite — schema design & migrations',
      'PHP — procedural & OOP',
      'MySQL — relational modelling',
      'Atomic stock writes, guarded UPDATEs',
      'ctypes — raw ESC/POS device access',
    ],
  },
  {
    title: 'Engineering',
    icon: 'fas fa-shield-alt',
    items: [
      'Automated testing — 76 cases, no framework',
      'Fault injection in the test harness',
      'Pure-function rules engines',
      'Layered data access, UI-independent',
      'Git & GitHub',
      'GitHub Actions CI/CD on every push',
      'GitHub Pages deployment',
      'Content Security Policy hardening',
    ],
  },
  {
    title: 'Tooling & Domain',
    icon: 'fas fa-rocket',
    items: [
      'Vite 8 build tooling',
      'ESLint 10 — hooks & refresh rules',
      'PyInstaller — onefile & onedir builds',
      'Pillow, openpyxl, qrcode, python-barcode',
      'arabic-reshaper & python-bidi',
      'Linux & Windows internals',
      'Cybersecurity fundamentals, OWASP Top 10',
      'Japanese (日本語) — learning',
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    columns.forEach((_, i) => {
      setTimeout(() => {
        setRevealed(prev => ({ ...prev, [i]: true }))
      }, i * 120)
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
