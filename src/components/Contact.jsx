import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        x: -50,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      gsap.from('.contact-right', {
        x: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Construct WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:* ${encodeURIComponent(message)}`;
    
    // WhatsApp URL (using the phone number from the component)
    const whatsappUrl = `https://wa.me/917003664850?text=${whatsappMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    e.target.reset();
  };

  return (
    <section className="panel" id="contact" ref={sectionRef}>
      <div className="panel-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <h2 className="contact-heading">
                LET'S<br />
                BUILD<br />
                <span className="accent">TOGETHER.</span>
              </h2>
              <p className="contact-subtitle">Ready to bring your ideas to life? Let's collaborate and create something amazing.</p>
              
              <div className="contact-links">
                <div className="contact-link">
                  <div className="contact-icon">📧</div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">arunshaw08@gmail.com</div>
                  </div>
                </div>
                
                <div className="contact-link">
                  <div className="contact-icon">📱</div>
                  <div className="contact-info">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+91 7003664850</div>
                  </div>
                </div>
                
                <div className="contact-link">
                  <div className="contact-icon">🐙</div>
                  <div className="contact-info">
                    <div className="contact-label">GitHub</div>
                    <div className="contact-value">github.com/Arunshaw-git</div>
                  </div>
                </div>

                <div className="contact-link">
                  <div className="contact-icon">📍</div>
                  <div className="contact-info">
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Beliaghata, Kolkata, WB</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-right">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  style={isSubmitted ? { background: '#4ade80' } : {}}
                >
                  {isSubmitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
