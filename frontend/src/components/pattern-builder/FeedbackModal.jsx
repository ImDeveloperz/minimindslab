"use client";

import { useEffect, useState } from 'react';

const FeedbackModal = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Show the modal with animation
    setIsVisible(true);
    
    // Create character animations for the feedback text
    const chars = message.split('').map((char, index) => ({
      char,
      style: {
        animationDelay: `${index * 0.05}s`
      }
    }));
    setCharacters(chars);
    
    // Set timeout for confetti effect
    const timer = setTimeout(() => {
      createConfetti();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [message]);

  const createConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random position, color and animation
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFD166', '#118AB2', '#06D6A0'][Math.floor(Math.random() * 5)];
      confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      confettiContainer.appendChild(confetti);
      
      // Clean up after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      
      <div id="confetti-container" className="fixed inset-0 pointer-events-none overflow-hidden"></div>
      
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative z-10 transform transition-transform duration-300 scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Great Job!</h2>
        
        <div className="text-xl text-center mb-6">
          {characters.map((char, index) => (
            <span 
              key={index} 
              className="inline-block animate-bounce" 
              style={char.style}
            >
              {char.char}
            </span>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleClose}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-xl transform transition-transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation: fall linear forwards;
          transform: rotate(0deg);
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackModal;