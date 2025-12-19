#!/bin/bash

# 1. Create Project Root
echo "🚀 Initializing UBSA React Project..."
mkdir -p ubsa-react
cd ubsa-react

# 2. Create React Standard Directory Structure
mkdir -p public/tiger-frames
mkdir -p src/assets/styles
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/hooks

# --- 3. CREATE STYLES ---

# Global CSS (Variables & Reset)
cat <<EOF > src/assets/styles/global.css
:root {
  --bd-green: #006a4e;
  --bd-red: #f42a41;
  --dark-bg: #0b1210;
  --card-bg: #141f1c;
  --text-main: #ffffff;
  --text-muted: #aebdb8;
  --font-head: 'Merriweather', serif;
  --font-body: 'Inter', sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--dark-bg);
  color: var(--text-main);
  font-family: var(--font-body);
  overflow-x: hidden;
}

a { text-decoration: none; color: inherit; }
ul { list-style: none; }
EOF

# Navbar CSS
cat <<EOF > src/components/Navbar.css
.ubsa-header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(11,18,16,0.95), transparent);
}
.logo-main { font-family: var(--font-head); font-weight: 900; font-size: 1.5rem; color: var(--bd-red); }
.logo-sub { display: block; font-size: 0.75rem; letter-spacing: 1px; color: var(--text-main); text-transform: uppercase; }
.nav-list { display: flex; gap: 2rem; align-items: center; }
.nav-link { font-weight: 500; transition: color 0.3s; }
.nav-link:hover { color: var(--bd-red); }
.btn-join { background-color: var(--bd-green); padding: 0.6rem 1.2rem; border-radius: 4px; }
EOF

# Contest Page CSS
cat <<EOF > src/pages/Contest.css
.content-wrapper { padding: 8rem 2rem 4rem; max-width: 1200px; margin: 0 auto; }
.contest-header { text-align: center; margin-bottom: 4rem; }
.badge { background: rgba(0, 106, 78, 0.2); color: var(--bd-green); padding: 5px 10px; border-radius: 20px; font-weight: 600; }
.grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.info-card { background: var(--card-bg); padding: 2rem; border-radius: 8px; border-left: 4px solid var(--bd-green); }
.prize-section { margin-top: 4rem; background: linear-gradient(135deg, var(--bd-green), #004d38); padding: 3rem; border-radius: 12px; text-align: center; }
.prize-amount { font-size: 3.5rem; font-weight: 900; }
EOF

# Tiger Hero CSS
cat <<EOF > src/components/TigerHero.css
.scroll-track { height: 300vh; position: relative; }
.sticky-container { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; }
canvas { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100vw; min-height: 100vh; z-index: 1; }
.hero-overlay { position: absolute; z-index: 10; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; background: radial-gradient(circle at center, transparent 0%, var(--dark-bg) 90%); }
.hero-title { font-family: var(--font-head); font-size: 4rem; line-height: 1.1; }
EOF


# --- 4. CREATE COMPONENTS ---

# Navbar Component
cat <<EOF > src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="ubsa-header">
      <div className="logo-container">
        <Link to="/" className="logo-text">
          <span className="logo-main">UBSA</span>
          <span className="logo-sub">University of Saskatchewan</span>
        </Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/contest" className="nav-link">Design Contest</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><a href="mailto:ubsa.usask@gmail.com" className="btn-join">Join UBSA</a></li>
        </ul>
      </nav>
    </header>
  );
}
EOF

# Footer Component
cat <<EOF > src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem', textAlign: 'center', borderTop: '1px solid #222', marginTop: 'auto' }}>
      <p style={{ color: '#444' }}>&copy; 2025 Undergraduate Bangladeshi Student Association (UBSA).</p>
    </footer>
  );
}
EOF

# TigerHero Component (The Animation Logic)
cat <<EOF > src/components/TigerHero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TigerHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function TigerHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const frameCount = 145;
    
    // NOTE: In React/Vite, we reference files in 'public' with a root path /
    const currentFrame = index => 
      \`/tiger-frames/tiger_\${(index + 1).toString().padStart(4, '0')}.jpg\`;

    const images = [];
    const tiger = { frame: 0 };

    // Preload Images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    canvas.width = 1920;
    canvas.height = 1080;

    // GSAP Animation
    let ctx = gsap.context(() => {
      gsap.to(tiger, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const img = images[tiger.frame];
          if (img && img.complete) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      });
      
      // Initial Render
      images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    }, containerRef); // Scope GSAP to this component

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="scroll-track" ref={containerRef}>
      <div className="sticky-container">
        <div className="hero-overlay">
          <div>
            <h1 className="hero-title">The Spirit of Bengal<br />in Saskatchewan.</h1>
            <p style={{ marginTop: '1rem', color: '#aebdb8' }}>Uniting students, celebrating culture.</p>
          </div>
        </div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
EOF


# --- 5. CREATE PAGES ---

# Home Page
cat <<EOF > src/pages/Home.jsx
import React from 'react';
import TigerHero from '../components/TigerHero';

export default function Home() {
  return (
    <>
      <TigerHero />
      <div style={{ padding: '4rem', textAlign: 'center', background: '#0b1210' }}>
        <h2>Welcome to UBSA</h2>
        <p>Scroll up to see the spirit of our community.</p>
        <p>Check out the <a href="/contest" style={{ color: '#f42a41' }}>Design Contest</a> page.</p>
      </div>
    </>
  );
}
EOF

# Contest Page
cat <<EOF > src/pages/Contest.jsx
import React from 'react';
import './Contest.css';

export default function Contest() {
  return (
    <div className="content-wrapper">
      <div className="contest-header">
        <span className="badge">Official Announcement</span>
        <h1 style={{ fontSize: '3rem', marginTop: '1rem' }}>Design UBSA’s Digital Home</h1>
        <p style={{ color: '#aebdb8', fontSize: '1.2rem' }}>
          We are launching a contest to create a modern website that celebrates our identity.
        </p>
      </div>

      <div className="grid-cards">
        <div className="info-card">
          <h3>💻 Allowed Formats</h3>
          <ul>
            <li>HTML / CSS / JS</li>
            <li>React / Vue / Next.js</li>
            <li>Figma / Adobe XD</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>🎨 Design Guidelines</h3>
          <ul>
            <li>Theme: Bangladeshi Culture</li>
            <li>Colors: Green (#006a4e) & Red</li>
            <li>Mobile Responsive</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>📑 Required Pages</h3>
          <ul>
            <li>Home & About Us</li>
            <li>Events & Gallery</li>
            <li>Executive Committee</li>
          </ul>
        </div>
      </div>

      <div className="prize-section">
        <h3>The Reward</h3>
        <div className="prize-amount">$100 CAD</div>
        <p>+ Certificate of Recognition</p>
        <a href="mailto:ubsa.usask@gmail.com" className="btn-join" style={{ background: 'white', color: '#006a4e', display: 'inline-block', marginTop: '1rem', fontWeight: 'bold' }}>
          Submit Design
        </a>
      </div>
    </div>
  );
}
EOF


# --- 6. ENTRY POINT & APP ---

# App.jsx (Routing Logic)
cat <<EOF > src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contest from './pages/Contest';
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/about" element={<div style={{padding:'8rem', textAlign:'center'}}><h1>About Us</h1><p>Coming Soon...</p></div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
EOF

# main.jsx
cat <<EOF > src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# index.html (Vite entry)
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UBSA | University of Saskatchewan</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Merriweather:wght@700;900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# Package.json (Dependencies)
cat <<EOF > package.json
{
  "name": "ubsa-react",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5"
  }
}
EOF

# Vite Config
cat <<EOF > vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
EOF

echo "✅ Project Structure Created!"
echo "👉 NEXT STEPS:"
echo "1. Run: cp -r ../tiger-frames/* public/tiger-frames/"
echo "2. Run: npm install"
echo "3. Run: npm run dev"