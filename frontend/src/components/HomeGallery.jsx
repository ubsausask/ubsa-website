import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import '../style/HomeGallery.css';

// Local Asset Placeholders
import MockWedding from '../assets/Gallery/MockWeeding.jpg';
import PH1_JPG from '../assets/Gallery/PlaceHolder (1).jpg';
import PH1_PNG from '../assets/Gallery/PlaceHolder (1).png';
import PH2_JPG from '../assets/Gallery/PlaceHolder (2).jpg';
import PH2_PNG from '../assets/Gallery/PlaceHolder (2).png';

const INITIAL_PLACEHOLDERS = [
  { id: 'p1', src: MockWedding, isLocal: true },
  { id: 'p2', src: PH1_JPG, isLocal: true },
  { id: 'p3', src: PH2_JPG, isLocal: true },
  { id: 'p4', src: PH1_PNG, isLocal: true },
  { id: 'p5', src: PH2_PNG, isLocal: true },
];

export default function HomeGallery() {
  const [images, setImages] = useState(INITIAL_PLACEHOLDERS);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  
  // Ref to track the current rotation index
  const rotationRef = useRef(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery/photos')
      .then(res => res.json())
      .then(data => {
        if (data && data.length >= 5) {
          setImages(data);
        }
        setLoading(false);
      })
      .catch(() => {
        // Stay with placeholders if fetch fails
        setLoading(false);
      });
  }, []);

  // Sequential Rotation Logic
  useEffect(() => {
    if (images.length >= 5) {
      const interval = setInterval(() => {
        // STEP 1: Start the CSS animations (Left fades, Middle shrinks, Right grows)
        setIsTransitioning(true);

        // STEP 2: Wait for the animation duration (e.g., 1.2s) before updating the array
        setTimeout(() => {
          setImages((prev) => {
            const updated = [...prev];
            const first = updated.shift();
            updated.push(first);
            return updated;
          });
          // Reset the transition state to prepare for the next cycle
          setIsTransitioning(false);
        }, 1200); 

      }, 4500); // 4.5s cycle: 1.2s movement + 3.3s still time

      return () => clearInterval(interval);
    }
  }, [images.length]);

  const getFullImgPath = (img) => {
    if (img.isLocal) return img.src;
    return img.src.startsWith('http') ? img.src : `http://localhost:5000${img.src}`;
  };

  if (loading && images === INITIAL_PLACEHOLDERS) return null;

  return (
    <section className="home-gallery-section">
      <div className="home-gallery-content">
        <h2 className="home-gallery-title">
          UBSA <span className="highlight">Moments</span>
        </h2>

        <div className={`gallery-flex-container ${isTransitioning ? 'stage-transition' : ''}`}>
          {images.slice(0, 6).map((img, index) => {
            // Logic for "Expanding" and "Shrinking" targets
            // index 2 is currently expanded (3rd photo)
            // index 3 is the one growing into the spot (4th photo)
            let columnClass = "gallery-glass-col";
            if (index === 2) columnClass += " current-active";
            if (index === 3) columnClass += " next-active";
            if (index === 0) columnClass += " exiting-node";
            if (index === 5) columnClass += " entering-node";

            return (
              <div 
                key={`${img.id}-${index}`} 
                className={columnClass} 
                style={{ backgroundImage: `url(${getFullImgPath(img)})` }}
                onClick={() => navigate('/gallery')}
              >
                <div className="glass-inner-overlay"></div>
              </div>
            );
          })}
        </div>

        <div className="gallery-btn-container">
          <button className="view-gallery-btn" onClick={() => navigate('/gallery')}>
            Explore Gallery <FaArrowRight style={{ marginLeft: '12px' }} />
          </button>
        </div>
      </div>
    </section>
  );
}