"use client";

import React from "react";
import { Lock } from "lucide-react";

export default function DifficultyGate({ title, difficulty, locked, onSelect }) {
  const handleClick = () => {
    if (!locked) {
      onSelect(difficulty);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center 
        rounded-2xl p-6 cursor-pointer 
        shadow-xl transition-transform transform hover:scale-105 
        ${locked ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-br from-green-300 via-blue-300 to-purple-400"}
      `}
    >
      <h2 className="text-2xl font-bold text-white drop-shadow-md mb-4">{title}</h2>

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
          <Lock size={48} color="white" />
        </div>
      )}
    </div>
  );
}
