import React from 'react';
import './Home.css'; // This will be your CSS file for styling

const Home = () => {
  return (
    <div className="home">
      <div className="video-container">
        {/* This is where you'd embed a YouTube video, but it will be non-clickable */}
        <iframe
          title="YouTube video"
          src="https://www.youtube.com/embed/JUodmkXP41s?autoplay=1&controls=0&showinfo=0&loop=1&mute=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="black-line"></div>
      </div>
      
      <div className="image-container">
        <div className="left-images">
          <img src="https://picsum.photos/seed/picsum/300/200" alt="Description" />
          <img src="https://picsum.photos/seed/picsum/300/200" alt="Description" />
        </div>
        <div className="right-image">
          <img src="https://picsum.photos/seed/picsum/300/400" alt="Description" />
        </div>
      </div>
    </div>
  );
};

export default Home;
