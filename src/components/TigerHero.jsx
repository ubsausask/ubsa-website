import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../style/TigerHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function TigerHero() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null); // The ScrollTrigger wrapper
  const innerRef = useRef(null);   // The element getting pinned

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // --- CONFIGURATION ---
    const frameCount = 91; 
    const currentFrame = (index) =>
      `${import.meta.env.BASE_URL}tiger-frames/tiger_${(index + 1)
        .toString()
        .padStart(4, '0')}.jpg`;

    const images = [];
    const tigerState = { frame: 0 };
    const visuals = { blur: 10, brightness: 0.6 }; 

    // Preload
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    canvas.width = 1920;
    canvas.height = 1080;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Apply filters via JS for smoothness
      context.filter = `blur(${visuals.blur}px) brightness(${visuals.brightness})`;
      const img = images[tigerState.frame];
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    let ctx = gsap.context(() => {
      
      // 1. PINNING BEHAVIOR
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=300%", 
        pin: innerRef.current,
        scrub: true,
      });

      // 2. ANIMATION TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=400%", 
          scrub: 0.5,
        }
      });

      // --- A. TIGER FRAMES ---
      tl.to(tigerState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 10,
        onUpdate: render 
      }, 0);

      // --- B. CLEAR BLUR ---
      tl.to(visuals, {
        blur: 0,
        brightness: 1.0,
        duration: 3, 
        ease: "power1.out",
        onUpdate: render 
      }, 0);

      // --- C. TEXT ANIMATION ---
      // 1. Fade out surrounding text
      tl.to(".fade-part, .hero-subtitle, .scroll-indicator", { 
        opacity: 0, 
        scale: 1.1, 
        duration: 2, 
        ease: "power2.in"
      }, 0);

      // 2. Grow UBSA (Now targeting the SVG class)
      tl.to(".text-ubsa-svg", { 
        scale: 15,        
        duration: 2,      
        ease: "power2.inOut"
      }, 0);

      // 3. Infinite Zoom & Fade Out UBSA
      tl.to(".text-ubsa-svg", {
        scale: 150, // Massive zoom (clean because it's SVG)
        opacity: 0,     
        duration: 3,
        ease: "power1.in"
      }, 2); 

      // Initial Render
      if (images[0].complete) render();
      else images[0].onload = render;

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="tiger-hero-wrapper" ref={wrapperRef}>
      <div className="hero-inner" ref={innerRef}>
        
        <div className="hero-overlay">
          <h1 className="hero-title">
            <span className="fade-part">The Spirit of</span>
            
            {/* --- FIX: REPLACED SPAN WITH SVG FOR HD ZOOM --- */}
            <div className="ubsa-wrapper">
              <svg className="text-ubsa-svg" viewBox="0 0 400 120">
                <text x="50%" y="50%">UBSA</text>
              </svg>
            </div>

            <span className="fade-part">in CANADA.</span>
          </h1>
          
          <p className="hero-subtitle">
            Uniting students, celebrating culture.
          </p>
          
          <div className="scroll-indicator">
            SCROLL TO EXPLORE ↓
          </div>
        </div>

        <canvas ref={canvasRef} />
        <div className="bottom-fade"></div>
      </div>
    </div>
  );
}