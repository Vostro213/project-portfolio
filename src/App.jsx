import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ChatBot from './components/ChatBot'

const slides = [
  '/slide1.jpg', '/slide2.jpg', '/slide3.jpg', '/slide4.jpg',
]

export default function App() {
  const [section, setSection] = useState('home')
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(navigator.onLine)
  const [slideIdx, setSlideIdx] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
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

  const sections = {
    home: Hero,
    about: About,
    timeline: Timeline,
    skills: Skills,
    projects: Projects,
    contact: Contact,
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
      <div className="header-stripe"></div>
      {slides.map((src, i) => (
        <div
          key={src}
          className={`bg-slide ${i === slideIdx ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      {!online && (
        <div className="offline-banner">
          <i className="fas fa-wifi-slash"></i> You are offline - some features may not work
        </div>
      )}
      <Navbar active={section} onNavigate={setSection} />
      <main className="main-content">
        <SectionComponent onNavigate={setSection} />
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </>
  )
}
