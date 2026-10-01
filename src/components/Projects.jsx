import { useEffect, useRef, useState } from 'react'

const cases = [
  {
    tag: 'Desktop Application',
    title: 'Solo Life',
    subtitle: 'Tauri 2 + React 19 — offline-first habit tracker with an RPG progression system',
    body:
      'A desktop habit tracker built around an XP, level and rank progression loop, shipped as a native Windows binary with real NSIS and MSI installers. All game rules live in pure TypeScript functions that never touch React, which makes the whole rules engine testable in plain Node in under a second.',
    highlights: [
      'Game engine isolated in 509 lines of pure functions — no React imports, so the rules are unit-testable in isolation',
      '76 automated test cases written on node:assert/strict with zero test-framework dependencies, running TypeScript directly in Node',
      'Rust side is 25 lines: the backend registers plugins only, keeping the security surface minimal',
      'Content Security Policy locked to self; nine font files self-hosted so the app needs no network at all',
      'Corrupted saves are quarantined to a separate key rather than deleted, and the previous good save survives a failed write',
    ],
    note:
      'SQLite was evaluated and deliberately rejected — the pure-function rules engine could then be tested in plain Node instead of through the desktop shell. That trade-off is documented in the project notes.',
    chips: ['Tauri 2.12', 'React 19', 'TypeScript', 'Zustand', 'Tailwind v4', 'Vite 8', 'Rust'],
    metrics: [
      { v: '4,557', l: 'lines of TS/TSX' },
      { v: '76', l: 'test cases' },
      { v: '25', l: 'lines of Rust' },
      { v: '0', l: 'network calls' },
    ],
    gallery: [],
  },
  {
    tag: 'Business Software',
    title: 'Retail POS System',
    subtitle: 'Python + SQLite — point-of-sale with credit ledgers, invoices and thermal printing',
    body:
      'A full point-of-sale and retail management application for the Algerian market, written right-to-left in Arabic. Covers the product catalogue, cash and credit sales, a debt collection ledger, stock control and profit reporting, packaged into a standalone Windows executable.',
    highlights: [
      '690-line data layer with 38 functions and zero UI imports — the database module never knows a widget exists',
      'Purchase cost is snapshotted onto each sale line, so historical profit reports stay correct after prices change',
      'Stock decrements use a guarded UPDATE with a row-count check, so a sale can never drive inventory negative',
      'Arabic shaping for PDF output via arabic-reshaper and python-bidi — correct glyph order on generated invoices',
      'Thermal receipt printing through raw ESC/POS commands over ctypes and winspool.drv, with no printing library',
      'QR-verified A4 invoices and Code128 barcode label sheets generated with Pillow',
    ],
    note:
      'Two front-ends were built against the same data layer — a PySide6 build that ships as the executable, and a Flet build used for development. Report and export features are exercised through the Flet build.',
    chips: ['Python 3.14', 'PySide6', 'Flet', 'SQLite', 'PyInstaller', 'Pillow', 'openpyxl'],
    metrics: [
      { v: '5,124', l: 'lines of Python' },
      { v: '38', l: 'DB functions' },
      { v: '5', l: 'related tables' },
      { v: '59 MB', l: 'single-file build' },
    ],
    gallery: [],
  },
  {
    tag: 'Web Application',
    title: 'University Course Platform',
    subtitle: 'PHP + MySQL — course catalogue with authentication and email confirmation',
    body:
      'A university study platform where a static set of pages was replaced with a dynamic course platform backed by real data persistence, including a full sign-up flow and a user-facing profile system.',
    highlights: [
      'Sign-up flow with PHPMailer email confirmation',
      'User profiles with image upload, login and logout',
      'Course search bar with dynamic feature filtering',
      'Clean separation between UI logic and the PHP data layer',
    ],
    note:
      'Shipped incrementally against a local LAMP-style stack, then deployed through a GitHub Actions pipeline — the same pipeline that publishes this portfolio.',
    chips: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'CI/CD'],
    metrics: [
      { v: '4', l: 'core features' },
      { v: '1', l: 'email flow' },
      { v: '1', l: 'pipeline' },
      { v: 'Live', l: 'deployed' },
    ],
    gallery: [
      { img: 'cours1.png', caption: 'Course platform — features list and search' },
      { img: 'cours2.png', caption: 'Sign-up with PHPMailer email confirmation' },
      { img: 'cours3.png', caption: 'User profile, uploads and login/logout' },
    ],
  },
]

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <div className={`fade-enter ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function MetricGrid({ metrics }) {
  return (
    <div className="metrics">
      {metrics.map(m => (
        <div className="metric" key={m.l}>
          <span className="metric-value">{m.v}</span>
          <span className="metric-label">{m.l}</span>
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [revealed, setRevealed] = useState({})
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cases.forEach((_, i) => {
            setTimeout(() => {
              setRevealed(prev => ({ ...prev, [i]: true }))
            }, i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">05</span>
          <h2 className="section-title">Selected Work</h2>
          <span className="section-jp">実績</span>
        </div>

        {cases.map((c, i) => (
          <article
            className={`case-block ${revealed[i] ? 'visible' : ''}`}
            key={c.title}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <header className="case-head">
              <div>
                <span className="case-tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p className="case-subtitle">{c.subtitle}</p>
              </div>
              <MetricGrid metrics={c.metrics} />
            </header>

            <p className="case-body">{c.body}</p>

            <div className="case-split">
              <div>
                <h4 className="case-label">What it does</h4>
                <ul className="case-list">
                  {c.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="case-aside">
                <h4 className="case-label">Engineering note</h4>
                <p className="case-note">{c.note}</p>
                <div className="stack-chips">
                  {c.chips.map(chip => (
                    <span className="chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>

            {c.gallery?.length > 0 && (
              <div className="gallery">
                {c.gallery.map(g => (
                  <figure className="visible" key={g.img}>
                    <img src={g.img} alt={g.caption} loading="lazy" />
                    <figcaption>{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </article>
        ))}

        <Reveal delay={120}>
          <p className="projects-footnote">
            Screenshots and installers are available on request. Source repositories are private
            pending cleanup of unused files and generated artifacts.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
