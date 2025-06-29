import React, { useState } from 'react';
import './CompanionSelect.css';
import strikerIcon from '../assets/strikersisiw.png';
import defenderIcon from '../assets/defendersisiw.png';
import healerIcon from '../assets/healersisiw.png';
import luckyIcon from '../assets/luckysisiw.png';
import scannerIcon from '../assets/scannersisiw.png';
import reviverIcon from '../assets/reviversisiw.png';
import ictIcon from '../assets/ictsisiw.png';
import seducerIcon from '../assets/seducersisiw.png';
import cursedIcon from '../assets/cursedsisiw.png';

export default function CompanionSelect({ onConfirm }) {
  const [selected, setSelected] = useState([]);

  const companions = [
    { id: 1, name: "Striker Sisiw", image: strikerIcon, description: "Deals 20% damage to the boss" },
    { id: 2, name: "Defender Sisiw", image: defenderIcon, description: "Blocks the next boss damage" },
    { id: 3, name: "Healer Sisiw", image: healerIcon, description: "Restores 30% of your health" },
    { id: 4, name: "Lucky Sisiw", image: luckyIcon, description: "Draws two correct matching cards" },
    { id: 5, name: "Scanner Sisiw", image: scannerIcon, description: "Reveals two matching cards — but you must match them manually for boss damage to count" },
    { id: 6, name: "Reviver Sisiw", image: reviverIcon, description: "Revives you to 50% health if used before dying at low health" },
    { id: 7, name: "ICT Sisiw", image: ictIcon, description: "Undo your last wrong match (once per game)" },
    { id: 8, name: "Seducer Sisiw", image: seducerIcon, description: "Skip the boss's next turn (once per game)" },
    { id: 9, name: "Cursed Sisiw", image: cursedIcon, description: "Curse a card: if the boss draws it, they take 20% damage (once per game)" },
  ];

  const toggleSelect = (comp) => {
    if (selected.find(c => c.id === comp.id)) {
      setSelected(selected.filter(c => c.id !== comp.id));
    } else if (selected.length < 3) {
      setSelected([...selected, comp]);
    }
  };

  return (
    <div className="companion-select">
      <h2>Select 3 Companions</h2>
      <div className="companion-grid">
        {companions.map(comp => (
          <div
            key={comp.id}
            className={`companion-card ${selected.find(c => c.id === comp.id) ? 'selected' : ''}`}
            onClick={() => toggleSelect(comp)}
          >
            <div className="tooltip-container">
              <img src={comp.image} alt={comp.name} />
              <span className="tooltip-text">{comp.description}</span>
            </div>
            <p>{comp.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => onConfirm(selected)} disabled={selected.length !== 3}>
        Confirm
      </button>
    </div>
  );
}
