"use client";

import { useEffect, useState } from 'react';

const VictoryScreen = ({ difficulty, onBackToDifficulty }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Start animation
    createStars();
    
    // Set animation complete after delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const createStars = () => {
    const container = document.getElementById('stars-container');
    if (!container) return;
    
    // Create animated stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position and animation
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
      star.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(star);
    }
  };
  
  // Determine message based on difficulty
  const getVictoryMessage = () => {
    switch (difficulty) {
      case 'easy':
        return "You've mastered the basics of coding patterns!";
      case 'medium':
        return "You've conquered intermediate coding challenges!";
      case 'hard':
        return "You're now a coding pattern expert!";
      default:
        return "You've completed all the levels!";
    }
  };
  
  // Determine next steps message
  const getNextStepsMessage = () => {
    switch (difficulty) {
      case 'easy':
        return "Ready to try Medium difficulty?";
      case 'medium':
        return "Think you can handle Hard difficulty?";
      case 'hard':
        return "You've mastered Pattern Builder! Ready for more coding adventures?";
      default:
        return "Try another difficulty level!";
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div id="stars-container" className="absolute inset-0 pointer-events-none"></div>
      
      <div className={`bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full z-10 text-center transition-all duration-1000 ${
        animationComplete ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-90'
      }`}>
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          VICTORY!
        </h1>
        
        <div className="my-8 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-yellow-300 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {getVictoryMessage()}
        </h2>
        
        <p className="text-xl mb-8 text-gray-600">
          {getNextStepsMessage()}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onBackToDifficulty}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-xl transform transition-transform hover:scale-105"
          >
            Select New Level
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: white;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default VictoryScreen;