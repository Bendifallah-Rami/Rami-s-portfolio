"use client"

import { useState, useEffect, useRef } from "react"

const Project = () => {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const projectRefs = useRef([])

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Start animation when section is 40% visible from bottom
      const triggerPoint = windowHeight * 0.6
      const endPoint = windowHeight * 0.1 // End animation when section is 10% visible from top

      // Calculate progress - starts when section enters viewport
      const progress = Math.max(0, Math.min(1, (triggerPoint - sectionTop) / (triggerPoint - endPoint)))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const allProjects = [
    {
      id: 1,
      title: "ESI FLOW",
      description: "web app for managing technical issues in academic environments.",
      tech: ["next", "tailwind", "LocalStorage", "tailwind", "express", "postgresql"],
      imageUrl: "/5972326491410778784.jpg",
      demoUrl: "https://esi-flow.vercel.app/",
      codeUrl: "https://github.com/Bendifallah-Rami/esi_flow_back",
      detailedDescription:
        "ESI Flow simplifies how technical issues are reported and managed at ESI, enabling efficient communication between users, technicians, and administrators.",
      features: [
        "Report technical issues easily",
        "Track and manage interventions",
        " Role-based access (Admin, Technician, User)",
        "Instant notifications and updates",
        "Dashboard for quick insights",
        "Multi-language ready",
      ],
    },
    {
      id: 2,
      title: "Datahack website",
      description: "CSE Club website to support DATAHACK event registration.",
      tech: ["next", "tailwind", "express", "mongodb"],
      imageUrl: "/Screenshot 2025-06-26 003954.png",
      demoUrl: "https://datahack-2k25.cse.club/",
      codeUrl: "#",
      detailedDescription:
        "a website for registration for the DataHack competition made by CSE CLUB.",
      features: [
        "nice ui/ux design",
        "helpful for the registration phase",
       
      ],
    },
    {
      id: 3,
      title: "Quote APP",
      description: "Quote App delivers random inspirational quotes made by users.",
      tech: ["HTML", "CSS", "JavaScript","express","mongodb","ejs",],
      imageUrl: "/Card - Element-desktop.png",
      demoUrl: "#",
      codeUrl: "https://github.com/midoriar/Quote.app",
      detailedDescription:
        "Quote App is a minimal, distraction-free platform that delivers random inspirational quotes. With a simple click, users can refresh and discover new words of wisdom anytime.",
      features: ["Clean, minimal UI", "Lightweight and fast-loading", "profiles management", "authentication", "add, edit, delete quotes", "dark mode"],
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio showcasing web development skills",
      tech: ["React", "Tailwind", "Framer Motion","vite"],
      imageUrl: "/5972326491410778790.jpg",
      demoUrl: "#",
      codeUrl: "https://github.com/Bendifallah-Rami/portfolio",
      detailedDescription:
        "A modern, animated portfolio website with smooth scrolling, interactive elements, and optimized performance. Built with the latest web technologies.",
      features: ["Smooth Animations", "Responsive Design", "SEO Optimized", "Fast Loading", "Interactive Elements"],
    },
  ]

  // Show first 4 projects by default, all when showMore is true
  const projects = showMore ? allProjects : allProjects.slice(0, 4)

  // Fast animation calculations - KEEP ORIGINAL FOR DESKTOP
  const getHeaderAnimation = () => {
    const progress = Math.max(0, Math.min(1, scrollProgress * 2)) // Slightly slower
    return {
      opacity: progress,
      transform: `translateX(${(1 - progress) * -80}px) rotateY(${(1 - progress) * -10}deg)`,
      filter: `blur(${(1 - progress) * 5}px)`,
    }
  }

  const getDescriptionAnimation = () => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - 0.05) * 1.8)) // Slightly slower
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 40}px) rotateX(${(1 - progress) * 10}deg)`,
      filter: `blur(${(1 - progress) * 4}px)`,
    }
  }

  const getProjectAnimation = (index) => {
    // Calculate which column the card is in (0 or 1 for left/right)
    const columnIndex = index % 2
    const rowIndex = Math.floor(index / 2)

    // Stagger by row first, then by column within row
    const startDelay = 0.1 + rowIndex * 0.1 + columnIndex * 0.05
    const progress = Math.max(0, Math.min(1, (scrollProgress - startDelay) * 2.2)) // Slightly slower than before

    const translateX =
      columnIndex === 0
        ? (1 - progress) * -120 // Left cards come from left
        : (1 - progress) * 120 // Right cards come from right

    const rotateY =
      columnIndex === 0
        ? (1 - progress) * -20 // Left cards rotate from left
        : (1 - progress) * 20 // Right cards rotate from right

    return {
      opacity: progress,
      transform: `
        translateX(${translateX}px) 
        translateY(${(1 - progress) * 50}px) 
        rotateY(${rotateY}deg) 
        rotateX(${(1 - progress) * 15}deg)
        scale(${0.75 + progress * 0.25})
      `,
      filter: `blur(${(1 - progress) * 6}px) brightness(${0.5 + progress * 0.5})`,
      transition: "none",
    }
  }

  const getButtonAnimation = () => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - 0.3) * 2))
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 40}px) scale(${0.9 + progress * 0.1})`,
      filter: `blur(${(1 - progress) * 3}px)`,
    }
  }

  // Handle mobile tap for project details
  const handleProjectClick = (projectId) => {
    if (isMobile) {
      setHoveredProject(hoveredProject === projectId ? null : projectId)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="projects-section mt-20 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden bg-white dark:bg-black transition-colors duration-300"
      id="projects"
    >
      <style jsx>{`
        @keyframes slideInOverlay {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInContent {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes darkGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
          }
        }

        @keyframes darkCardGlow {
          0%, 100% {
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(6, 182, 212, 0.2),
              inset 0 1px 0 rgba(6, 182, 212, 0.1);
          }
          50% {
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(6, 182, 212, 0.4),
              inset 0 1px 0 rgba(6, 182, 212, 0.2);
          }
        }
        
        .project-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform, opacity, filter;
        }
        
        .project-card:hover {
          transform: translateY(-12px) rotateY(2deg) scale(1.02) !important;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          filter: brightness(1.1) !important;
        }

        :global(.dark) .project-card {
          background: linear-gradient(145deg, #1f2937, #111827);
          border: 1px solid rgba(6, 182, 212, 0.1);
        }

        :global(.dark) .project-card:hover {
          animation: darkCardGlow 2s ease-in-out infinite;
          filter: brightness(1.2) !important;
        }
        
        .overlay-enter {
          animation: slideInOverlay 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .content-enter {
          animation: fadeInContent 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        
        .tech-tag {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .tech-tag:hover {
          transform: translateY(-3px) rotateX(5deg);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        :global(.dark) .tech-tag:hover {
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.3);
          animation: darkGlow 2s ease-in-out infinite;
        }

        .section-header {
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform, opacity, filter;
        }

        .section-description {
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform, opacity, filter;
        }

        .projects-grid {
          perspective: 1200px;
        }

        .project-card img {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover img {
          transform: scale(1.15) rotateZ(1deg);
        }

        .project-card:hover {
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        :global(.dark) .project-card:hover {
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(6, 182, 212, 0.3),
            inset 0 1px 0 rgba(6, 182, 212, 0.2);
        }

        .show-more-btn {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
        }

        .show-more-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        :global(.dark) .show-more-btn:hover {
          box-shadow: 0 15px 30px rgba(6, 182, 212, 0.3);
          animation: darkGlow 2s ease-in-out infinite;
        }

        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Mobile/Tablet specific styles */
        @media (max-width: 1023px) {
          .mobile-project-card {
            max-width: 100%;
          }
          
          .mobile-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);
            backdrop-filter: blur(2px);
          }

          :global(.dark) .mobile-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.9), rgba(6,182,212,0.1), transparent);
            backdrop-filter: blur(4px);
          }
          
          .mobile-overlay-content {
            max-height: 70vh;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.3) transparent;
          }

          :global(.dark) .mobile-overlay-content {
            scrollbar-color: rgba(6,182,212,0.5) transparent;
          }
          
          .mobile-overlay-content::-webkit-scrollbar {
            width: 4px;
          }
          
          .mobile-overlay-content::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .mobile-overlay-content::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
          }

          :global(.dark) .mobile-overlay-content::-webkit-scrollbar-thumb {
            background: rgba(6,182,212,0.5);
          }
          
          .mobile-features-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            max-height: none;
          }
          
          .mobile-feature-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 4px 0;
          }
        }
      `}</style>

      <div className="container">
        <h1
          className="font-host font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl section-header text-black dark:text-white transition-colors duration-300"
          style={getHeaderAnimation()}
        >
          Projects
        </h1>
        <p
          className="w-full sm:w-4/5 md:w-3/4 lg:w-5/12 mt-4 font-host font-normal text-sm sm:text-base lg:text-lg section-description text-gray-600 dark:text-gray-300 transition-colors duration-300"
          style={getDescriptionAnimation()}
        >
          As a skilled builder of efficient, backend-driven web apps and scalable digital systems, I aim to help you
          bring your ideas to life through clean code and smart architecture.
        </p>

        {/* Desktop Layout (>= 1024px) - ENHANCED WITH DARK MODE */}
        <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-8 lg:mt-12 projects-grid">
          {projects.map((project, index) => (
            <div
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-card flex flex-col relative overflow-hidden rounded-4xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-cyan-500/10 cursor-pointer transition-all duration-300"
              key={project.id}
              style={getProjectAnimation(index)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image w-140 relative h-125 overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-4xl dark:brightness-90 dark:contrast-110 transition-all duration-300"
                  style={{
                    transform: hoveredProject === project.id ? "scale(1.15) rotateZ(1deg)" : "scale(1)",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                {/* Desktop Hover Overlay - ENHANCED FOR DARK MODE */}
                {hoveredProject === project.id && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent dark:from-black/98 dark:via-gray-900/80 dark:to-cyan-900/20 overlay-enter">
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white content-enter">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-host font-bold text-3xl mb-2 text-neutral-100 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="font-host text-sm leading-relaxed text-gray-100 dark:text-gray-200">
                            {project.detailedDescription}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-host font-semibold text-sm text-cyan-200 dark:text-cyan-300 uppercase tracking-wide">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {project.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center space-x-2"
                                style={{
                                  animation: `fadeInContent 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + featureIndex * 0.1}s both`,
                                }}
                              >
                                <div className="w-2 h-2 bg-cyan-400 dark:bg-cyan-300 rounded-full flex-shrink-0 shadow-sm shadow-cyan-400/50 dark:shadow-cyan-300/70"></div>
                                <span className="font-host text-xs text-gray-200 dark:text-gray-100">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3 pt-3">
                          <a
                            href={project.demoUrl}
                            className="px-4 py-2 rounded-lg font-host font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg bg-white dark:bg-cyan-400 text-black dark:text-black hover:bg-gray-100 dark:hover:bg-cyan-300"
                          >
                            Live Demo
                          </a>
                          <a
                            href={project.codeUrl}
                            className="px-4 py-2 rounded-lg font-host font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-500 dark:border-cyan-400 text-white dark:text-cyan-300 hover:border-gray-300 dark:hover:border-cyan-300 hover:bg-white/10 dark:hover:bg-cyan-400/10"
                          >
                            View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="project-info mt-4 p-4">
                <h3 className="font-host font-bold text-neutral-800 dark:text-white text-2xl mb-2 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-host font-normal text-neutral-600 dark:text-gray-300 mb-3 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-tag bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full font-host font-medium text-sm transition-all duration-300"
                      style={{
                        animation:
                          hoveredProject === project.id
                            ? `fadeInContent 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${techIndex * 0.1}s both`
                            : "none",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout (< 1024px) - ENHANCED WITH DARK MODE */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="mobile-project-card flex flex-col relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-cyan-500/10 cursor-pointer transition-all duration-300"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-image w-full relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl dark:brightness-90 dark:contrast-110 transition-all duration-300"
                />

                {/* Mobile/Tablet Overlay - ENHANCED FOR DARK MODE */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 mobile-overlay overlay-enter">
                    <div className="mobile-overlay-content absolute inset-0 flex flex-col justify-start p-4 text-white content-enter">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="text-center">
                          <h3 className="font-host font-bold text-xl sm:text-2xl mb-2 text-white dark:text-cyan-100">
                            {project.title}
                          </h3>
                          <p className="font-host text-sm leading-relaxed text-gray-100 dark:text-gray-200">
                            {project.detailedDescription}
                          </p>
                        </div>

                        {/* Features Section */}
                        <div className="space-y-3">
                          <h4 className="font-host font-semibold text-sm text-cyan-200 dark:text-cyan-300 uppercase tracking-wide text-center">
                            Key Features
                          </h4>
                          <div className="mobile-features-grid">
                            {project.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="mobile-feature-item"
                                style={{
                                  animation: `fadeInContent 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + featureIndex * 0.1}s both`,
                                }}
                              >
                                <div className="w-2 h-2 bg-cyan-400 dark:bg-cyan-300 rounded-full flex-shrink-0 shadow-sm shadow-cyan-400/50 dark:shadow-cyan-300/70 mt-1"></div>
                                <span className="font-host text-sm text-gray-200 dark:text-gray-100 flex-1">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-3">
                          <h4 className="font-host font-semibold text-sm text-cyan-200 dark:text-cyan-300 uppercase tracking-wide text-center">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-white/20 dark:bg-cyan-400/20 backdrop-blur-sm text-white dark:text-cyan-100 px-3 py-1 rounded-full font-host font-medium text-xs border border-white/30 dark:border-cyan-400/30"
                                style={{
                                  animation: `fadeInContent 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + techIndex * 0.1}s both`,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4 justify-center">
                          <a
                            href={project.demoUrl}
                            className="px-4 py-2 rounded-lg font-host font-semibold text-sm transition-all duration-300 hover:scale-105 bg-white dark:bg-cyan-400 text-black dark:text-black hover:bg-gray-100 dark:hover:bg-cyan-300 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo
                          </a>
                          <a
                            href={project.codeUrl}
                            className="px-4 py-2 rounded-lg font-host font-semibold text-sm transition-all duration-300 hover:scale-105 border border-white/50 dark:border-cyan-400/50 text-white dark:text-cyan-300 hover:bg-white/10 dark:hover:bg-cyan-400/10 backdrop-blur-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Code
                          </a>
                        </div>

                        {/* Close indicator */}
                        <div className="text-center pt-2">
                          <p className="text-xs text-gray-300 dark:text-gray-400 opacity-75">Tap again to close</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Info */}
              <div className="project-info mt-3 p-4">
                <h3 className="font-host font-bold text-neutral-800 dark:text-white text-lg sm:text-xl mb-2 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-host font-normal text-neutral-600 dark:text-gray-300 mb-3 text-sm sm:text-base transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full font-host font-medium text-xs transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full font-host font-medium text-xs transition-colors duration-300">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - ENHANCED FOR DARK MODE */}
        {allProjects.length > 4 && (
          <div className="flex justify-center mt-12" style={getButtonAnimation()}>
            <button
              className="show-more-btn scroll-button flex items-center gap-2 font-host w-max text-lg sm:text-xl lg:text-2xl relative overflow-hidden transition-colors duration-300 group px-6 py-3 sm:px-8 sm:py-4 rounded-[144px] border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:border-cyan-800 dark:hover:border-cyan-400"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                e.currentTarget.style.setProperty("--mouse-x", x + "px")
                e.currentTarget.style.setProperty("--mouse-y", y + "px")
              }}
              onClick={() => setShowMore(!showMore)}
            >
              <span className="absolute inset-0 rounded-full bg-cyan-800 dark:bg-cyan-400 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-[var(--mouse-x,50%)_var(--mouse-y,50%)] -z-10"></span>
              <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                {showMore ? "Show Less" : `Show More`}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Project
