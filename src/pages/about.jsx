"use client"

import { useState, useRef, useEffect } from "react"

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState(new Set())
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [skillCursorPositions, setSkillCursorPositions] = useState({})
  const sectionRef = useRef(null)
  const skillRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate scroll progress for the entire section
      const startOffset = windowHeight * 0.8
      const endOffset = -sectionHeight * 0.3

      const progress = Math.max(0, Math.min(1, (startOffset - sectionTop) / (startOffset - endOffset)))

      setScrollProgress(progress)
      setIsVisible(progress > 0.1)
    }

    // Individual skill observer
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillIndex = skillRefs.current.indexOf(entry.target)
            if (skillIndex !== -1) {
              setTimeout(() => {
                setAnimatedSkills((prev) => new Set([...prev, skillIndex]))
              }, skillIndex * 20)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    // Observe skills
    skillRefs.current.forEach((skill) => {
      if (skill) skillObserver.observe(skill)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      skillObserver.disconnect()
    }
  }, [])

  const handleSkillMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSkillCursorPositions((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))
  }

  const handleSkillMouseEnter = (index) => {
    setHoveredSkill(index)
  }

  const handleSkillMouseLeave = () => {
    setHoveredSkill(null)
  }

  const skills = [
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      color:
        "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700/50 hover:bg-yellow-100 dark:hover:bg-yellow-800/30 text-yellow-800 dark:text-yellow-200",
    },
    {
      name: "React",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-800 dark:text-blue-200",
    },
    {
      name: "Node.js",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      color:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50 hover:bg-green-100 dark:hover:bg-green-800/30 text-green-800 dark:text-green-200",
    },
    {
      name: "Python",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      color:
        "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700/50 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200",
    },
    {
      name: "MongoDB",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
      color:
        "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 text-emerald-800 dark:text-emerald-200",
    },
    {
      name: "PostgreSQL",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-800 dark:text-blue-200",
    },
    {
      name: "Express.js",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
      color:
        "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200",
    },
    {
      name: "Next.js",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
      color:
        "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200",
    },
    {
      name: "Tailwind CSS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      color:
        "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/50 hover:bg-cyan-100 dark:hover:bg-cyan-800/30 text-cyan-800 dark:text-cyan-200",
    },
    {
      name: "Git",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
      color:
        "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/50 hover:bg-orange-100 dark:hover:bg-orange-800/30 text-orange-800 dark:text-orange-200",
    },
    {
      name: "Docker",
      icon: "https://www.svgrepo.com/show/303161/docker.svg",
      color:
        "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700/50 hover:bg-sky-100 dark:hover:bg-sky-800/30 text-sky-800 dark:text-sky-200",
    },
    {
      name: "AWS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      color:
        "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50 hover:bg-amber-100 dark:hover:bg-amber-800/30 text-amber-800 dark:text-amber-200",
    },
  ]

  // Animation calculations based on scroll progress
  const getTitleAnimation = () => {
    const progress = Math.max(0, Math.min(1, scrollProgress * 4))
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 10}px)`,
      filter: `blur(${(1 - progress) * 0.5}px)`,
    }
  }

  const getTextAnimation = (delay = 0) => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - delay) * 5))
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 8}px)`,
      filter: `blur(${(1 - progress) * 0.3}px)`,
    }
  }

  const getImageAnimation = () => {
    const progress = scrollProgress
    const rotation = (1 - progress) * 45 - progress * 15
    return {
      opacity: Math.max(0, Math.min(1, progress * 4)),
      transform: `rotateY(${rotation}deg) rotateZ(${(1 - progress) * 2}deg)`,
      filter: `blur(${(1 - progress) * 0.5}px)`,
    }
  }

  const getSkillsTitleAnimation = () => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 4))
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 8}px)`,
      filter: `blur(${(1 - progress) * 0.3}px)`,
    }
  }

  return (
    <div
      className="px-6 md:px-12 lg:px-24 py-16 sm:mt-0 bg-white dark:bg-black transition-colors duration-300"
      ref={sectionRef}
      id="about"
    >
      <style jsx>{`
        @keyframes skillSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes shapeFloat1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, -15px) rotate(180deg);
          }
        }

        @keyframes shapeFloat2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-20px, 10px) rotate(-90deg) scale(1.1);
          }
        }

        @keyframes shapeFloat3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(10px, -20px) rotate(120deg);
          }
          66% {
            transform: translate(-15px, 15px) rotate(240deg);
          }
        }

        @keyframes skillFogFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes skillFogFloat2 {
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

        @keyframes skillFogFloat3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
          }
        }

        @keyframes darkGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.4);
          }
        }

        .shapes-background {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        :global(.dark) .shapes-background {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        }

        .shapes-background::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 15%;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation: shapeFloat1 4s ease-in-out infinite;
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .shapes-background::before {
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          opacity: 0.3;
        }

        .shapes-background::after {
          content: '';
          position: absolute;
          top: 60%;
          right: 20%;
          width: 30px;
          height: 30px;
          background: linear-gradient(45deg, #10b981, #059669);
          border-radius: 50%;
          animation: shapeFloat2 5s ease-in-out infinite;
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .shapes-background::after {
          background: linear-gradient(45deg, #34d399, #10b981);
          opacity: 0.3;
        }

        .shape-1 {
          position: absolute;
          top: 25%;
          right: 10%;
          width: 35px;
          height: 35px;
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
          animation: shapeFloat3 6s ease-in-out infinite;
          opacity: 0.08;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .shape-1 {
          background: linear-gradient(45deg, #a78bfa, #8b5cf6);
          opacity: 0.25;
        }

        .shape-2 {
          position: absolute;
          bottom: 20%;
          left: 10%;
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #f59e0b, #d97706);
          transform: rotate(45deg);
          animation: shapeFloat1 7s ease-in-out infinite reverse;
          opacity: 0.08;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .shape-2 {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          opacity: 0.25;
        }

        .shape-3 {
          position: absolute;
          top: 40%;
          left: 5%;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: shapeFloat2 8s ease-in-out infinite;
          opacity: 0.08;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .shape-3 {
          background: linear-gradient(45deg, #f87171, #ef4444);
          opacity: 0.25;
        }

        .skill-badge {
          transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          transform: translateX(-20px) scale(0.95);
          position: relative;
          overflow: hidden;
        }

        .skill-badge.animate {
          animation: skillSlideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .skill-badge:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        :global(.dark) .skill-badge:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          animation: darkGlow 2s ease-in-out infinite;
        }

        .skill-fog-layer-1 {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.2s ease-out;
          filter: blur(8px);
          animation: skillFogFloat 3s ease-in-out infinite;
        }

        :global(.dark) .skill-fog-layer-1 {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0.3) 30%, rgba(6, 182, 212, 0.1) 60%, transparent 100%);
        }

        .skill-fog-layer-2 {
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-out;
          filter: blur(12px);
          animation: skillFogFloat2 4s ease-in-out infinite;
        }

        :global(.dark) .skill-fog-layer-2 {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.2) 25%, rgba(6, 182, 212, 0.05) 50%, transparent 100%);
        }

        .skill-fog-layer-3 {
          position: absolute;
          width: 45px;
          height: 45px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.2) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease-out;
          filter: blur(6px);
          animation: skillFogFloat3 2.5s ease-in-out infinite;
        }

        :global(.dark) .skill-fog-layer-3 {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.4) 20%, rgba(6, 182, 212, 0.15) 40%, transparent 100%);
        }

        .skill-fog-layer-4 {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.05) 40%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease-out;
          filter: blur(15px);
          animation: skillFogFloat 5s ease-in-out infinite reverse;
        }

        :global(.dark) .skill-fog-layer-4 {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.15) 20%, rgba(6, 182, 212, 0.03) 40%, transparent 100%);
        }

        .profile-image {
          transition: all 0.2s ease;
          will-change: transform, opacity, filter;
        }

        :global(.dark) .profile-image {
          filter: brightness(0.9) contrast(1.1);
        }

        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* About Me Title */}
      <h1
        className="font-bold text-4xl md:text-6xl lg:text-7xl mb-8 text-black dark:text-white transition-colors duration-300"
        style={{
          ...getTitleAnimation(),
          lineHeight: "1.1",
          transition: "none",
        }}
      >
        About Me
      </h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mt-12">
        {/* Left Column - Description */}
        <div className="lg:w-3/5 space-y-6">
          <p
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300"
            style={{
              ...getTextAnimation(0.02),
              transition: "none",
            }}
          >
            Hello! I'm{" "}
            <span className="text-gray-800 dark:text-white font-semibold transition-colors duration-300">Rami</span>,
            computer science student at ESI Algiers and a passionate full-stack developer with a love for creating
            elegant, efficient solutions to complex problems. I specialize in backend development while maintaining
            strong frontend skills.
          </p>

          <p
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300"
            style={{
              ...getTextAnimation(0.04),
              transition: "none",
            }}
          >
            I focus on building scalable APIs, robust databases, and functional frontends using modern technologies. My
            goal is to create applications that are not only performant but also provide exceptional user experiences.
          </p>

          <p
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300"
            style={{
              ...getTextAnimation(0.06),
              transition: "none",
            }}
          >
            When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or
            staying updated with the latest development trends and best practices.
          </p>
        </div>

        {/* Right Column - Profile Picture */}
        <div className="lg:w-2/5">
          <div
            className="shapes-background relative rounded-2xl p-6 shadow-lg dark:shadow-cyan-500/10"
            style={{
              ...getImageAnimation(),
              transition: "none",
            }}
          >
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>

            <div className="relative z-10">
              <img
                className="profile-image rounded-xl w-full h-auto shadow-md dark:shadow-cyan-500/20"
                src="public/5967418000921446177.jpg"
                alt="Rami's Profile"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-20">
        <h2
          className="text-3xl md:text-4xl mb-8 text-black dark:text-white transition-colors duration-300"
          style={{
            ...getSkillsTitleAnimation(),
            transition: "none",
          }}
        >
          Technical Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillRefs.current[index] = el)}
              className={`skill-badge ${animatedSkills.has(index) ? "animate" : ""} ${skill.color} px-4 py-3 rounded-xl font-medium flex items-center gap-3 shadow-sm dark:shadow-cyan-500/10 border cursor-pointer transition-all duration-300`}
              style={{
                animationDelay: `${index * 0.01}s`,
              }}
              onMouseMove={(e) => handleSkillMouseMove(e, index)}
              onMouseEnter={() => handleSkillMouseEnter(index)}
              onMouseLeave={handleSkillMouseLeave}
            >
              {/* Fog Effects for Each Skill */}
              {hoveredSkill === index && skillCursorPositions[index] && (
                <>
                  <div
                    className="skill-fog-layer-4"
                    style={{
                      left: `${skillCursorPositions[index].x}px`,
                      top: `${skillCursorPositions[index].y}px`,
                      opacity: 1,
                    }}
                  />
                  <div
                    className="skill-fog-layer-2"
                    style={{
                      left: `${skillCursorPositions[index].x}px`,
                      top: `${skillCursorPositions[index].y}px`,
                      opacity: 1,
                    }}
                  />
                  <div
                    className="skill-fog-layer-1"
                    style={{
                      left: `${skillCursorPositions[index].x}px`,
                      top: `${skillCursorPositions[index].y}px`,
                      opacity: 1,
                    }}
                  />
                  <div
                    className="skill-fog-layer-3"
                    style={{
                      left: `${skillCursorPositions[index].x}px`,
                      top: `${skillCursorPositions[index].y}px`,
                      opacity: 1,
                    }}
                  />
                </>
              )}

              <img
                src={skill.icon || "/placeholder.svg?height=20&width=20"}
                alt={skill.name}
                className="w-5 h-5 flex-shrink-0 relative z-10 dark:brightness-110 transition-all duration-300"
              />
              <span className="text-sm whitespace-nowrap relative z-10">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
