"use client";

import React, { useEffect, useState } from "react";
import MemoryCard from "@/components/MemoryCard";
import VictoryScreen from "@/components/VictoryScreen";

export default function GameBoard({ cards, difficulty }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [tries, setTries] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // Shuffle and slice correct number of cards for difficulty
    let numberOfCards = 8; // default easy
    if (difficulty === "medium") numberOfCards = 12;
    if (difficulty === "hard") numberOfCards = 16;

    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfCards);
    
    setShuffledCards(shuffled);
    setStartTime(Date.now());
  }, [cards, difficulty]);

  useEffect(() => {
    // Win condition: all pairs matched
    if (matchedIds.length === shuffledCards.length / 2 && shuffledCards.length > 0) {
      setTimeout(() => {
        setGameWon(true);
      }, 500);
    }
  }, [matchedIds, shuffledCards]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTries(prev => prev + 1); // +1 try when 2 cards selected

      const first = shuffledCards[newFlipped[0]];
      const second = shuffledCards[newFlipped[1]];

      if (first.id === second.id) {
        // Match!
        setMatchedIds((prev) => [...prev, first.id]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  if (gameWon) {
    const totalTime = Math.floor((Date.now() - startTime) / 1000); // seconds
    return <VictoryScreen difficulty={difficulty} tries={tries} time={totalTime} />;
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Live Timer and Tries Display */}
      <div className="flex gap-6 text-white text-lg mb-4">
        <p>🧠 Tries: {tries}</p>
        <p>⏱️ Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
      </div>

      {/* Card Grid */}
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
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}