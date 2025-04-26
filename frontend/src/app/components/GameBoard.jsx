// components/GameBoard.jsx

"use client";

import React, { useEffect, useState } from "react";
import MemoryCard from "../components/MemoryCard";
import VictoryScreen from "../components/VictoryScreen";
import HintPopup from "../components/HintPopup";
import { saveProgress } from "../utils/sessionManager";

export default function GameBoard({ cards, difficulty }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [highlightHints, setHighlightHints] = useState([]);
  const [hoverHint, setHoverHint] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // Shuffle cards on load
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setStartTime(Date.now());
  }, [cards]);

  useEffect(() => {
    // Win condition
    if (matchedIds.length === shuffledCards.length / 2 && shuffledCards.length > 0) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      saveProgress(difficulty);
      setTimeout(() => {
        setGameWon(true);
      }, 500);
    }
  }, [matchedIds, shuffledCards, difficulty, startTime]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 1 && difficulty === "easy") {
      // After first click: highlight 4 random hint cards
      const remainingIndexes = shuffledCards
        .map((_, idx) => idx)
        .filter((i) => i !== index && !matchedIds.includes(shuffledCards[i].id));
      const randomHints = remainingIndexes.sort(() => Math.random() - 0.5).slice(0, 4);
      setHighlightHints(randomHints);
    }

    if (newFlipped.length === 2) {
      const first = shuffledCards[newFlipped[0]];
      const second = shuffledCards[newFlipped[1]];
      if (first.id === second.id) {
        // Match!
        setMatchedIds((prev) => [...prev, first.id]);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setHighlightHints([]);
      }, 1000);
    }
  };

  const handleHover = (hint) => {
    setHoverHint(hint);
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {!gameWon ? (
        <>
          <div
            className={`grid gap-4 
              ${difficulty === "easy" ? "grid-cols-4" : ""}
              ${difficulty === "medium" ? "grid-cols-6" : ""}
              ${difficulty === "hard" ? "grid-cols-8" : ""}
            `}
          >
            {shuffledCards.map((card, index) => (
              <MemoryCard
                key={index}
                index={index}
                card={card}
                flipped={flippedCards.includes(index) || matchedIds.includes(card.id)}
                highlight={highlightHints.includes(index)}
                onClick={() => handleCardClick(index)}
                onHover={handleHover}
              />
            ))}
          </div>

          <HintPopup hint={hoverHint} />
        </>
      ) : (
        <VictoryScreen difficulty={difficulty} />
      )}
    </div>
  );
}
