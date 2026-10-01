import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Approach from './components/Approach'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ChatBot from './components/ChatBot'

const SECTION_ORDER = ['home', 'about', 'timeline', 'skills', 'approach', 'projects', 'contact']

function sectionFromHash() {
  const hash = window.location.hash.replace('#', '')
  return SECTION_ORDER.includes(hash) ? hash : 'home'
}

export default function App() {
  const [section, setSection] = useState(sectionFromHash)
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => setSection(sectionFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const sections = {
    home: Hero,
    about: About,
    timeline: Timeline,
    skills: Skills,
    approach: Approach,
    projects: Projects,
    contact: Contact,
  }

  const navigate = (key) => {
    setSection(key)
    if (window.location.hash !== `#${key}`) {
      window.history.replaceState(null, '', `#${key}`)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const SectionComponent = sections[section]

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-ring"></div>
      </div>
    )
  }

  return (
    <>
      <div className="grid-texture"></div>
      {!online && (
        <div className="offline-banner">
          <i className="fas fa-wifi-slash"></i> You are offline - some features may not work
        </div>
      )}
      <Navbar active={section} onNavigate={navigate} />
      <main className="main-content" key={section}>
        <SectionComponent onNavigate={navigate} />
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </>
  )
}
