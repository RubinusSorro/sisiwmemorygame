import React, { useEffect, useRef } from 'react';
import backcover from '../assets/backcover.png';
import clickSound from '../assets/clicksound.wav';
import './SingleCard.css';
import cursedIcon from '../assets/cursedsisiw.png';

export default function SingleCard({ card, handleChoice, flipped, disabled, cheatAnimate, isCursed }) {
  const cardRef = useRef();

  useEffect(() => {
    if (cheatAnimate && cardRef.current) {
      cardRef.current.classList.add('cheat-animate');
      const timeout = setTimeout(() => {
        cardRef.current.classList.remove('cheat-animate');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [cheatAnimate]);

  const handleClick = () => {
    if (!flipped && !disabled) {
      // Play click sound
      const audio = new window.Audio(clickSound);
      audio.currentTime = 0;
      audio.play();
      handleChoice(card);
    }
  };

  return (
    <div className={`card${isCursed ? ' cursed-glow' : ''}`} ref={cardRef}>
      {isCursed && (
        <div className="cursed-indicator">
          <img src={cursedIcon} alt="Cursed" title="Cursed!" />
        </div>
      )}
      <div className={`card-inner ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
        <img className="front" src={backcover} alt="sisiw back" />
        <img className="back" src={card.src} alt="card front" />
      </div>
    </div>
  );
}
