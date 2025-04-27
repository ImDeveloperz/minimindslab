"use client";

import React, { useEffect, useState } from "react";
import DifficultyGate from "@/components/DifficultyGate";
import { loadProgress } from "@/utils/sessionManager";
import { useRouter } from "next/navigation";

export default function MemoryCardsDifficultyPage() {
  const router = useRouter();
  const [progress, setProgress] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect(() => {
    const savedProgress = loadProgress();
    setProgress(savedProgress);
  }, []);

  const handleDifficultySelect = (difficulty) => {
    router.push(`/memory-cards/play?difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 p-8">
      <h1 className="text-4xl font-bold mb-10 text-white drop-shadow-md">
        Choose Your Adventure ✨
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DifficultyGate
          title="Easy "
          difficulty="easy"
          locked={false}
          onSelect={handleDifficultySelect}
        />
        <DifficultyGate
          title="Medium "
          difficulty="medium"
          locked={!progress.easy}
          onSelect={handleDifficultySelect}
        />
        <DifficultyGate
          title="Hard "
          difficulty="hard"
          locked={!progress.medium}
          onSelect={handleDifficultySelect}
        />
      </div>
    </div>
  );
}
