import React from 'react';
import './ModeSelect.css';

export default function ModeSelect({ setGameMode, startGame, setShowMainMenu }) {
  const handleModeSelect = (mode) => {
    setGameMode(mode);
    startGame(mode);
  };

  return (
    <div className="mode-select">
      <h1>Select Game Mode</h1>

      <div className="mode-buttons">
        {['classic', 'timed', 'limited', 'boss'].map((mode) => (
          <button key={mode} onClick={() => handleModeSelect(mode)}>
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <button className="return-main" onClick={() => setShowMainMenu(true)}>
        Return to Main Menu
      </button>
    </div>
  );
}
