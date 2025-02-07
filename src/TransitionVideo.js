import React, { useEffect, useRef } from 'react';

const TransitionVideo = ({ onTransitionEnd }) => {
  const transitionVideoRef = useRef(null);
  const transitionStartTime = 6; // Start time in seconds
  const transitionEndTime = 11; // End time in seconds

  useEffect(() => {
    if (transitionVideoRef.current) {
      const video = transitionVideoRef.current;
      video.currentTime = transitionStartTime;
      video.volume = 0; // Mute transition video

      const handleTimeUpdate = () => {
        if (video.currentTime >= transitionEndTime - 1) { // Start fade-out 1 second before the end
          video.classList.add("fade-out");
        }
        if (video.currentTime >= transitionEndTime) {
          video.pause();
          onTransitionEnd();
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [onTransitionEnd]);

  return (
    <div className="video-container fade-in">
      <video autoPlay playsInline muted className="transition-video" ref={transitionVideoRef}>
        <source src={`${process.env.PUBLIC_URL}/HowlMontage.mp4`} type="video/mp4" /> {/* Update this line */}
      </video>
      <div className="falling-hearts-container"></div> {/* 💖 Hearts during transition */}
    </div>
  );
};

export default TransitionVideo;