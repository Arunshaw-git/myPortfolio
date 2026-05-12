import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StackingSections.css'

gsap.registerPlugin(ScrollTrigger)

const StackingSections = () => {
  const sectionsRef = useRef([])

  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean)

    sections.forEach((section, i) => {
      // Don't pin the last section
      if (i === sections.length - 1) return

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      })

      // Animate content when section enters
      gsap.from(section.querySelectorAll(".content"), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="stacking-container">
      <section className="section" ref={el => sectionsRef.current[0] = el}>
        <div className="container">
          <h2>Section 1</h2>
          <div className="content">
            <p>This is the first section with pinned stacking animation.</p>
          </div>
        </div>
      </section>

      <section className="section" ref={el => sectionsRef.current[1] = el}>
        <div className="container">
          <h2>Section 2</h2>
          <div className="content">
            <p>This section will stack on top of the first one.</p>
          </div>
        </div>
      </section>

      <section className="section" ref={el => sectionsRef.current[2] = el}>
        <div className="container">
          <h2>Section 3</h2>
          <div className="content">
            <p>This section will stack on top of the second one.</p>
          </div>
        </div>
      </section>

      <section className="section" ref={el => sectionsRef.current[3] = el}>
        <div className="container">
          <h2>Section 4</h2>
          <div className="content">
            <p>This section will stack on top of the third one.</p>
          </div>
        </div>
      </section>

      <section className="section" ref={el => sectionsRef.current[4] = el}>
        <div className="container">
          <h2>Section 5 (Final)</h2>
          <div className="content">
            <p>This is the final section - it won't be pinned.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StackingSections
