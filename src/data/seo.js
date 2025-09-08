// SEO and metadata configuration
export const seoConfig = {
  siteName: "Rami Bendifallah Portfolio",
  siteUrl: "https://ramiportfolio.vercel.app/", // Update with your actual domain
  author: {
    name: "Rami Bendifallah",
    email: "nr_bendifallah@esi.dz",
    title: "Full Stack Developer & Backend Specialist",
    bio: "Full-stack developer focused on backend development. Building scalable APIs, databases, and functional frontends using modern technologies.",
    location: "Algeria",
    social: {
      github: "https://github.com/Bendifallah-Rami",
      linkedin: "https://linkedin.com/in/your-profile", // Update with your LinkedIn
      twitter: "@your_twitter", // Update with your Twitter
    }
  },
  
  // Primary keywords for SEO
  keywords: [
    "Rami Bendifallah",
    "Full Stack Developer",
    "Backend Developer", 
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "API Development",
    "Database Design",
    "Web Development",
    "PostgreSQL",
    "MongoDB",
    "Express.js",
    "ESI Algeria",
    "Software Engineer"
  ],
  
  // Default meta descriptions for different sections
  descriptions: {
    home: "Full-stack developer focused on backend development. Building scalable APIs, databases, and functional frontends using Node.js, React, Next.js, and modern technologies.",
    about: "Learn about Rami Bendifallah, a passionate full-stack developer from Algeria specializing in backend development and modern web technologies.",
    skills: "Technical expertise in JavaScript, Node.js, React, Next.js, PostgreSQL, MongoDB, Express.js, and modern web development technologies.",
    experience: "Professional journey from learning web development fundamentals to building full-stack applications and mentoring fellow developers.",
    projects: "Portfolio showcasing full-stack projects including ESI Flow, food delivery systems, and modern web applications built with latest technologies.",
    contact: "Get in touch with Rami Bendifallah for collaboration opportunities, project discussions, or technical consultations."
  },

  // Open Graph images for different sections
  images: {
    default: "/portfolio.png",
    projects: "/esiflow.png",
    about: "/image.png"
  },

  // Technical skills for structured data
  skills: [
    "JavaScript",
    "TypeScript", 
    "Node.js",
    "React",
    "Next.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Git",
    "Docker",
    "AWS",
    "REST APIs",
    "Full Stack Development",
    "Backend Development",
    "Database Design",
    "Web Development"
  ]
}

// Generate JSON-LD structured data
export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": seoConfig.author.name,
  "jobTitle": seoConfig.author.title,
  "description": seoConfig.author.bio,
  "url": seoConfig.siteUrl,
  "email": seoConfig.author.email,
  "sameAs": [
    seoConfig.author.social.github,
    seoConfig.author.social.linkedin
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "ESI (École Supérieure d'Informatique)",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Algeria"
    }
  },
  "knowsAbout": seoConfig.skills,
  "worksFor": {
    "@type": "Organization", 
    "name": "Freelance Developer"
  }
})

// Generate WebSite schema
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": seoConfig.siteName,
  "url": seoConfig.siteUrl,
  "author": {
    "@type": "Person",
    "name": seoConfig.author.name
  },
  "description": seoConfig.descriptions.home,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${seoConfig.siteUrl}#projects`,
    "query-input": "required name=search_term_string"
  }
})
