import React, { useState } from 'react';

const Card = ({ card, isFlipped, isMatched, onClick }) => {
  const [showHint, setShowHint] = useState(false);
  
  // Card class based on state
  const cardClass = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;
  
  // Show hint on hover, but only if card isn't flipped or matched
  const handleMouseEnter = () => {
    if (!isFlipped && !isMatched) {
      setShowHint(true);
    }
  };
  
  const handleMouseLeave = () => {
    setShowHint(false);
  };
  
  return (
    <div 
      className={cardClass}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-symbol">?</div>
          {showHint && <div className="card-hint">{card.hint}</div>}
        </div>
        <div className="card-back">
          <div className={`card-content ${card.type}`}>
            {card.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;