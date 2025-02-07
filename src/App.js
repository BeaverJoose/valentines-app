import { useState, useRef, useEffect } from "react";
import React from 'react';
import "./App.css";
import ValentinePage from "./ValentinePage";
import TransitionVideo from "./TransitionVideo";
import FinalPage from "./YayPage";
import poems from "./poems";
import YouTube from 'react-youtube';


function App() {
  const [showValentinePage, setShowValentinePage] = useState(true);
  const [showTransitionVideo, setShowTransitionVideo] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "0px", left: "0px" });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [poemIndex, setPoemIndex] = useState(0);
  const [shuffledPoems, setShuffledPoems] = useState([]);

  const bgMusicRef = useRef(null);
  const heartBurstIntervalRef = useRef(null);

  const handlePlayMusic = () => {
    const music = bgMusicRef.current;
    if (music && !isMusicPlaying) {
      music.volume = 0.1; // Set background music volume to 10%
      music.play().then(() => {
        setIsMusicPlaying(true);
        console.log("Background music started");
      }).catch((error) => {
        console.error("Autoplay blocked:", error);
      });
    }
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.setVolume(20); // Set volume to 20%
    event.target.mute(); // Mute the video initially
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      event.target.unMute(); // Unmute the video when it starts playing
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      event.target.playVideo(); // Ensure the video keeps playing if paused
    }
  };

  useEffect(() => {
    const music = bgMusicRef.current;
    if (music) {
      music.volume = 0.1; // Set background music volume to 10%
      music.muted = true; // Mute the music initially to bypass autoplay restrictions
      const playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          music.muted = false; // Unmute the music after it starts playing
          setIsMusicPlaying(true);
          console.log("Background music started");
        }).catch((error) => {
          console.error("Autoplay blocked:", error);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (showFinalPage) {
      heartBurstIntervalRef.current = setInterval(startHeartBursts, 5000); // Continue heart bursts every 5 seconds
    } else {
      clearInterval(heartBurstIntervalRef.current);
    }

    return () => clearInterval(heartBurstIntervalRef.current);
  }, [showFinalPage]);

  useEffect(() => {
    // Shuffle poems after the first sequence
    if (poemIndex >= poems.length) {
      const shuffled = [...poems].sort(() => Math.random() - 0.5);
      setShuffledPoems(shuffled);
      setPoemIndex(0);
    }
  }, [poemIndex]);

  const getNextPoem = () => {
    if (poemIndex < poems.length) {
      return poems[poemIndex];
    } else {
      return shuffledPoems[poemIndex % poems.length];
    }
  };

  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 200 - 100);
    const randomLeft = Math.floor(Math.random() * 200 - 100);
    setNoButtonPosition({ top: `${randomTop}px`, left: `${randomLeft}px` });
  };

  const handleYesClick = () => {
    setShowValentinePage(false);
    setShowTransitionVideo(true);
    console.log("Transition video started");
  };

  const handleTransitionEnd = () => {
    setShowTransitionVideo(false);
    setShowFinalPage(true);
    console.log("Transition video ended");
    startHeartBursts(); // Start heart bursts when transition ends
    setPoemIndex(poemIndex + 1); // Move to the next poem
  };

  const handleRestart = () => {
    setShowValentinePage(true);
    setShowTransitionVideo(false);
    setShowFinalPage(false);
    setNoButtonPosition({ top: "0px", left: "0px" });
    console.log("Restarted");

    clearInterval(heartBurstIntervalRef.current);
  };

  const startHeartBursts = () => {
    const container = document.querySelector(".app-container");

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "bursting-heart";

        // Random placement around the screen
        const randomTop = Math.random() * 100;
        const randomLeft = Math.random() * 100;

        heart.style.top = `${randomTop}%`;
        heart.style.left = `${randomLeft}%`;

        container.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 2500); // Matches animation duration
      }, Math.random() * 5000); // Spread out bursts over time
    }
  };

  return (
    <div className="app-container" onClick={handlePlayMusic}>
      {/* Pixel Text for Music Instruction */}
      <div className="pixel-text-music top-left" onClick={handlePlayMusic}>Click for music</div>

      {/* 🎵 Background Music */}
      <YouTube
        videoId="6dLWFa0UBiU"
        opts={{
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: '6dLWFa0UBiU',
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange} // Add this line
        className="hidden-video"
      />

      {/* 🌌 Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={`${process.env.PUBLIC_URL}/HowlWall.mp4`} type="video/mp4" />
      Your browser does not support the video element.
      </video>

      {/* Valentine Page */}
      {showValentinePage && (
        <ValentinePage
          onYesClick={handleYesClick}
          noButtonPosition={noButtonPosition}
          moveNoButton={moveNoButton}
        />
      )}

      {/* Transition Video */}
      {showTransitionVideo && (
        <TransitionVideo onTransitionEnd={handleTransitionEnd} />
      )}

      {/* Final Page */}
      {showFinalPage && (
        <FinalPage onRestart={handleRestart} poem={getNextPoem()} />
      )}
    </div>
  );
}

export default App;