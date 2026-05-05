import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollVideo from './components/ScrollVideoSimple'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const progress = (scrollPosition / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ScrollVideo />
      
      <section id="experience" className="section">
        <div className="container">
          <h2>Experience</h2>
          <p>Scroll to see the hero animation progress: {Math.round(scrollProgress)}%</p>
          <div className="content">
            <p>Your professional experience will go here.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Projects</h2>
          <div className="content">
            <p>Your featured projects will be showcased here.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2>Contact</h2>
          <div className="content">
            <p>Get in touch with me through this section.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
