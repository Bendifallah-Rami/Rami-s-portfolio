import React from 'react';

const ScrollingBanner = () => {

  const scrollingLines = [
    {
      content: [
        "full-stack development",
        "modern web solutions", 
        "scalable applications",
        "user-centered design"
      ],
      direction: "left",
      speed: "25s",
      size: "text-3xl md:text-5xl lg:text-7xl",
      delay: "0s"
    },
    {
      content: [
        "react & node.js expert",
        "javascript",
        "python", 
        "mongodb",
        "postgresql",
        "docker",
        "aws",
        "next.js"
      ],
      direction: "right",
      speed: "30s",
      size: "text-2xl md:text-4xl lg:text-6xl",
      delay: "0s"
    }
  ];

  const ScrollingLine = ({ content, direction, speed, size, delay, index }) => {
    const animationClass = direction === 'left' 
      ? 'animate-scroll-left' 
      : 'animate-scroll-right';

    return (
      <div 
        className={`absolute w-full overflow-hidden whitespace-nowrap ${
          index === 0 ? 'top-[35%]' : 'top-[65%]'
        }`}
      >
        <div 
          className={`inline-block font-bold text-white lowercase tracking-tight leading-none ${size} ${animationClass} hover:animation-pause`}
          style={{
            animationDuration: speed,
            animationDelay: delay
          }}
        >
          {content.map((text, idx) => (
            <span key={idx} className="mx-8">
              <span className="text-white">{text}</span>
              {idx < content.length - 1 && (
                <span className="text-white/70 mx-8">•</span>
              )}
            </span>
          ))}
          <span className="text-white/70 mx-8">•</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-56 bg-neutral-950 overflow-hidden relative flex items-center mt-11 dark:border-1 border-t-white border-b-white" id='contact'>
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        .hover\\:animation-pause:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .top-\\[35\\%\\] { top: 30%; }
          .top-\\[65\\%\\] { top: 70%; }
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full">
        {scrollingLines.map((line, index) => (
          <ScrollingLine
            key={index}
            content={line.content}
            direction={line.direction}
            speed={line.speed}
            size={line.size}
            delay={line.delay}
            index={index}
          />
        ))}
      </div>

      {/* Optional: Add a subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>
      
      {/* Optional: Add a centered logo or name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white/5 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider">
          Rami
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;