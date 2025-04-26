"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

export default function VictoryScreen({ difficulty }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("Loading feedback...");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/feedback?difficulty=${difficulty}&tries=10&time=90`);
        const data = await res.json();
        setFeedback(data.feedback || "Great job, you're amazing!");
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("Great job, you're amazing!");
      }
    };

    fetchFeedback();
  }, [difficulty]);

  const handleContinue = () => {
    router.push("/memory-cards");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-6">
      <Confetti width={typeof window !== "undefined" ? window.innerWidth : 300} height={typeof window !== "undefined" ? window.innerHeight : 300} />

      <h1 className="text-4xl font-bold text-green-500 drop-shadow-md mb-6">
        🎉 You Did It! 🎉
      </h1>

      <p className="text-xl text-white mb-4">
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Completed!
      </p>

      <div className="bg-white text-gray-800 p-4 rounded-xl shadow-lg max-w-md">
        <p className="text-center font-semibold">{feedback}</p>
      </div>

      <button
        onClick={handleContinue}
        className="mt-8 px-6 py-3 bg-green-400 hover:bg-green-600 text-white text-lg font-semibold rounded-xl transition-all shadow-lg"
      >
        Back to Levels
      </button>
    </div>
  );
}
