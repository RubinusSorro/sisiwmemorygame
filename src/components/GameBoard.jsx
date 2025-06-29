import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import './GameBoard.css';
import PowerCardZone from './PowerCardZone';
import strikerIcon from '../assets/strikersisiw.png';
import blockerIcon from '../assets/defendersisiw.png';
import healerIcon from '../assets/healersisiw.png';
import luckyIcon from '../assets/luckysisiw.png';
import scannerIcon from '../assets/scannersisiw.png';
import reviverIcon from '../assets/reviversisiw.png';

export default function GameBoard({
  cards,
  handleChoice,
  choiceOne,
  choiceTwo,
  disabled,
  turns,
  seconds,
  gameMode,
  goToModeSelect,
  showAll,
  usePeek,
  peekUsed,
  cheaterProgress,
  cheaterSisiw,
  playerHealth,
  powerCards,
  onUsePowerCard,
  bossChoiceOne,
  bossChoiceTwo,
  showBossTurn,
  chosenCompanions = [],
  resetAndStart,
  cheatAnimateCards = [],
  powerEffect = null,
  showPreview = false,
  cursedCard = null,
}) {
  const remainingHealth = 100 - cheaterProgress;

  // --- Orientation Overlay Logic ---
  const [showRotate, setShowRotate] = useState(false);
  useEffect(() => {
    function checkOrientation() {
      if (window.innerWidth < 700 && window.innerHeight > window.innerWidth) {
        setShowRotate(true);
      } else {
        setShowRotate(false);
      }
    }
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Helper to get icon and label for each power
  const getPowerEffectIcon = (effect) => {
    switch (effect) {
      case 'striker':
        return { icon: strikerIcon, label: 'Striker!' };
      case 'blocker':
        return { icon: blockerIcon, label: 'Blocker!' };
      case 'healer':
        return { icon: healerIcon, label: 'Healer!' };
      case 'lucky':
        return { icon: luckyIcon, label: 'Lucky!' };
      case 'scanner':
        return { icon: scannerIcon, label: 'Scanner!' };
      case 'reviver':
        return { icon: reviverIcon, label: 'Reviver!' };
      default:
        return null;
    }
  };
  const effect = getPowerEffectIcon(powerEffect);

  return (
    <div className="game-board">
      {showRotate && (
        <div className="rotate-overlay">
          <div className="rotate-message">
            <span style={{fontSize: '2.2rem', fontWeight: 'bold'}}>🔄 Please rotate your device</span>
            <br />
            <span style={{fontSize: '1.2rem'}}>This game is best played in landscape mode.</span>
          </div>
        </div>
      )}

      {/* Show power effect icon if active */}
      {effect && (
        <div className="power-effect-popup">
          <img src={effect.icon} alt={effect.label} className="power-effect-icon" />
          <span className="power-effect-label">{effect.label}</span>
        </div>
      )}

      <h1>Sisiw Memory Game</h1>
      <p>Mode: {gameMode}</p>

      <div className="button-group">
        <button className="reset-button" onClick={resetAndStart}>Reset</button>
        <button className="return-button" onClick={goToModeSelect}>Return</button>
      </div>

      {/* Card preview overlay */}
      {showPreview && (
        <div className="preview-overlay">
          <span>Memorize the cards!</span>
        </div>
      )}

      {/* Boss Mode UI */}
      {gameMode === 'boss' && (
        <div className="cheater-container">
          <div className="cheater-card">
            <img src={cheaterSisiw} alt="Cheater Sisiw" className="cheater-img" />
          </div>
          <div className="cheater-bar">
            <div
              className={`cheater-fill ${
                remainingHealth <= 20
                  ? 'low'
                  : remainingHealth <= 50
                  ? 'critical'
                  : 'healthy'
              }`}
              style={{ width: `${remainingHealth}%` }}
            ></div>
          </div>
          <p>Cheater Sisiw Health: {remainingHealth}%</p>

          {showBossTurn && (
            <div className="boss-turn-flip">
              <p>👿 Cheater Sisiw is choosing cards...</p>
              <div className="card-grid boss-mode">
                {bossChoiceOne && (
                  <SingleCard
                    key={bossChoiceOne.id + '-boss1'}
                    card={bossChoiceOne}
                    flipped={true}
                    disabled={true}
                  />
                )}
                {bossChoiceTwo && (
                  <SingleCard
                    key={bossChoiceTwo.id + '-boss2'}
                    card={bossChoiceTwo}
                    flipped={true}
                    disabled={true}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="card-grid">
        {cards.map((card, idx) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              showAll
            }
            disabled={disabled}
            cheatAnimate={cheatAnimateCards.includes(card.id)}
            isCursed={cursedCard && card.id === cursedCard.id}
          />
        ))}
      </div>

      {/* Player Health and Power Cards */}
      {gameMode === 'boss' && (
        <div className="player-health-and-power">
          <div className="player-health-container">
            <div className="player-health-bar">
              <div
                className={`player-health-fill ${playerHealth <= 30 ? 'low' : ''}`}
                style={{ width: `${playerHealth}%` }}
              ></div>
            </div>
            <p>Player Health: {playerHealth}%</p>
          </div>

          <PowerCardZone
            companions={chosenCompanions}
            onUseStriker={() => onUsePowerCard('striker')}
            onUseDefender={() => onUsePowerCard('blocker')}
            onUseHealer={() => onUsePowerCard('healer')}
            onUseLucky={() => onUsePowerCard('lucky')}
            onUseScanner={() => onUsePowerCard('scanner')}
            onUseReviver={() => onUsePowerCard('reviver')}
            onUseICT={() => onUsePowerCard('ict')}
            onUseCharm={() => onUsePowerCard('charm')}
            onUseCursed={() => onUsePowerCard('cursed')}
            usedStriker={powerCards.striker}
            usedDefender={powerCards.blocker}
            usedHealer={powerCards.healer}
            usedLucky={powerCards.lucky}
            usedScanner={powerCards.scanner}
            usedReviver={powerCards.reviver}
            usedICT={powerCards.ict}
            usedCharm={powerCards.charm}
            usedCursed={powerCards.cursed}
          />
        </div>
      )}

      {/* Game Info */}
      <p>Turns: {turns}</p>
      <p>
        Time: {Math.floor(seconds / 60).toString().padStart(2, '0')}:
        {(seconds % 60).toString().padStart(2, '0')}
      </p>

      {!peekUsed && gameMode !== 'boss' && (
        <button onClick={usePeek}>🔍 Peek Cards (once)</button>
      )}
    </div>
  );
}
