import { useEffect, useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import ModeSelect from './components/ModeSelect';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import CompanionSelect from './components/CompanionSelect';

import angrysisiw from './assets/angrysisiw.png';
import beigesisiw from './assets/beigesisiw.png';
import blacksisiw from './assets/blacksisiw.png';
import greensisiw from './assets/greensisiw.png';
import greysisiw from './assets/greysisiw.png';
import pinksisiw from './assets/pinksisiw.png';
import redsisiw from './assets/redsisiw.png';
import violet from './assets/violet.png';
import yellowsisiw from './assets/yellowsisiw.png';
import cheaterSisiw from './assets/cheatersisiw.png';
import ictSisiw from './assets/ictsisiw.png';
import charmSisiw from './assets/charmsisiw.png';
import cursedSisiw from './assets/cursedsisiw.png';
import clickSound from './assets/clicksound.wav';
import bossLaughSound from './assets/bosslaughsound.mp3';
import victorySound from './assets/victorysound.mp3';
import defeatSound from './assets/defeatsound.mp3';

const cardImages = [
  { src: angrysisiw, matched: false },
  { src: beigesisiw, matched: false },
  { src: blacksisiw, matched: false },
  { src: greensisiw, matched: false },
  { src: greysisiw, matched: false },
  { src: pinksisiw, matched: false },
  { src: redsisiw, matched: false },
  { src: violet, matched: false },
  { src: yellowsisiw, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [gameResult, setGameResult] = useState('');
  const [peekUsed, setPeekUsed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [cheaterProgress, setCheaterProgress] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [blockNextDamage, setBlockNextDamage] = useState(false);
  const [usedPowerCards, setUsedPowerCards] = useState({
    striker: false,
    defender: false,
    healer: false,
    lucky: false,
    scanner: false,
    reviver: false,
    ict: false,
    seducer: false,
    cursed: false
  });
  const [reviverArmed, setReviverArmed] = useState(false);
  const [bossChoiceOne, setBossChoiceOne] = useState(null);
  const [bossChoiceTwo, setBossChoiceTwo] = useState(null);
  const [showBossTurn, setShowBossTurn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [chosenCompanions, setChosenCompanions] = useState([]);
  const [showCompanionSelect, setShowCompanionSelect] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [cheatAnimateCards, setCheatAnimateCards] = useState([]); // Track which cards animate
  const [powerEffect, setPowerEffect] = useState(null); // Track which power is being shown
  const [showBossDialogue, setShowBossDialogue] = useState(false); // Show Cheater Sisiw dialogue
  const [showBossTaunt, setShowBossTaunt] = useState(false); // Show taunt after boss intro
  const [showPreview, setShowPreview] = useState(false);
  const [activePowerAnimation, setActivePowerAnimation] = useState(null); // Track active power animation

  // --- Companion Ability State ---
  const [ictUndoAvailable, setIctUndoAvailable] = useState(false);
  const [lastWrongPair, setLastWrongPair] = useState(null);
  const [seducerSkipBoss, setSeducerSkipBoss] = useState(false);
  const [cursedCard, setCursedCard] = useState(null);
  const [undoGlitchUsed, setUndoGlitchUsed] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [undoGlitchSnapshot, setUndoGlitchSnapshot] = useState(null);

  // Utility to play click sound
  const playClick = () => {
    const audio = new window.Audio(clickSound);
    audio.currentTime = 0;
    audio.play();
  };

  // Utility to play boss laugh
  const playBossLaugh = () => {
    const audio = new window.Audio(bossLaughSound);
    audio.currentTime = 0;
    audio.play();
  };

  // Utility to play victory sound
  const playVictorySound = () => {
    const audio = new window.Audio(victorySound);
    audio.currentTime = 0;
    audio.play();
  };

  // Utility to play defeat sound
  const playDefeatSound = () => {
    const audio = new window.Audio(defeatSound);
    audio.currentTime = 0;
    audio.play();
  };

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffled.slice(0, 18));
  };

  const resetAndStart = () => {
    setModal(false); // Close modal before resetting
    shuffleCards();
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setSeconds(0);
    setIsTiming(false);
    setGameResult('');
    setPeekUsed(false);
    setShowAll(false);
    setCheaterProgress(0);
    setPlayerHealth(100);
    setBlockNextDamage(false);
    setUsedPowerCards({
      striker: false,
      defender: false,
      healer: false,
      lucky: false,
      scanner: false,
      reviver: false,
      ict: false,
      seducer: false,
      cursed: false
    });
    setReviverArmed(false);
    setBossChoiceOne(null);
    setBossChoiceTwo(null);
    setShowBossTurn(false);
    setScannerActive(false);
    setGameStarted(true);
    setUndoGlitchUsed(false); // Reset ICT Sisiw usage
    setUndoGlitchSnapshot(null); // Reset snapshot
    setIctUndoAvailable(false); // Reset undo availability
    setLastWrongPair(null); // Reset last wrong pair
  };

  const startGame = (mode) => {
    if (mode === 'boss') {
      setGameMode('boss');
      setShowCompanionSelect(true);
    } else {
      setGameMode(mode);
      resetAndStart();
    }
  };

  const handleCompanionConfirm = (companions) => {
    setChosenCompanions(companions);
    setShowCompanionSelect(false);
    setShowBossTaunt(true); // Show taunt after companion selection
  };

  // Called after closing Cheater Sisiw dialogue
  const handleCloseBossDialogue = () => {
    setShowBossDialogue(false);
    resetAndStart(); // Start the boss game after dialogue
  };

  const handleUsePowerCard = (type) => {
    if (usedPowerCards[type]) return;
    setUsedPowerCards(prev => ({ ...prev, [type]: true }));
    setPowerEffect(type); // Show icon
    setActivePowerAnimation(type); // Trigger animation overlay
    setTimeout(() => setPowerEffect(null), 1000); // Hide after 1s
    setTimeout(() => setActivePowerAnimation(null), 1000); // Hide animation after 1s

    if (type === 'striker') setCheaterProgress(prev => Math.min(prev + 20, 100));
    if (type === 'defender') setBlockNextDamage(true);
    if (type === 'healer') setPlayerHealth(prev => Math.min(prev + 30, 100));

    if (type === 'lucky') {
      const unmatched = cards.filter(card => !card.matched);
      const pairs = unmatched.reduce((acc, card) => {
        acc[card.src] = acc[card.src] ? [...acc[card.src], card] : [card];
        return acc;
      }, {});

      for (const src in pairs) {
        if (pairs[src].length >= 2) {
          const [first, second] = pairs[src];
          setCards(prev => prev.map(card => card.id === first.id || card.id === second.id ? { ...card, matched: true } : card));
          setCheaterProgress(prev => Math.min(prev + 5, 100));
          break;
        }
      }
    }

    if (type === 'scanner') {
      const unmatched = cards.filter(card => !card.matched);
      const pairs = unmatched.reduce((acc, card) => {
        acc[card.src] = acc[card.src] ? [...acc[card.src], card] : [card];
        return acc;
      }, {});

      for (const src in pairs) {
        if (pairs[src].length >= 2) {
          const [first, second] = pairs[src];
          setChoiceOne(first);
          setChoiceTwo(second);
          setDisabled(true);
          setScannerActive(true);
          setTimeout(() => {
            setChoiceOne(null);
            setChoiceTwo(null);
            setDisabled(false);
            setScannerActive(false);
          }, 1000);
          break;
        }
      }
    }

    if (type === 'reviver') setReviverArmed(true);

    // ICT Sisiw: Undo last wrong match
    if (type === 'ict' && !undoGlitchUsed) {
      useUndoGlitch();
    }
    // Charm Sisiw: Skip boss turn
    if (type === 'charm') {
      setSeducerSkipBoss(true);
    }
    // Cursed Sisiw: Select a card to curse (for demo, curse first unmatched card)
    if (type === 'cursed') {
      const unmatched = cards.filter(card => !card.matched);
      if (unmatched.length > 0) setCursedCard(unmatched[0]);
    }
  };

  // Card preview at game start
  useEffect(() => {
    if (gameStarted) {
      setShowPreview(true);
      setShowAll(true); // Show all cards
      setTimeout(() => {
        setShowPreview(false);
        setShowAll(false); // Hide all cards after preview
      }, 2000);
    }
  }, [gameStarted]);

  const handleChoice = (card) => {
    if (!isTiming) setIsTiming(true);
    if (!choiceOne) setChoiceOne(card);
    else setChoiceTwo(card);
  };

  // --- ICT Sisiw 'Undo Glitch' ability ---
  function useUndoGlitch() {
    if (undoGlitchUsed || !undoGlitchSnapshot) return;
    // Only allow undo if the last move was a wrong match and it's immediately after that move
    // (i.e., ictUndoAvailable is true)
    if (!ictUndoAvailable) return;
    // Restore health and turn count
    setPlayerHealth(undoGlitchSnapshot.prevHealth);
    setTurns(undoGlitchSnapshot.prevTurns);
    // Flip cards back down (unmatch)
    setCards(prev => prev.map(card => {
      if (card.id === undoGlitchSnapshot.card1.id || card.id === undoGlitchSnapshot.card2.id) {
        return { ...card, matched: false };
      }
      return card;
    }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setLastWrongPair(null);
    setIctUndoAvailable(false);
    setUndoGlitchUsed(true);
    setUndoGlitchSnapshot(null);
    // Trigger glitch animation
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1000);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo && !scannerActive) {
      setDisabled(true);
      const isMatch = choiceOne.src === choiceTwo.src;
      setTimeout(() => {
        if (isMatch) {
          setCards(prev => prev.map(card => card.src === choiceOne.src ? { ...card, matched: true } : card));
          if (gameMode === 'boss') setCheaterProgress(prev => Math.min(prev + 10, 100));
          setIctUndoAvailable(false);
          setLastWrongPair(null);
        }
        // Only apply player health loss if NOT a match
        if (gameMode === 'boss' && !isMatch) {
          let healthLost = 0;
          let prevHealth = playerHealth;
          let prevTurns = turns;
          if (!blockNextDamage) {
            setPlayerHealth(prev => {
              let newHealth = Math.max(prev - 5, 0);
              healthLost = prev - newHealth;
              if (newHealth <= 0 && reviverArmed) {
                setReviverArmed(false);
                newHealth = 50;
              }
              if (newHealth === 0) {
                setGameResult('defeat');
                setModal(true);
                setIsTiming(false);
                playDefeatSound();
              }
              return newHealth;
            });
          } else setBlockNextDamage(false);
          setUndoGlitchSnapshot({
            card1: choiceOne,
            card2: choiceTwo,
            prevHealth,
            prevTurns
          });
        }
        // ICT Sisiw: Track last wrong pair for undo
        if (!isMatch) {
          setLastWrongPair([choiceOne, choiceTwo]);
          setIctUndoAvailable(true);
        } else {
          setIctUndoAvailable(false);
          setLastWrongPair(null);
        }
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prev => prev + 1);
        setDisabled(false);
        if (gameMode === 'boss') setTimeout(bossTurn, 500);
      }, 800);
    }
  }, [choiceOne, choiceTwo, scannerActive]);

  useEffect(() => {
    if (gameStarted && cards.length > 0 && cards.every(card => card.matched)) {
      setIsTiming(false);
      setGameResult('win');
      setModal(true);
      playVictorySound();
    }
  }, [cards, gameStarted]);

  useEffect(() => {
    if (gameResult === 'defeat') {
      playDefeatSound();
    }
  }, [gameResult]);

  // Enhanced: Cheater Sisiw shuffles cards during boss turn and disables player input
  // Remove duplicate declaration of cheatAnimateCards here

  // Helper to get all unmatched card ids
  const getUnmatchedCardIds = () => cards.filter(card => !card.matched).map(card => card.id);

  // Dynamic difficulty: more shuffles and damage as boss health drops
  function getBossShuffleDelay() {
    if (cheaterProgress >= 80) return 200; // very fast
    if (cheaterProgress >= 50) return 350;
    return 500;
  }
  function getBossDamage() {
    if (cheaterProgress >= 80) return 20;
    if (cheaterProgress >= 50) return 15;
    return 10;
  }

  const bossTurn = () => {
    if (seducerSkipBoss) {
      setSeducerSkipBoss(false);
      return; // Boss skips turn
    }
    const unmatched = cards.filter(card => !card.matched);
    if (unmatched.length < 2) return;

    // playBossLaugh(); // Temporarily removed
    // Cheater Sisiw shuffles all cards (living up to his name!)
    const idsToAnimate = getUnmatchedCardIds();
    setCheatAnimateCards(idsToAnimate);
    setCards(prev => {
      const matched = prev.filter(card => card.matched);
      const toShuffle = prev.filter(card => !card.matched);
      const shuffled = [...toShuffle].sort(() => Math.random() - 0.5);
      let shuffledIdx = 0;
      const newCards = prev.map(card => card.matched ? card : shuffled[shuffledIdx++]);
      // After shuffling, pick two cards and run boss logic
      setTimeout(() => {
        setCheatAnimateCards([]); // Remove animation after delay
        const newUnmatched = newCards.filter(card => !card.matched);
        const shuffledUnmatched = [...newUnmatched].sort(() => Math.random() - 0.5);
        const [bossCard1, bossCard2] = shuffledUnmatched;
        setBossChoiceOne(bossCard1);
        setBossChoiceTwo(bossCard2);
        setTimeout(() => {
          setShowBossTurn(false);
          setBossChoiceOne(null);
          setBossChoiceTwo(null);
          setDisabled(false); // Re-enable player input after boss turn
          // Cursed Sisiw: If boss draws cursed card, damage boss and remove curse
          if (cursedCard && ((bossCard1 && bossCard1.id === cursedCard.id) || (bossCard2 && bossCard2.id === cursedCard.id))) {
            setCheaterProgress(prev => Math.min(prev + 15, 100));
            setCursedCard(null); // Remove curse after effect
          }
          if (bossCard1 && bossCard2 && bossCard1.src === bossCard2.src) {
            setPlayerHealth(prev => {
              let newHealth = Math.max(prev - getBossDamage(), 0);
              if (newHealth <= 0 && reviverArmed) {
                setReviverArmed(false);
                newHealth = 50;
              }
              if (newHealth === 0) {
                setGameResult('defeat');
                setModal(true);
                setIsTiming(false);
                playDefeatSound();
              }
              return newHealth;
            });
          }
        }, 1000);
      }, getBossShuffleDelay()); // Dynamic shuffle delay
      return newCards;
    });
    setBossChoiceOne(null);
    setBossChoiceTwo(null);
    setShowBossTurn(true);
    setDisabled(true); // Disable player input during boss turn
  };

  const usePeek = () => {
    if (!peekUsed) {
      setShowAll(true);
      setPeekUsed(true);
      setTimeout(() => setShowAll(false), 1500);
    }
  };

  const goToModeSelect = () => {
    setGameStarted(false);
    setModal(false);
    setGameMode(null);
    setGameResult('');
    setShowMainMenu(false);
    setChosenCompanions([]); // companions only reset when changing mode
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowMainMenu(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isTiming) timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [isTiming]);

  useEffect(() => {
    if (gameMode === 'timed' && seconds >= 60) {
      setIsTiming(false);
      setGameResult('lose');
      setModal(true);
    }
  }, [seconds, gameMode]);

  useEffect(() => {
    if (gameMode === 'limited' && turns >= 30 && !cards.every(card => card.matched)) {
      setIsTiming(false);
      setGameResult('lose');
      setModal(true);
    }
  }, [turns, gameMode, cards]);

  // Helper to get icon and label for each power
  const getPowerEffectIcon = (effect) => {
    switch (effect) {
      case 'striker':
        return { icon: angrysisiw, label: 'Striker!' };
      case 'defender':
      case 'blocker':
        return { icon: greysisiw, label: 'Defender!' };
      case 'healer':
        return { icon: greensisiw, label: 'Healer!' };
      case 'lucky':
        return { icon: yellowsisiw, label: 'Lucky!' };
      case 'scanner':
        return { icon: violet, label: 'Scanner!' };
      case 'reviver':
        return { icon: redsisiw, label: 'Reviver!' };
      case 'ict':
        return { icon: ictSisiw, label: 'ICT Undo!' };
      case 'seducer':
        return { icon: seducerSisiw, label: 'Seducer Skip!' };
      case 'cursed':
        return { icon: cursedSisiw, label: 'Cursed!' };
      default:
        return null;
    }
  };

  return (
    <div className={`App`}>
      {loading && <div className="loading">Loading...</div>}
      {powerEffect && getPowerEffectIcon(powerEffect) && (
        <div className="power-effect-popup">
          <img src={getPowerEffectIcon(powerEffect).icon} alt={getPowerEffectIcon(powerEffect).label} className="power-effect-icon" />
          <span className="power-effect-label">{getPowerEffectIcon(powerEffect).label}</span>
        </div>
      )}
      {showSplash ? (
        <SplashScreen onSplashEnd={() => setShowSplash(false)} />
      ) : showMainMenu ? (
        <div className="main-menu">
          <h1>Sisiw Memory Game</h1>
          <button onClick={() => { playClick(); setShowMainMenu(false); }}>Play</button>
          <button onClick={() => { playClick(); setShowInstructions(true); }}>How to Play</button>
        </div>
      ) : showCompanionSelect ? (
        <CompanionSelect onConfirm={(companions) => { playClick(); handleCompanionConfirm(companions); }} />
      ) : showBossTaunt ? (
        <Modal>
          <div style={{ textAlign: 'center' }}>
            <img src={cheaterSisiw} alt="Cheater Sisiw" style={{ width: 120, marginBottom: 16 }} />
            <h2>Cheater Sisiw Appears!</h2>
            <p style={{ fontWeight: 'bold', fontSize: 18, color: '#b22222' }}>
              Sa tingin mo matatalo mo ako? <br />
              HAHAHA Magaling ako mangloko!
            </p>
            <button onClick={() => { playClick(); setShowBossTaunt(false); resetAndStart(); }} style={{ marginTop: 16 }}>G!</button>
          </div>
        </Modal>
      ) : showBossDialogue ? (
        <Modal onClose={handleCloseBossDialogue}>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <img src={cheaterSisiw} alt="Cheater Sisiw" style={{ width: 100, marginBottom: 16 }} />
            <h2>Cheater Sisiw</h2>
            <p style={{ fontSize: 18, fontWeight: 500 }}>
              Sa tingin mo matatalo mo ako? <br />
              <span style={{ color: '#d32f2f', fontWeight: 700 }}>HAHAHA Magaling ako mangloko!</span>
            </p>
            <button onClick={() => { playClick(); handleCloseBossDialogue(); }} style={{ marginTop: 16 }}>Bring it on!</button>
          </div>
        </Modal>
      ) : !gameStarted ? (
        <ModeSelect setGameMode={setGameMode} startGame={(mode) => { playClick(); startGame(mode); }} setShowMainMenu={setShowMainMenu} />
      ) : (
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={disabled}
          turns={turns}
          seconds={seconds}
          gameMode={gameMode}
          goToModeSelect={() => { playClick(); goToModeSelect(); }}
          showAll={showAll}
          usePeek={() => { playClick(); usePeek(); }}
          peekUsed={peekUsed}
          cheaterProgress={cheaterProgress}
          cheaterSisiw={cheaterSisiw}
          playerHealth={playerHealth}
          powerCards={usedPowerCards}
          bossChoiceOne={bossChoiceOne}
          bossChoiceTwo={bossChoiceTwo}
          showBossTurn={showBossTurn}
          chosenCompanions={chosenCompanions}
          onUsePowerCard={(type) => { playClick(); handleUsePowerCard(type); }}
          resetAndStart={() => { playClick(); resetAndStart(); }}
          cheatAnimateCards={cheatAnimateCards}
          powerEffect={powerEffect}
          showPreview={showPreview}
          cursedCard={cursedCard}
        />
      )}
      {showModal && (
        <Modal
          onClose={() => setModal(false)}
          resetAndStart={resetAndStart}
          time={seconds}
          gameResult={gameResult}
          goToModeSelect={goToModeSelect}
          gameMode={gameMode}
        />
      )}
      {showInstructions && (
        <Modal onClose={() => setShowInstructions(false)}>
          <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 12 }}>
            <h2>How to Play</h2>
            <p><strong>General:</strong> Match all pairs of cards to win. Click two cards to reveal them. If they match, they stay revealed. If not, they flip back. Use as few turns and as little time as possible!</p>
            <h3>Game Modes</h3>
            <ul style={{textAlign: 'left', maxWidth: 600, margin: '0 auto'}}>
              <li><strong>Classic:</strong> No time or turn limit. Relax and match all pairs at your own pace.</li>
              <li><strong>Timed:</strong> Match all pairs within 60 seconds. If the timer runs out, you lose!</li>
              <li><strong>Limited:</strong> You have 30 turns to match all pairs. If you run out of turns, you lose!</li>
              <li><strong>Boss Mode:</strong> Face off against Cheater Sisiw! Both you and the boss take turns. The boss can damage your health if it finds a match. Use companions and power cards for special abilities:
                <ul>
                  <li><strong>Striker Sisiw:</strong> Deal 20% damage to the boss instantly.</li>
                  <li><strong>Defender Sisiw:</strong> Block the next damage you would take from the boss.</li>
                  <li><strong>Healer Sisiw:</strong> Restore 30% of your health.</li>
                  <li><strong>Lucky Sisiw:</strong> Instantly match a random pair of cards for free damage to the boss.</li>
                  <li><strong>Scanner Sisiw:</strong> Reveal a matching pair for you (you must still match them to damage the boss).</li>
                  <li><strong>Reviver Sisiw:</strong> If you reach 0 health, revive with 50% health (must be used before dying).</li>
                  <li><strong>ICT Sisiw:</strong> Undo your last wrong match, restoring lost health and turns (once per game, only after a mistake).</li>
                  <li><strong>Charm Sisiw:</strong> Skip the boss's next turn (once per game).</li>
                  <li><strong>Cursed Sisiw:</strong> Curse a card; if the boss draws it on their turn, they take 15% damage and the curse is removed (once per game).</li>
                </ul>
                Defeat the boss by matching cards and using your powers wisely before your health runs out!
              </li>
            </ul>
            <h3>Tips</h3>
            <ul style={{textAlign: 'left', maxWidth: 600, margin: '0 auto'}}>
              <li>Use the Peek button (once per game) to briefly reveal all cards.</li>
              <li>Try to remember card positions for efficient matching.</li>
              <li>In Boss Mode, choose companions that fit your play style! Each companion has a unique power—read their tooltips for details.</li>
            </ul>
          </div>
        </Modal>
      )}
      {activePowerAnimation && (
        <div className={`power-overlay power-${activePowerAnimation}`}>
          {activePowerAnimation === 'striker' && <span>STRIKER POWER!</span>}
          {activePowerAnimation === 'defender' && <span>DEFENDER POWER!</span>}
          {activePowerAnimation === 'healer' && <span>HEALER POWER!</span>}
          {activePowerAnimation === 'lucky' && <span>LUCKY POWER!</span>}
          {activePowerAnimation === 'scanner' && <span>SCANNER POWER!</span>}
          {activePowerAnimation === 'reviver' && <span>REVIVER POWER!</span>}
          {activePowerAnimation === 'ict' && <span>UNDO GLITCH!</span>}
          {activePowerAnimation === 'charm' && <span>CHARM POWER!</span>}
          {activePowerAnimation === 'cursed' && <span>CURSED POWER!</span>}
        </div>
      )}
    </div>
  );
}

export default App;
