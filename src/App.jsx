import { useState } from "react";
import "./App.css";

import Home from "./pages/home";
import Skills from "./pages/skills";
import Projects from "./pages/project";
import Contact from "./pages/contact";
import About from "./pages/about";
import Slider from "./pages/slide";
import { DarkModeProvider } from "./pages/darkModeContext";
import Experience from "./pages/experiance";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <div className="App dark:bg-black">
        
        <DarkModeProvider>
          <Home />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Slider />
          <Contact />
        </DarkModeProvider>
      </div>
    </>
  );
}

export default App;
