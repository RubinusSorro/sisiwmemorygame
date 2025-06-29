import './PowerCardZone.css';
import strikerIcon from '../assets/strikersisiw.png';
import defenderIcon from '../assets/defendersisiw.png';
import healerIcon from '../assets/healersisiw.png';
import luckyIcon from '../assets/luckysisiw.png';
import scannerIcon from '../assets/scannersisiw.png';
import reviverIcon from '../assets/reviversisiw.png';
import ictIcon from '../assets/ictsisiw.png';
import charmIcon from '../assets/charmsisiw.png';
import cursedIcon from '../assets/cursedsisiw.png';

export default function PowerCardZone({
  companions = [],
  onUseStriker,
  onUseDefender,
  onUseHealer,
  onUseLucky,
  onUseScanner,
  onUseReviver,
  onUseICT,
  onUseCharm,
  onUseCursed,
  usedStriker,
  usedDefender,
  usedHealer,
  usedLucky,
  usedScanner,
  usedReviver,
  usedICT,
  usedCharm,
  usedCursed
}) {
  const companionData = {
    "Striker Sisiw": {
      icon: strikerIcon,
      used: usedStriker,
      onUse: onUseStriker,
      tooltip: "Deals 20% damage to the boss"
    },
    "Defender Sisiw": {
      icon: defenderIcon,
      used: usedDefender,
      onUse: onUseDefender,
      tooltip: "Blocks the next boss damage"
    },
    "Healer Sisiw": {
      icon: healerIcon,
      used: usedHealer,
      onUse: onUseHealer,
      tooltip: "Restores 30% of your health"
    },
    "Lucky Sisiw": {
      icon: luckyIcon,
      used: usedLucky,
      onUse: onUseLucky,
      tooltip: "Draws two correct matching cards"
    },
    "Scanner Sisiw": {
      icon: scannerIcon,
      used: usedScanner,
      onUse: onUseScanner,
      tooltip: "Reveals two matching cards — but you must manually match them for boss damage to count"
    },
    "Reviver Sisiw": {
      icon: reviverIcon,
      used: usedReviver,
      onUse: onUseReviver,
      tooltip: "Revives you to 50% health if used before dying at low health"
    },
    "ICT Sisiw": {
      icon: ictIcon,
      used: usedICT,
      onUse: onUseICT,
      tooltip: "Undo your last wrong match (once per game)"
    },
    "Charm Sisiw": {
      icon: charmIcon,
      used: usedCharm,
      onUse: onUseCharm,
      tooltip: "Skip the boss's next turn (once per game)"
    },
    "Cursed Sisiw": {
      icon: cursedIcon,
      used: usedCursed,
      onUse: onUseCursed,
      tooltip: "Curse a card: if the boss draws it, they take 20% damage (once per game)"
    }
  };

  return (
    <div className="power-card-zone">
      <h3>Sisiw Companions</h3>
      <div className="power-cards">
        {companions.map((comp) => {
          const data = companionData[comp.name];
          if (!data) return null;

          return (
            <div key={comp.id} className="tooltip-container">
              <img
                src={data.icon}
                alt={comp.name}
                className={`power-card ${data.used ? 'used' : ''}`}
                onClick={!data.used ? data.onUse : null}
              />
              <span className="tooltip-text">{data.tooltip}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


