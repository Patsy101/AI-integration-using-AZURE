import React, { useState, useEffect } from "react";
import "./VideoPlayer.css";

import CarRev from "./videos/CarRev.mp4";
import SteeringWheel from "./videos/SteeringWheel.mp4";
import TeslaUpClose from "./videos/TeslaUpClose.mp4";
import toyotaPriusDriveBy from "./videos/toyotaPriusDriveBy.mp4";

const BackgroundVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prevVideo) => (prevVideo + 1) % 4);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video-container">
      {[CarRev, SteeringWheel, TeslaUpClose, toyotaPriusDriveBy].map(
        (src, index) => (
          <video
            key={index}
            className={`video ${currentVideo === index ? "active" : ""}`}
            autoPlay="autoplay"
            loop="loop"
            muted
          >
            <source src={src} type="video/mp4" />
          </video>
        )
      )}
      <div className="content">
        <h1>Turners</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
