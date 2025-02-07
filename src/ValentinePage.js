import React, { useRef, useState, useEffect } from 'react';
import PixelAsk from "./pics/pixel-ask.png"; // Default ask image

const ValentinePage = ({ onYesClick, moveNoButton }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencilMode, setPencilMode] = useState(false);
  const initialNoButtonPosition = { left: '0px', top: '0px' }; // Initial position next to the yes button
  const [noButtonPosition, setNoButtonPosition] = useState(initialNoButtonPosition);

  useEffect(() => {
    setNoButtonPosition(initialNoButtonPosition); // Reset position on every refresh
  }, []);

  const startDrawing = (e) => {
    if (!pencilMode) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !pencilMode) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!pencilMode) return;
    setIsDrawing(false);
  };

  const togglePencilMode = () => {
    setPencilMode(!pencilMode);
  };

  return (
    <div className={`valentine-page ${pencilMode ? 'pencil-enabled' : ''}`}>
      <video autoPlay loop muted className="background-video">
        <source src={`${process.env.PUBLIC_URL}/HowlWall.mp4`} type="video/mp4" />
      </video>
      <div className="image-container">
        <img
          src={PixelAsk}
          alt="Pixel Ask"
          className="pixel-image"
        />
      </div>
      <p className="pixel-text">
        Avalon<br />
        Will you be my Valentine?
      </p>
      <div className="button-container">
        <button className="yes-button" onClick={onYesClick}>Yes 🥰</button>
        <button
          className="no-button"
          style={{ transform: `translate(${noButtonPosition.left}, ${noButtonPosition.top})` }}
          onMouseEnter={() => {
            moveNoButton();
            setNoButtonPosition({ left: `${Math.random() * 300}px`, top: `${Math.random() * 300}px` }); // Increase movement range
          }}
        >
          No 😢
        </button>
      </div>
      <button className="pencil-button" onClick={togglePencilMode}>
        {pencilMode ? 'Disable Pencil' : 'Enable Pencil'}
      </button>
      <canvas
        ref={canvasRef}
        className="scribble-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default ValentinePage;