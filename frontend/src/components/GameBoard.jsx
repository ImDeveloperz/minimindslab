"use client";

import React, { useEffect, useState, useRef } from "react";  // <--- import useRef
import MemoryCard from "@/components/MemoryCard";
import VictoryScreen from "@/components/VictoryScreen";

export default function GameBoard({ cards, difficulty }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [tries, setTries] = useState(0);
  const [time, setTime] = useState(0);
  const [feedback, setFeedback] = useState("Good luck!");
  const [gameWon, setGameWon] = useState(false);
  const timerRef = useRef(null); // <--- reference to store timer id

  useEffect(() => {
    let numberOfCards = 8;
    if (difficulty === "medium") numberOfCards = 12;
    if (difficulty === "hard") numberOfCards = 16;

    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfCards);

    setShuffledCards(shuffled);
  }, [cards, difficulty]);

  // Timer starts when game starts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current); // Always clear on unmount
  }, []);

  useEffect(() => {
    if (matchedIds.length === shuffledCards.length / 2 && shuffledCards.length > 0) {
      clearInterval(timerRef.current); // STOP TIMER when winning
      setTimeout(() => {
        setGameWon(true);
      }, 500);
    }
  }, [matchedIds, shuffledCards]);

  const fetchFeedback = async (matchFound) => {
    try {
      const basePrompt = matchFound
        ? "Give a motivational short message for a kid who just matched two cards correctly in a logic game."
        : "Give an encouraging short message for a kid who tried matching cards but missed in a logic game.";

      const randomizer = Math.floor(Math.random() * 10000);
      const fullPrompt = `${basePrompt} Unique ID: ${randomizer}`;

      const res = await fetch(`https://api.pollinations.ai/text2text?prompt=${encodeURIComponent(fullPrompt)}`);
      const data = await res.json();
      setFeedback(data.result || "You're doing amazing, keep it up!");
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Keep trying, you're doing great!");
    }
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTries((prev) => prev + 1);

      const first = shuffledCards[newFlipped[0]];
      const second = shuffledCards[newFlipped[1]];

      const matchFound = (first.id === second.id);

      if (matchFound) {
        setMatchedIds((prev) => [...prev, first.id]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);

      fetchFeedback(matchFound);
    }
  };

  if (gameWon) {
    return <VictoryScreen difficulty={difficulty} tries={tries} time={time} />;
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="flex flex-col items-center text-white text-lg mb-4">
        <div className="flex gap-6 mb-2">
          <p>🧠 Tries: {tries}</p>
          <p>⏱️ Time: {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</p>
        </div>

        <div className="bg-white text-gray-800 p-3 rounded-xl shadow-lg max-w-xs">
          <p className="text-center">{feedback}</p>
        </div>
      </div>

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