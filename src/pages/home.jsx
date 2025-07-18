"use client"

import { useState, useRef, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

const Home = () => {
  const [activeTab, setActiveTab] = useState("Home")
  const [sliderStyle, setSliderStyle] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const tabRefs = useRef({})

  const navItems = [
    { id: "Home", label: "Home", href: "#Home" },
    { id: "about", label: "About", href: "#about" },
    { id: "Expertise", label: "Expertise", href: "#Expertise" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    updateSlider()
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [activeTab])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((section) => section.element)

      const scrollPosition = window.scrollY + 150
      let currentSection = sections[0]?.id || "Home"

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionTop = section.element.getBoundingClientRect().top + window.pageYOffset

        if (scrollPosition >= sectionTop) {
          currentSection = section.id
        }
      }

      if (currentSection !== activeTab) {
        setActiveTab(currentSection)
      }
    }

    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [activeTab, navItems])

  const updateSlider = () => {
    const activeElement = tabRefs.current[activeTab]
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      const left = activeRect.left - navRect.left
      const width = activeRect.width

      setSliderStyle({
        transform: `translateX(${left}px)`,
        width: `${width}px`,
      })
    }
  }

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()

    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offset = 100

      window.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      })
    }

    setActiveTab(targetId)
    setIsMobileMenuOpen(false)
  }

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setActiveTab("about")
    }
  }

  const animateText = (text, delay = 0) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animation: `heroSlideUp 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both ${delay + index * 0.15}s`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {word}&nbsp;
      </span>
    ))
  }

  return (
    <div
      className="home-container px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-white dark:bg-black transition-colors duration-300"
      id="home"
    >
      <style jsx>{`
        @keyframes heroSlideUp {
          0% {
            transform: translateY(120px) rotateX(45deg);
            opacity: 0;
            filter: blur(8px);
          }
          50% {
            opacity: 0.7;
            filter: blur(2px);
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes navSlideDown {
          0% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(10px) scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes logoFloat {
          0% {
            transform: translateY(-50px) scale(0.5) rotate(-180deg);
            opacity: 0;
          }
          70% {
            transform: translateY(5px) scale(1.1) rotate(10deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes buttonBounce {
          0% {
            transform: scale(0) rotate(90deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slideInFast {
          0% {
            transform: translateX(-30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRightFast {
          0% {
            transform: translateX(30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes mobileMenuSlide {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Dark mode glow effects */
        @keyframes darkGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
          }
        }

        .dark .nav-glow {
          animation: darkGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Home Section */}
      <section id="Home" className="min-h-screen flex flex-col">
        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex justify-around items-center font-host fixed top-4 left-0 w-full z-50"
          style={{
            animation: isVisible ? "navSlideDown 1.0s cubic-bezier(0.68, -0.55, 0.265, 1.55) both 0.3s" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Logo */}
          <div
            className="flex items-center"
            style={{
              animation: isVisible ? "logoFloat 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both 0.1s" : "none",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <img
              src="/_6dfb0a40-d7bd-4865-a2b3-38a70db160e2-removebg-preview.png"
              alt="Logo"
              className="w-[60px] h-[60px] filter  transition-all duration-300"
            />
          </div>

          {/* Navigation Pills */}
          <div className="bg-black dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 nav-glow w-min py-1 rounded-[80px] relative shadow-lg dark:shadow-cyan-500/20 transition-all duration-300">
            <div
              className="absolute top-1 h-12 bg-white dark:bg-cyan-400 rounded-[80px] transition-all duration-300"
              style={{
                ...sliderStyle,
                transition:
                  "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease",
              }}
            />

            <ul
              ref={navRef}
              className="flex justify-evenly text-white dark:text-gray-200 px-1 py-3 items-center relative z-10"
            >
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    ref={(el) => (tabRefs.current[item.id] = el)}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`
                      px-3 lg:px-4 py-3 relative cursor-pointer text-sm lg:text-base transition-all duration-300
                      ${
                        activeTab === item.id
                          ? "text-black dark:text-black font-semibold"
                          : "text-zinc-500 dark:text-gray-300 hover:text-gray-300 dark:hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center items-center z-50 pt-4">
          <div className="flex items-center justify-between gap-4 bg-black dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 rounded-full p-3 shadow-lg dark:shadow-cyan-500/20 transition-all duration-300">
            <div>
              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent text-white dark:text-gray-100 p-3 rounded-full hover:bg-white/10 transition-all duration-300"
              style={{
                animation: isVisible ? "navSlideDown 1.0s cubic-bezier(0.68, -0.55, 0.265, 1.55) both 0.3s" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black dark:bg-gray-900/95 dark:backdrop-blur-md dark:border dark:border-white/20 rounded-2xl p-4 min-w-[200px] shadow-xl dark:shadow-cyan-500/20 transition-all duration-300"
              style={{
                animation: "mobileMenuSlide 0.3s ease-out both",
              }}
            >
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                      className={`
                        block px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
                        ${
                          activeTab === item.id
                            ? "bg-white dark:bg-cyan-400 text-black dark:text-black font-semibold"
                            : "text-zinc-300 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-zinc-800 dark:hover:bg-white/10"
                        }
                      `}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="intro-section flex-1 flex flex-col justify-center mt-0 sm:mt-8 md:mt-15">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 sm:gap-8 lg:gap-0">
            <h1
              className="font-host text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-9xl overflow-hidden leading-tight text-center lg:text-left text-black dark:text-white transition-colors duration-300"
              style={{ lineHeight: "1.1" }}
            >
              {animateText("Web development & API Design", 0.8)}
            </h1>
            <div
              className="flex justify-center lg:justify-start items-center"
              style={{
                animation: isVisible ? "buttonBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both 1.5s" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <button
                onClick={handleScrollDown}
                className="scroll-button flex items-center gap-2 font-host w-max text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl relative overflow-hidden transition-all duration-300 group px-6 py-5 sm:px-7 sm:py-6 md:px-8 md:py-8 rounded-full border border-gray-300 dark:border-gray-600 hover:border-cyan-800 dark:hover:border-cyan-400 text-black dark:text-white bg-transparent dark:bg-transparent hover:shadow-lg dark:hover:shadow-cyan-500/20"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  e.currentTarget.style.setProperty("--mouse-x", x + "px")
                  e.currentTarget.style.setProperty("--mouse-y", y + "px")
                }}
              >
                <span className="absolute inset-0 rounded-full bg-cyan-800 dark:bg-cyan-400 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-[var(--mouse-x,50%)_var(--mouse-y,50%)] -z-10"></span>
                <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  Scroll down
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contact and Description */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-12 sm:mt-16 md:mt-5 font-host gap-8 sm:gap-10 md:gap-4">
            <div
              className="text-center md:text-left"
              style={{
                animation: isVisible ? "slideInFast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both 1.7s" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <p className="font-opensans text-lg sm:text-xl md:text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <span className="text-black dark:text-white font-semibold transition-colors duration-300">
                  Let'sTalk
                </span>{" "}
                <br />
                <span className="dark:text-cyan-400 transition-colors duration-300">nr_bendifallah@esi.dz</span>
              </p>
            </div>
            <div
              className="text-center md:text-right"
              style={{
                animation: isVisible ? "slideInRightFast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both 1.8s" : "none",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <p className="font-host text-base sm:text-lg md:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-96 mx-auto md:mx-0 leading-relaxed transition-colors duration-300">
                Hi, I'm <span className="text-black dark:text-white font-semibold">Rami</span> a full-stack developer
                focused on backend development. I build scalable APIs, databases, and functional frontends using
                different technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections for navigation */}
    
    </div>
  )
}

export default Home
