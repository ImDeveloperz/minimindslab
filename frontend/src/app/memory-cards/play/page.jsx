"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameBoard from "@/components/GameBoard";
import { fetchCards } from "../../../utils/fetchCards";

export default function MemoryCardsPlayPage() {
  const searchParams = useSearchParams(); // ✅ must be at the top
  const difficulty = searchParams.get("difficulty") || "easy";

  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadGame = async () => {
      setLoading(true);
      const fetchedCards = await fetchCards(difficulty);
      setCards(fetchedCards);
      setLoading(false);
    };

    loadGame();
  }, [difficulty, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-300 p-4">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Adventure 🚀
      </h1>

      {loading ? (
        <p className="text-white text-xl">Preparing your cards...</p>
      ) : (
        <GameBoard cards={cards} difficulty={difficulty} />
      )}
    </div>
  );
}
