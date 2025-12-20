import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/HomeGallery.css';

export default function HomeGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch real photos from your backend
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => {
        // 2. Only show the newest 5 photos on the homepage
        // The backend sorts by date DESC, so taking the first 5 gives us the newest.
        const recentPhotos = data.slice(0, 5);
        setImages(recentPhotos);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching homepage gallery:", err);
        setLoading(false);
      });
  }, []);

  // Optional: Simple Loading State
  if (loading) return null;

  // 3. Handle Empty State (No uploads yet)
  if (images.length === 0) {
    return (
      <section className="home-gallery-section">
        <h2 className="home-gallery-title">Photo Gallery Highlights</h2>
        <div style={{ padding: '3rem', color: '#ccc', fontStyle: 'italic' }}>
          <p>No photos uploaded yet. Check back soon!</p>
        </div>
        {/* Still show the button so users can go to the full gallery page */}
        <div className="gallery-btn-container">
            <Link to="/gallery" className="view-gallery-btn">
              See All Photos →
            </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="home-gallery-section">
      
      {/* Title */}
      <h2 className="home-gallery-title">Photo Gallery Highlights</h2>

      {/* Dynamic Glass Columns */}
      <div className="gallery-flex-container">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="gallery-glass-col" 
            style={{ '--bg-img': `url(${img.src})` }}
          >
            {/* Optional: Content inside the column (e.g. caption on hover) */}
            <div className="col-content">
               {/* <p>{img.caption}</p> */} 
            </div>
          </div>
        ))}
      </div>

      {/* "See All" Red Glass Button */}
      <div className="gallery-btn-container">
        <Link to="/gallery" className="view-gallery-btn">
          See All Photos →
        </Link>
      </div>

    </section>
  );
}