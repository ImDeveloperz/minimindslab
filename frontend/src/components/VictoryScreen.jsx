"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

export default function VictoryScreen({ difficulty, tries, time }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("Loading feedback...");
  const [windowSize, setWindowSize] = useState({ width: 300, height: 300 });

  // Get window size for confetti
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // Fetch motivational feedback from backend Pollinations API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/feedback?difficulty=${difficulty}&tries=${tries}&time=${time}`);
        const data = await res.json();
        
        setFeedback(data.feedback || "You're amazing! 🚀");
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("You're amazing! 🚀");
      }
    };
    fetchFeedback();
  }, [difficulty, tries, time]);

  const handleContinue = () => {
    router.push("/memory-cards");
  };

  // Format time nicely (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-6 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      <Confetti width={windowSize.width} height={windowSize.height} />

      <h1 className="text-4xl font-bold text-green-600 drop-shadow-md mb-6">
        🎉 Congratulations! 🎉
      </h1>

      <p className="text-xl text-white mb-2">
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Completed!
      </p>

      <div className="flex gap-8 text-white font-semibold text-lg mb-8">
        <p>🧠 Tries: {tries}</p>
        <p>⏱️ Time: {formatTime(time)}</p>
      </div>

      {/* Feedback Message */}
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow-xl max-w-md mb-8">
        <p className="text-center font-semibold">{feedback}</p>
      </div>

      <button
        onClick={handleContinue}
        className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-md transition-all"
      >
        Back to Level Selector
      </button>
    </div>
  );
}