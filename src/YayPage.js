import React, { useEffect, useRef, useState } from 'react';
import Confetti from "react-confetti";
import PixelHeart from "./pics/pixel-heart.png"; // Importing the image directly
import poems from "./poems"; // Import poems from the new file

const FinalPage = ({ onRestart }) => {
  const howlsVideoRef = useRef(null);
  const [poem, setPoem] = useState(poems[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (howlsVideoRef.current) {
      howlsVideoRef.current.play();
    }
  }, []);

  const refreshPoem = () => {
    setFade(true);
    setTimeout(() => {
      const randomPoem = poems[Math.floor(Math.random() * poems.length)];
      setPoem(randomPoem);
      setFade(false);
    }, 500); // Adjust the duration to match the fade-out animation
  };

  return (
    <>
      <div className="cinema-overlay"></div> {/* 🔥 Dark Overlay */}
      <Confetti numberOfPieces={200} gravity={0.005} /> {/* Adjust gravity to make confetti fall slower */}
      <div className="falling-hearts-container"></div>
      <div className="image-container fade-in final-image-container">
        <img
          src={PixelHeart}
          alt="Pixel Heart"
          className="pixel-image"
          onClick={refreshPoem} // Add onClick event to refresh poem
        />
      </div>
      <p className={`pixel-text fade-in final-text ${fade ? 'fade-out' : 'fade-in'}`} dangerouslySetInnerHTML={{ __html: poem }}></p>
      <div className="button-container fade-in final-button-container">
        <button className="restart-button final-restart-button" onClick={onRestart}>Restart</button>
      </div>
    </>
  );
};

export default FinalPage;