import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../style/Gallery.css';
import galleryBg from '../assets/HomeGalleryBG.jpg';
import GalleryVideo from '../components/gallery/GalleryVideo';

// Local Placeholders imports
import MockWedding from '../assets/Gallery/MockWeeding.jpg';
import Meeting1 from '../assets/Gallery/IMG-20250923-WA0016.jpg';
import Meeting2 from '../assets/Gallery/IMG-20250923-WA0018.jpg';
import Meeting3 from '../assets/Gallery/IMG-20250923-WA0019.jpg';
import PH1 from '../assets/Gallery/PlaceHolder (1).jpg';
import PH2 from '../assets/Gallery/PlaceHolder (2).jpg';

const MOCK_GALLERY = [
  { id: 'm1', src: MockWedding, caption: 'Mock Wedding 2025', category: 'Events', isLocal: true },
  { id: 'm2', src: Meeting1, caption: 'Community Meetup', category: 'Community', isLocal: true },
  { id: 'm3', src: Meeting2, caption: 'UBSA Discussion', category: 'Community', isLocal: true },
  { id: 'm4', src: Meeting3, caption: 'Planning Session', category: 'Events', isLocal: true },
  { id: 'm5', src: PH1, caption: 'Bengali Festival', category: 'Festivals', isLocal: true },
  { id: 'm6', src: PH2, caption: 'Cricket Tournament', category: 'Sports', isLocal: true },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [showGrid, setShowGrid] = useState(false);
  
  const gridRef = useRef(null);
  const categories = ['All', 'Festivals', 'Community', 'Sports', 'Events'];

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery/photos')
      .then(res => res.json())
      .then(data => {
        const finalData = (data && data.length > 0) ? data : MOCK_GALLERY;
        setImages(finalData);
        setLoading(false);
      })
      .catch(() => {
        setImages(MOCK_GALLERY);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = category === 'All' 
      ? images 
      : images.filter(img => img.category === category);
    setDisplayImages(filtered);
  }, [category, images]);

  const getFullImgPath = (img) => {
    if (img.isLocal) return img.src;
    return img.src.startsWith('http') ? img.src : `http://localhost:5000${img.src}`;
  };

  const moveNext = () => {
    setDisplayImages(prev => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  const movePrev = () => {
    setDisplayImages(prev => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      const last = updated.pop();
      updated.unshift(last);
      return updated;
    });
  };

  useEffect(() => {
    if (displayImages.length < 2) return;
    const timer = setInterval(moveNext, 5000);
    return () => clearInterval(timer);
  }, [displayImages]);

  const handleGridToggle = () => {
    if (showGrid) {
      setShowGrid(false);
    } else {
      setShowGrid(true);
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  return (
    <div className="gallery-page" style={{ '--gallery-bg': `url(${galleryBg})` }}>
      {/* HEADER SECTION - UPDATED FOR SINGLE LINE ALIGNMENT */}
      <div className="gallery-header">
        <h1 className="page-title">
          Moments of <span className="text-highlight">Joy</span>
        </h1>
      </div>

      <div className="gallery-filter">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn-glass ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="carousel-view-section">
        <div className="carousel-container">
          {loading ? (
            <p className="status-text">Loading community moments...</p>
          ) : (
            <div className="carousel-track">
              <button className="nav-btn-glass left" onClick={movePrev}><FaChevronLeft /></button>
              <div className="slider-wrapper">
                {displayImages.map((img, index) => {
                  let position = "hidden";
                  if (index === 0) position = "center";
                  else if (index === 1) position = "right-1";
                  else if (index === 2) position = "right-2";
                  else if (index === displayImages.length - 1) position = "left-1";
                  else if (index === displayImages.length - 2) position = "left-2";

                  return (
                    <div key={`${img.id}-${index}`} className={`carousel-card ${position}`}>
                      <img src={getFullImgPath(img)} alt={img.caption} />
                      {position === "center" && (
                        <div className="carousel-info-overlay">
                          <h3>{img.caption}</h3>
                          <p>{img.category}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="nav-btn-glass right" onClick={moveNext}><FaChevronRight /></button>
            </div>
          )}
        </div>

        <div className="scroll-indicator-wrapper">
            <div className="grid-toggle-glass" onClick={handleGridToggle}>
              <span>{showGrid ? "Hide Photo Grid" : "Explore Photo Grid"}</span>
              {showGrid ? <FaChevronUp className="bounce-arrow" /> : <FaChevronDown className="bounce-arrow" />}
            </div>
        </div>
      </div>

      <hr className="section-divider" />
      
      <GalleryVideo />

      {showGrid && (
        <div className="gallery-grid-section" ref={gridRef}>
          <div className="grid-header-line">
            <span>Full Photo Collection</span>
          </div>
          <div className="gallery-grid">
            {displayImages.map((img) => (
              <div key={img.id} className="grid-item">
                <img src={getFullImgPath(img)} alt={img.caption} loading="lazy" />
                <div className="grid-overlay">
                  <p>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}