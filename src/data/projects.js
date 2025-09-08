// Projects data for the Projects section
export const allProjects = [
  {
    id: 1,
    title: "ESI FLOW",
    description: "web app for managing technical issues in academic environments.",
    tech: ["next", "tailwind", "LocalStorage", "express", "postgresql"],
    imageUrl: "/esiflow.png",
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
    title: "Food delivery",
    description: "A full frontend management system for a restaurant",
    tech: ["next", "Tailwind", "LocalStorage"],
    imageUrl: "/foodDelivery.png",
    demoUrl: "https://food-delivery-liard-omega.vercel.app/",
    codeUrl: "https://github.com/Bendifallah-Rami/food-delivery",
    detailedDescription:
      "A comprehensive food delivery restaurant management system with staff and admin workflow, real-time notifications, and order tracking. Built with Next.js and modern web technologies.",
    features: ["Smooth", "Responsive Design", "SEO Optimized", "full system", "nice ui/ux"],
  },
  {
  id: 8,
  title: "Quiz App Backend API",
  description: "Advanced Quiz Management & Analytics System",
  tech: ["Express.js", "PostgreSQL", "Sequelize", "Passport.js", "JWT", "Node.js"],
  imageUrl: "/quiz.png",
  demoUrl: "#",
  codeUrl: "https://github.com/Bendifallah-Rami/Quiz-App-back",
  detailedDescription:
    "A powerful backend API for a quiz application supporting dynamic quiz creation, user authentication, analytics, and real-time tracking of quiz attempts. Features include multi-category quizzes, user statistics, admin analytics, and secure authentication.",
  features: [
    "Dynamic Quiz Creation & Management",
    "Multi-category & Tag Support",
    "User Authentication (JWT & Google OAuth)",
    "Quiz Attempt Tracking & Analytics",
    "Admin Analytics Dashboard",
    "Difficulty Levels & Question Types",
    "Email Notifications",
    "User Statistics & Streak Tracking",
    "Role-based Access Control"
  ]
},
{
    id: 4,
    title: "Portfolio Website",
    description: "A responsive portfolio showcasing web development skills",
    tech: ["React", "Tailwind", "Framer Motion","vite"],
    imageUrl: "/portfolio.png",
    demoUrl: "#",
    codeUrl: "https://github.com/Bendifallah-Rami/portfolio",
    detailedDescription:
      "A modern, animated portfolio website with smooth scrolling, interactive elements, and optimized performance. Built with the latest web technologies.",
    features: ["Smooth Animations", "Responsive Design", "SEO Optimized", "Fast Loading", "Interactive Elements"],
  },
  
  {
    id: 3,
    title: "Datahack website",
    description: "CSE Club website to support DATAHACK event registration.",
    tech: ["next", "tailwind", "express", "mongodb"],
    imageUrl: "/datahack.png",
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
    id: 5,
    title: "Food Delivery Backend API",
    description: "Comprehensive Restaurant Management & Order Processing System",
    tech: ["Express.js", "PostgreSQL", "WebSocket", "Sequelize", "Rate Limiter"],
    imageUrl: "/foodDelivery.png",
    demoUrl: "#",
    codeUrl: "https://github.com/Bendifallah-Rami/food-delivery-back",
    detailedDescription:
      "A robust food delivery backend API with real-time order tracking, comprehensive user management, and seamless delivery coordination. Features complete restaurant operations, payment processing, and notification systems.",
    features: [
        "Real-time Order Tracking", 
        "Multi-role Authentication", 
        "Payment Processing", 
        "Delivery Management", 
        "Email Notifications", 
        "Stock Management", 
        "Report Generation", 
        "WebSocket Integration"
    ],
    
},

  {
    id: 7,
    title: "Quote APP",
    description: "Quote App delivers random inspirational quotes made by users.",
    tech: ["HTML", "CSS", "JavaScript","express","mongodb","ejs",],
    imageUrl: "/Card - Element-desktop.png",
    demoUrl: "#",
    codeUrl: "https://github.com/midoriar/Quote.app",
    detailedDescription:
      "Quote App is a minimal, distraction-free platform that delivers random inspirational quotes. With a simple click, users can refresh and discover new words of wisdom anytime.",
    features: ["Clean, minimal UI", "Lightweight and fast-loading", "profiles management", "authentication", "add, edit, delete quotes", "dark mode"],
  }
]
