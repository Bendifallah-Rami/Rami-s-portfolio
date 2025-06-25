"use client"

import { useState, useRef, useEffect } from "react"

const ContactFooter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <footer ref={sectionRef} className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24 dark:bg-black" id="contact">
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fogFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes fogFloat2 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
          }
          33% {
            transform: translate(-50%, -50%) scale(1.2) rotate(120deg);
          }
          66% {
            transform: translate(-50%, -50%) scale(0.9) rotate(240deg);
          }
        }

        @keyframes fogFloat3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
          }
        }

        .contact-title {
          animation: ${isVisible ? "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
          opacity: ${isVisible ? 1 : 0};
        }

        .contact-button {
          animation: ${isVisible ? "fadeInScale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both" : "none"};
          opacity: ${isVisible ? 1 : 0};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Light mode fog effects (white fog) */
        .fog-layer-1 {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.2s ease-out;
          opacity: ${isHovering ? 1 : 0};
          filter: blur(15px);
          animation: ${isHovering ? "fogFloat 3s ease-in-out infinite" : "none"};
        }

        .fog-layer-2 {
          position: absolute;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-out;
          opacity: ${isHovering ? 1 : 0};
          filter: blur(20px);
          animation: ${isHovering ? "fogFloat2 4s ease-in-out infinite" : "none"};
        }

        .fog-layer-3 {
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.2) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease-out;
          opacity: ${isHovering ? 1 : 0};
          filter: blur(10px);
          animation: ${isHovering ? "fogFloat3 2.5s ease-in-out infinite" : "none"};
        }

        .fog-layer-4 {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.05) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease-out;
          opacity: ${isHovering ? 1 : 0};
          filter: blur(25px);
          animation: ${isHovering ? "fogFloat 5s ease-in-out infinite reverse" : "none"};
        }

        /* Dark mode fog effects (dark fog) */
        .dark .fog-layer-1 {
          background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.1) 60%, transparent 100%);
        }

        .dark .fog-layer-2 {
          background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.08) 50%, transparent 100%);
        }

        .dark .fog-layer-3 {
          background: radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.2) 40%, transparent 100%);
        }

        .dark .fog-layer-4 {
          background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.05) 40%, transparent 100%);
        }

        .footer-left {
          animation: ${isVisible ? "slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both" : "none"};
          opacity: ${isVisible ? 1 : 0};
        }

        .footer-right {
          animation: ${isVisible ? "slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s both" : "none"};
          opacity: ${isVisible ? 1 : 0};
        }

        .social-link {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .social-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #374151;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .social-link:hover::after {
          width: 100%;
        }

        .social-link:hover {
          transform: translateY(-1px);
          color: #111827;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Main Contact Section */}
        <div className="text-center mb-20">
          <h1 className="contact-title font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 dark:text-white">
            Let's talk!
          </h1>

          <a
            ref={buttonRef}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nr_bendifallah@esi.dz&su=Hello%20from%20your%20website&body=Hi%20there,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0D%0A%0D%0ABest%20regards"
            className="contact-button inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium text-lg dark:bg-white dark:text-black"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Multiple Fog Layers for Realistic Effect */}
            <div
              className="fog-layer-4"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            />
            <div
              className="fog-layer-2"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            />
            <div
              className="fog-layer-1"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            />
            <div
              className="fog-layer-3"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            />

            <span className="relative z-10">nr_bendifallah@esi.dz</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:text-white">
          <div className="footer-left mb-4 md:mb-0">
            <p className="text-gray-600 text-sm dark:text-white">
              2025 © — Made by <span className="font-medium">Rami Bendifallah 1CS</span>
            </p>
          </div>

          <div className="footer-right">
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/Bendifallah-Rami"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link text-gray-700 text-sm font-medium hover:text-gray-900  dark:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/rami.b15/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link text-gray-700 text-sm font-medium hover:text-gray-900  dark:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/bendifallah-rami-145a432b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link text-gray-700 text-sm font-medium hover:text-gray-900  dark:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ContactFooter