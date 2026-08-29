import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(document.documentElement.scrollTop > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      id="scrollToTopBtn"
      onClick={scrollToTop}
      style={{ display: visible ? 'block' : 'none' }}
      title="Go to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}
