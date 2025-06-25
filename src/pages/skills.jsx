"use client"

import { useState, useEffect, useRef } from "react"

const Expertise = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState("intro") // intro, visible, outro
  const sectionRef = useRef(null)

  const expertiseList = [
    {
      title: "Frontend Development",
      description:
        "I build clean, responsive, and interactive web interfaces using modern technologies like React, Next.js, and Tailwind CSS. I prioritize performance and accessibility to ensure your users have a seamless and delightful experience across all devices.",
    },
    {
      title: "UI/UX Design",
      description:
        "I craft intuitive, aesthetic digital experiences by combining design principles with empathy. My focus is to ensure both form and function align to meet user needs, from layout and interactions to usability and visual identity.",
    },
    {
      title: "Backend Development",
      description:
        "I develop secure and scalable server-side applications using Node.js, Express, and databases like MongoDB and PostgreSQL. I ensure smooth communication between the frontend and backend for optimal functionality and user satisfaction.",
    },
    {
      title: "Solution Architecture",
      description:
        "I identify, analyze, and solve real-world business problems through tailored digital solutions. By understanding your goals, I design structured, strategic systems that enhance efficiency, usability, and long-term product growth.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setAnimationPhase("intro")
          setTimeout(() => {
            setIsVisible(true)
            setAnimationPhase("visible")
          }, 100)
        } else if (!entry.isIntersecting && isVisible) {
          setAnimationPhase("outro")
          setTimeout(() => {
            setIsVisible(false)
          }, 800)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const getItemAnimation = (index) => {
    const delay = index * 150

    if (animationPhase === "intro") {
      return {
        transform: "translateY(60px) rotateX(15deg)",
        opacity: "0",
        filter: "blur(8px)",
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }
    } else if (animationPhase === "visible") {
      return {
        transform: "translateY(0) rotateX(0deg)",
        opacity: "1",
        filter: "blur(0px)",
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }
    } else if (animationPhase === "outro") {
      return {
        transform: "translateY(-40px) rotateX(-10deg) scale(0.95)",
        opacity: "0",
        filter: "blur(4px)",
        transition: `all 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) ${index * 100}ms`,
      }
    }
  }

  const getTitleAnimation = () => {
    if (animationPhase === "intro") {
      return {
        transform: "translateX(-100px) scale(0.8)",
        opacity: "0",
        filter: "blur(10px)",
        transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    } else if (animationPhase === "visible") {
      return {
        transform: "translateX(0) scale(1)",
        opacity: "1",
        filter: "blur(0px)",
        transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    } else if (animationPhase === "outro") {
      return {
        transform: "translateX(-80px) scale(0.9)",
        opacity: "0",
        filter: "blur(6px)",
        transition: "all 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53)",
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 bg-white dark:bg-black overflow-hidden font-host transition-colors duration-300"
      id="Expertise"
    >
      <style jsx>{`
        @keyframes darkGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
          }
        }

        @keyframes darkPulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes darkFloat1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(15px, -10px) rotate(120deg);
          }
          66% {
            transform: translate(-10px, 15px) rotate(240deg);
          }
        }

        @keyframes darkFloat2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-20px, 10px) rotate(180deg) scale(1.2);
          }
        }

        .expertise-item {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, box-shadow;
        }

        :global(.dark) .expertise-item:hover {
          animation: darkGlow 2s ease-in-out infinite;
        }

        .floating-element-1 {
          animation: darkFloat1 8s ease-in-out infinite;
        }

        .floating-element-2 {
          animation: darkFloat2 10s ease-in-out infinite;
        }

        :global(.dark) .floating-element-1 {
          background: linear-gradient(135deg, #06b6d4, #0891b2, #0e7490);
          animation: darkFloat1 6s ease-in-out infinite, darkPulse 4s ease-in-out infinite;
        }

        :global(.dark) .floating-element-2 {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9);
          animation: darkFloat2 8s ease-in-out infinite, darkPulse 5s ease-in-out infinite;
        }

        .gradient-underline {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: gradientShift 3s ease-in-out infinite;
        }

        :global(.dark) .gradient-underline {
          background: linear-gradient(90deg, #06b6d4, #8b5cf6, #f59e0b);
          background-size: 200% 100%;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .expertise-dot {
          transition: all 0.3s ease;
          position: relative;
        }

        :global(.dark) .expertise-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        :global(.dark) .expertise-item:hover .expertise-dot::after {
          opacity: 1;
        }

        .hover-background {
          transition: all 0.3s ease;
        }

        :global(.dark) .hover-background {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05));
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative">
        <h2
          className="text-6xl font-bold mb-16 text-black dark:text-white relative transition-colors duration-300"
          style={getTitleAnimation()}
        >
          Expertise
          <div
            className="absolute -bottom-2 left-0 h-1 gradient-underline rounded-full"
            style={{
              width: animationPhase === "visible" ? "120px" : "0px",
              transition: "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s",
            }}
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {expertiseList.map((item, index) => (
            <div key={index} className="expertise-item group cursor-pointer" style={getItemAnimation(index)}>
              <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white flex items-center group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                <span
                  className="expertise-dot w-2 h-2 bg-black dark:bg-white rounded-full mr-4 group-hover:bg-blue-500 dark:group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150"
                  style={{
                    boxShadow: animationPhase === "visible" ? "0 0 20px rgba(59, 130, 246, 0.3)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <span className="relative">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 group-hover:w-full transition-all duration-500 ease-out" />
                </span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 relative">
                {item.description}
                <span className="hover-background absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-cyan-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-lg -m-2 p-2" />
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Floating decorative elements */}
        <div className="floating-element-1 absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-cyan-400 dark:to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-30 transition-all duration-300" />
        <div
          className="floating-element-2 absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-500 dark:to-cyan-400 rounded-full blur-3xl opacity-15 dark:opacity-25 transition-all duration-300"
          style={{ animationDelay: "1s" }}
        />

        {/* Additional dark mode decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-400/30 dark:to-blue-400/30 rounded-full blur-2xl opacity-0 dark:opacity-100 transition-all duration-300 floating-element-1" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-400/30 dark:to-pink-400/30 rounded-full blur-2xl opacity-0 dark:opacity-100 transition-all duration-300 floating-element-2" />
      </div>
    </section>
  )
}

export default Expertise
