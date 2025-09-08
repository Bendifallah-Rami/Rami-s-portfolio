import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/home";
import Skills from "./pages/skills";
import Projects from "./pages/project";
import Contact from "./pages/contact";
import About from "./pages/about";
import Slider from "./pages/slide";
import { DarkModeProvider } from "./pages/darkModeContext";
import Experience from "./pages/experiance";
import { useSEO, addStructuredData, preloadResources } from "./hooks/useSEO";
import { seoConfig, generatePersonSchema, generateWebsiteSchema } from "./data/seo";

function App() {
  const [count, setCount] = useState(0);

  // Set up SEO for the main page
  useSEO({
    title: "Full Stack Developer & Backend Specialist",
    description: seoConfig.descriptions.home,
    keywords: ["portfolio", "web developer", "full stack"],
    url: seoConfig.siteUrl
  });

  useEffect(() => {
    // Add structured data for the website
    addStructuredData([
      generatePersonSchema(),
      generateWebsiteSchema()
    ], 'main-structured-data');

    // Preload critical images
    preloadResources([
      { href: "/esiflow.png", as: "image" },
      { href: "/datahack.png", as: "image" },
      { href: "/foodDelivery.png", as: "image" },
      { href: "/portfolio.png", as: "image" },
      { href: "/_6dfb0a40-d7bd-4865-a2b3-38a70db160e2-removebg-preview.png", as: "image" }
    ]);

    // Add lazy loading attribute to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });

    // Add alt attributes to images that don't have them
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach(img => {
      img.setAttribute('alt', 'Portfolio image');
    });

  }, []);

  return (
    <>
      <div className="App dark:bg-black" itemScope itemType="https://schema.org/Person">
        <DarkModeProvider>
          <main role="main">
            <Home />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Slider />
            <Contact />
          </main>
        </DarkModeProvider>
      </div>
    </>
  );
}

export default App;
