"use client"
import { useState, useEffect } from 'react';

const MemoryCard = ({ 
  card, 
  isFlipped, 
  isMatched, 
  onClick, 
  isHinted,
  onMouseEnter,
  onMouseLeave
}) => {
  const [flipped, setFlipped] = useState(isFlipped);
  const [matched, setMatched] = useState(isMatched);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  useEffect(() => {
    setMatched(isMatched);
    if (isMatched) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 1000);
    }
  }, [isMatched]);

  const playFlipSound = () => {
    const audio = new Audio('/sounds/flip.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play error:', e));
  };

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      playFlipSound();
      onClick(card);
    }
  };

  return (
    <div 
      className={`relative w-full aspect-[3/4] cursor-pointer transition-transform duration-300 transform ${
        animated ? 'animate-pulse' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter(card)}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`
          card-container w-full h-full
          transition-all duration-500 ease-in-out transform-gpu
          perspective-1000 relative
          ${flipped ? 'rotate-y-180' : ''}
          ${isHinted ? 'ring-4 ring-green-500 ring-opacity-75 shadow-lg shadow-green-500/50' : ''}
        `}
      >
        {/* Card Back */}
        <div 
          className={`
            absolute w-full h-full rounded-xl bg-indigo-800
            border-2 border-indigo-300 backface-hidden
            flex items-center justify-center
            ${flipped ? 'invisible' : ''}
            shadow-lg transform transition-all duration-300
            bg-gradient-to-br from-purple-700 to-blue-900
            hover:shadow-xl hover:shadow-blue-500/30
          `}
        >
          <div className="absolute inset-0 rounded-lg bg-[url('/images/card-back.png')] bg-cover bg-center opacity-75"></div>
          <div className="absolute inset-0 rounded-lg bg-blue-900 bg-opacity-40 flex items-center justify-center">
            <span className="text-2xl font-bold text-white text-center px-4">
              MiniMinds Logic
            </span>
          </div>
        </div>

        {/* Card Front */}
        <div 
          className={`
            absolute w-full h-full rounded-xl
            bg-gradient-to-br ${card.type === 'term' ? 'from-blue-50 to-blue-200' : 'from-amber-50 to-amber-200'}
            border-2 ${card.type === 'term' ? 'border-blue-400' : 'border-amber-400'}
            rotate-y-180 backface-hidden
            flex items-center justify-center p-3
            ${matched ? 'bg-green-200 border-green-500' : ''}
          `}
        >
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold bg-opacity-70 text-white bg-purple-600">
            {card.type === 'term' ? 'Term' : 'Description'}
          </div>
          
          <p className="text-center text-gray-800 font-medium">
            {card.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
