"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trophy, Clock, Award, Home } from "lucide-react";

export default function VictoryScreen({ difficulty, tries, time }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("Loading feedback...");
  const [showConfetti, setShowConfetti] = useState(true);
  const [stars, setStars] = useState(0);

  // Calculate stars based on performance
  useEffect(() => {
    const calculateStars = () => {
      // Simple star calculation based on difficulty and tries
      const maxTries = difficulty === "easy" ? 15 : difficulty === "medium" ? 20 : 30;
      const starRating = Math.max(1, Math.min(3, Math.ceil(3 - (tries / maxTries) * 3)));
      setStars(starRating);
    };
    calculateStars();
  }, [difficulty, tries]);

  // Fetch motivational feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/feedback?difficulty=${difficulty}&tries=${tries}&time=${time}`);
        const data = await res.json();
        setFeedback(data.feedback || "You're amazing! 🚀");
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("You're a memory master! Great job!");
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

  // Generate animated confetti elements
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confettiColors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    const confettiElements = [];
    
    for (let i = 0; i < 150; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 3 + 2}s`;
      const delay = `${Math.random() * 2}s`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      
      confettiElements.push(
        <div
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            left,
            top: '-20px',
            width: size,
            height: size,
            backgroundColor: color,
            animation: `fall ${animationDuration} linear ${delay} forwards`
          }}
        />
      );
    }
    
    return confettiElements;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background with fun pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 opacity-90">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Confetti animation */}
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.9)); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>

      {renderConfetti()}

      {/* Victory content */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-4 border-4 border-yellow-300">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <Trophy size={80} className="text-yellow-400 filter drop-shadow-lg" />
          </div>
        </div>

        <h1 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-4xl mt-10 mb-6">
          AWESOME JOB!
        </h1>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white text-center">
          <p className="text-xl font-bold">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Complete!
          </p>
        </div>

        {/* Stars rating */}
        <div className="flex justify-center mb-6 animate-pulse" style={{ animation: "glow 2s infinite" }}>
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              size={50}
              fill={i < stars ? "#FFD700" : "#E5E7EB"}
              stroke={i < stars ? "#FFD700" : "#9CA3AF"}
              className="mx-2"
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <Clock className="inline-block text-blue-500 mb-1" />
            <p className="text-gray-800 font-bold text-lg">{formatTime(time)}</p>
            <p className="text-gray-600 text-sm">Time</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <Award className="inline-block text-purple-500 mb-1" />
            <p className="text-gray-800 font-bold text-lg">{tries}</p>
            <p className="text-gray-600 text-sm">Attempts</p>
          </div>
        </div>

        {/* Feedback Message */}
        <div className="bg-gradient-to-r from-pink-100 to-yellow-100 p-5 rounded-xl mb-8 text-center" style={{ animation: "wiggle 6s ease-in-out infinite" }}>
          <p className="text-lg font-bold text-gray-800">{feedback}</p>
        </div>

        {/* Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
        >
          <Home size={24} />
          Back to Games
        </button>
      </div>
    </div>
  );
}