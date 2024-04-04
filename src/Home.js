import React from 'react';
import './Home.css'; // This will be your CSS file for styling
import CloudImage from './img/cloud.jpg'; // Import the image file
import tshirtVideo from './video/tshirt.mp4'; // Import the video file
import denimVideo from './video/denim.mp4'; // Import denim video file
import jacketVideo from './video/jacket.mp4'; // Import jacket video file
import trackVideo from './video/track.mp4'; // Import track video file

const Home = () => {
  return (
    <div className="home">
      <div className="img-container">
        {/* Use the imported image directly */}
        <img src={CloudImage} alt="Cloud" />
        <div className="overlay-text">BLO</div>
        <button className="collection-button">Collection</button>
        <div className="quote">“MADE BY CREATIVE MINDS”</div>
        <div className="credit">FOR</div>
        <div className="cred">“UNIQUE INDIVIDUALS”</div>
      </div>
      
      <div className="video-row">
        <a href="/product" className="video-link">
          <div className="video">
            <video autoPlay loop muted className="fit-video" width="560" height="315">
              <source src={tshirtVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </a>
        <a href="/product" className="video-link">
          <div className="video">
            <video autoPlay loop muted className="fit-video" width="560" height="315">
              <source src={denimVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </a>
      </div>

      <div className="video-row">
        <a href="/product" className="video-link">
          <div className="video">
            <video autoPlay loop muted className="fit-video" width="560" height="315">
              <source src={jacketVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </a>
        <a href="/product" className="video-link">
          <div className="video">
            <video autoPlay loop muted className="fit-video" width="560" height="315">
              <source src={trackVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;


