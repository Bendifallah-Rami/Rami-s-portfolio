"use client"
import { useState, useRef, useEffect } from "react"

const ExperienceSection = () => {
  const [activeCard, setActiveCard] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [introOffset, setIntroOffset] = useState(0)
  const [outroOffset, setOutroOffset] = useState(0)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  const experiences = [
    {
      id: 1,
      year: "2023",
      title: "Started Programming Journey",
      description: "Began learning web development fundamentals including HTML, CSS, and JavaScript. Built my first static websites and discovered my passion for creating digital experiences.",
      position: "left",
    },
    {
      id: 2,
      year: "2024",
      title: "start learning backend",
      description: "Took my first step into backend development using Node.js and Express. Explored server-side logic, routing, and connecting to databases while building functional APIs to support frontend integration, my first experiance was with blog web app.",
      position: "right",
    },
    {
      id: 3,
      year: "2024",
      title: "build my first web app",
      description: "Built my first web app—a quote-sharing platform—using HTML, CSS, Express, and MongoDB. Gained hands-on experience in backend routing, database integration, and creating a fully functional, smooth-running full-stack project.",
      position: "left",
    },
    {
      id: 4,
      year: "2024",
      title: "Advanced Technologies",
      description: "Expanded skills by learning React and Next.js, diving into UI/UX, and advancing in backend development. Explored authentication, RESTful APIs, and scalable backend architecture—all through hands-on work with the CSE Club.",
      position: "right",
    },
    {
      id: 5,
      year: "2025",
      title: "Mentorship & Technical Training",
      description: "Took part in mentorship and training with the CSE Club—mentored over 60 participants across 3 events and led 2 technical courses on backend and frontend development, sharing knowledge and guiding aspiring developers.",
      position: "left",
    },
    {
      id: 6,
      year: "2025",
      title: "Professional Development",
      description: "Built ESI Flow, a full-stack platform to manage internal workflows at ESI. Gained deep experience across frontend, backend, authentication, and deployment while working with real-world requirements and technologies.",
      position: "right",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight
      const sectionTop = rect.top

      const visibleTop = Math.max(0, -sectionTop)
      const visibleBottom = Math.min(sectionHeight, windowHeight - sectionTop)
      const visibleHeight = visibleBottom - visibleTop

      if (visibleHeight > 0) {
        const progress = Math.min(1, Math.max(0, visibleTop / (sectionHeight - windowHeight)))
        setScrollProgress(progress)

        const totalCards = experiences.length
        const cardIndex = Math.floor(progress * totalCards)
        setActiveCard(Math.min(cardIndex, totalCards - 1))
      }

      // Calculate intro animation offset - triggers earlier
      const introTrigger = sectionTop + 100
      const introProgress = Math.max(0, Math.min(1, (windowHeight - introTrigger) / (windowHeight * 0.3)))
      setIntroOffset((1 - introProgress) * 50) // Reduced movement

      // Calculate outro animation offset - triggers much earlier
      const outroTrigger = sectionTop + sectionHeight - windowHeight - 100
      const outroProgress = Math.max(0, Math.min(1, -outroTrigger / (windowHeight * 0.3)))
      setOutroOffset(outroProgress * 50) // Reduced movement
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [experiences.length])

  const handleMouseMove = (e, index) => {
    if (cardRefs.current[index]) {
      const rect = cardRefs.current[index].getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index) => {
    setHoveredCard(index)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen bg-white dark:bg-black transition-colors duration-300 py-20 px-4 md:px-8 lg:px-16"
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fogFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes fogFloat2 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(45deg);
            opacity: 0.2;
          }
          33% {
            transform: translate(-50%, -50%) scale(1.1) rotate(120deg);
            opacity: 0.4;
          }
          66% {
            transform: translate(-50%, -50%) scale(0.9) rotate(240deg);
            opacity: 0.3;
          }
        }

        @keyframes fogFloat3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
            opacity: 0.2;
          }
        }

        .fog-layer-1 {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.1) 60%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-out;
          opacity: 0;
          filter: blur(20px);
          animation: fogFloat 4s ease-in-out infinite;
        }

        .fog-layer-2 {
          position: absolute;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.12) 25%, rgba(0, 0, 0, 0.05) 50%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease-out;
          opacity: 0;
          filter: blur(30px);
          animation: fogFloat2 6s ease-in-out infinite;
        }

        .fog-layer-3 {
          position: absolute;
          width: 90px;
          height: 90px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0.1) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.2s ease-out;
          opacity: 0;
          filter: blur(15px);
          animation: fogFloat3 3s ease-in-out infinite;
        }

        .fog-layer-4 {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 20%, rgba(0, 0, 0, 0.02) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.5s ease-out;
          opacity: 0;
          filter: blur(40px);
          animation: fogFloat 8s ease-in-out infinite reverse;
        }

        .card-hovered .fog-layer-1 { opacity: 0.6; }
        .card-hovered .fog-layer-2 { opacity: 0.4; }
        .card-hovered .fog-layer-3 { opacity: 0.8; }
        .card-hovered .fog-layer-4 { opacity: 0.3; }

        .dark .fog-layer-1 {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%);
        }

        .dark .fog-layer-2 {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
        }

        .dark .fog-layer-3 {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.1) 40%, transparent 100%);
        }

        .dark .fog-layer-4 {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 20%, rgba(255, 255, 255, 0.02) 40%, transparent 100%);
        }

        .shimmer-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.1),
            transparent
          );
          animation: shimmer 2s infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dark .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
        }

        .card-hovered .shimmer-effect {
          opacity: 1;
        }
      `}</style>

      {/* Intro Section */}
      <div className="max-w-6xl mx-auto text-left mb-20 overflow-hidden">
        <div 
          className="transform transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(${-introOffset}%)`,
            opacity: Math.max(0.3, 1 - introOffset / 50)
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            My Journey Through Code
          </h2>
          <p className="text-lg text-black dark:text-gray-300 max-w-2xl">
            From curious beginner to passionate developer - discover the milestones that shaped my coding adventure
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Curved SVG Timeline */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 800 1200"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Light mode gradient */}
            <linearGradient id="timelineGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#0369a1" stopOpacity="1" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
            </linearGradient>
            
            {/* Dark mode gradient */}
            <linearGradient id="timelineGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Background curved path */}
          <path
            d="M400 50 Q300 200 400 350 Q500 500 400 650 Q300 800 400 950 Q500 1100 400 1150"
            stroke="url(#timelineGradientLight)"
            strokeWidth="2"
            fill="none"
            className="opacity-30 dark:hidden"
          />
          
          <path
            d="M400 50 Q300 200 400 350 Q500 500 400 650 Q300 800 400 950 Q500 1100 400 1150"
            stroke="url(#timelineGradientDark)"
            strokeWidth="2"
            fill="none"
            className="opacity-30 hidden dark:block"
          />
          
          {/* Progress path - Light mode */}
          <path
            d="M400 50 Q300 200 400 350 Q500 500 400 650 Q300 800 400 950 Q500 1100 400 1150"
            stroke="#0369a1"
            strokeWidth="3"
            fill="none"
            strokeDasharray="1500"
            strokeDashoffset={1500 - scrollProgress * 1500}
            className="transition-all duration-300 dark:hidden"
            style={{ filter: "drop-shadow(0 0 8px rgba(3, 105, 161, 0.5))" }}
          />
          
          {/* Progress path - Dark mode */}
          <path
            d="M400 50 Q300 200 400 350 Q500 500 400 650 Q300 800 400 950 Q500 1100 400 1150"
            stroke="#06b6d4"
            strokeWidth="3"
            fill="none"
            strokeDasharray="1500"
            strokeDashoffset={1500 - scrollProgress * 1500}
            className="transition-all duration-300 hidden dark:block"
            style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}
          />
        </svg>

        {/* Timeline Items */}
        <div className="relative z-10 space-y-32">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`flex items-center ${
                experience.position === 'right' ? 'justify-start' : 'justify-end'
              } w-full`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div
                  className={`w-4 h-4 rounded-full border-4 dark:border-white border-black transition-all duration-500 ${
                    activeCard >= index
                      ? ' dark:bg-black scale-125 shadow-lg bg-white'
                      : 'bg-gray-400 dark:bg-gray-600'
                  }`}
                  style={{
                    boxShadow: activeCard >= index 
                      ? '0 10px 25px -3px rgba(3, 105, 161, 0.5), 0 4px 6px -2px rgba(3, 105, 161, 0.25)' 
                      : 'none'
                  }}
                />
                {/* Year Badge */}
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-500 ${
                    activeCard >= index
                      ? ' dark:bg-white dark:text-black shadow-lg  bg-black text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {experience.year}
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`w-full max-w-md mx-8 transform transition-all duration-700 ${
                  experience.position === 'right' ? 'ml-auto mr-8' : 'mr-auto ml-8'
                } ${
                  activeCard >= index
                    ? 'translate-y-0 opacity-100'
                    : experience.position === 'right'
                    ? 'translate-x-8 opacity-60'
                    : '-translate-x-8 opacity-60'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`relative p-6 rounded-xl transition-all duration-500 cursor-pointer overflow-hidden border ${
                    activeCard >= index
                      ? hoveredCard === index
                        ? 'bg-black dark:bg-white border-white dark:border-black shadow-2xl scale-105'
                        : 'bg-white dark:bg-black border-black dark:border-white shadow-lg'
                      : 'bg-white dark:bg-black border-black dark:border-white shadow-lg opacity-60'
                  }`}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {hoveredCard === index && (
                    <div className="card-hovered">
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
                      {/* Shimmer Effect */}
                      <div className="shimmer-effect" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-2xl font-bold transition-colors duration-300 ${
                          activeCard >= index
                            ? hoveredCard === index
                              ? 'text-white dark:text-black'
                              : 'text-black dark:text-white'
                            : 'text-black dark:text-white'
                        }`}
                      >
                        {experience.title}
                      </h3>
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          hoveredCard === index
                            ? 'bg-white dark:bg-black scale-150'
                            : activeCard >= index
                            ? 'bg-black dark:bg-white'
                            : 'bg-black dark:bg-white'
                        }`}
                      />
                    </div>
                    
                    <p
                      className={`leading-relaxed transition-colors duration-300 ${
                        activeCard >= index
                          ? hoveredCard === index
                            ? 'text-white dark:text-black opacity-100'
                            : 'text-black dark:text-white opacity-100'
                          : 'text-black dark:text-white opacity-70'
                      }`}
                    >
                      {experience.description}
                    </p>

                    {/* Bottom Indicator */}
                    <div
                      className={`mt-6 h-0.5 rounded-full transition-all duration-500 ${
                        activeCard >= index
                          ? hoveredCard === index
                            ? 'bg-white dark:bg-black'
                            : 'bg-black dark:bg-white'
                          : 'bg-gray-400 dark:bg-gray-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline End Dot */}
        <div className="flex justify-center mt-16 relative z-20">
          <div
            className={`w-6 h-6 rounded-full border-4 border-black dark:border-white transition-all duration-500 ${
              scrollProgress > 0.8
                ? 'dark:bg-black scale-125 shadow-lg bg-white'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
            style={{
              boxShadow: scrollProgress > 0.8 
                ? '0 10px 25px -3px rgba(3, 105, 161, 0.5), 0 4px 6px -2px rgba(3, 105, 161, 0.25)' 
                : 'none'
            }}
          />
        </div>
      </div>

    </section>
  )
}

export default ExperienceSection