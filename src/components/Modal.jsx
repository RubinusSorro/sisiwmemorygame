import './Modal.css';

export default function Modal({
  onClose,
  resetAndStart,
  time,
  gameResult,
  goToModeSelect,
  gameMode,
  children
}) {
  const renderMessage = () => {
    if (gameMode === 'boss') {
      if (gameResult === 'victory') return '🎉 You Defeated Cheater Sisiw!';
      if (gameResult === 'defeat') return '💀 Cheater Sisiw Defeated You!';
    } else {
      if (gameResult === 'win') return '🎉 You Matched All Cards!';
      if (gameResult === 'lose') return '💀 Game Over';
    }
    return '';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children ? (
          <>
            {children}
            <div className="modal-buttons">
              <button onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h2>{renderMessage()}</h2>
            {gameMode !== 'boss' && gameResult === 'win' && (
              <p>Your time: {time} seconds</p>
            )}
            <div className="modal-buttons">
              <button onClick={resetAndStart}>Play Again</button>
              <button onClick={goToModeSelect}>Select Mode</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
