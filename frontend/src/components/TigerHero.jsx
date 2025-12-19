import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../style/TigerHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function TigerHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // --- CONFIGURATION ---
    const frameCount = 91; 
    
    // Helper to generate paths
    const currentFrame = index => 
      `/tiger-frames/tiger_${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images = [];
    const tiger = { frame: 0 };

    // 1. Preload Images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Canvas settings
    canvas.width = 1920;
    canvas.height = 1080;

    // Helper to render
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Ensure the image exists and is loaded before drawing
      const img = images[tiger.frame];
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    let ctx = gsap.context(() => {
      
      // 2. SCROLL ANIMATION
      gsap.to(tiger, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Lowered slightly for more responsiveness
        },
        onUpdate: render
      });

      // 3. TEXT FADE OUT
      gsap.to(".hero-overlay", {
        opacity: 0,
        y: -50,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "15% top", 
          scrub: true,
        }
      });
      
      // 4. INITIAL RENDER (Fixes blank canvas on load)
      if (images[0].complete) {
        render();
      } else {
        images[0].onload = render;
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-track" ref={containerRef}>
      <div className="sticky-container">
        
        {/* Text Overlay */}
        <div className="hero-overlay">
          <div>
            <h1 className="hero-title">The Spirit of Bengal<br />in Saskatchewan.</h1>
            <p className="hero-subtitle">
              Uniting students, celebrating culture.
            </p>
            <div className="scroll-indicator">
              SCROLL TO EXPLORE ↓
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}