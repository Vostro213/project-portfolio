import { useState } from 'react'

const links = [
  { key: 'home', href: '#home', icon: 'fa-home', label: 'Home' },
  { key: 'about', href: '#about', icon: 'fa-user', label: 'About' },
  { key: 'timeline', href: '#timeline', icon: 'fa-route', label: 'Journey' },
  { key: 'skills', href: '#skills', icon: 'fa-code', label: 'Skills' },
  { key: 'approach', href: '#approach', icon: 'fa-compass', label: 'Approach' },
  { key: 'projects', href: '#projects', icon: 'fa-laptop-code', label: 'Work' },
  { key: 'contact', href: '#contact', icon: 'fa-envelope', label: 'Contact' },
]

export default function Navbar({ active, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          Saim Ishak<span>.</span>
        </div>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {links.map(l => (
            <li key={l.key}>
              <a
                href={l.href}
                className={active === l.key ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(l.key)
                  setMenuOpen(false)
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-icon" onClick={() => setMenuOpen(p => !p)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  )
}
