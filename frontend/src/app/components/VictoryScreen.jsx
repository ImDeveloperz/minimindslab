"use client"
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const VictoryScreen = ({ stats, onPlayAgain, onNextLevel }) => {
  const router = useRouter();
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Create confetti animation using canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confettiColors = ['#FF69B4', '#FFD700', '#00BFFF', '#7CFC00', '#FF6347', '#9370DB'];
    const confettiShapes = ['circle', 'square', 'triangle'];
    const gravity = 0.3;
    const terminalVelocity = 5;
    const drag = 0.075;
    
    let confetti = [];
    
    // Initialize confetti particles
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
        velocity: {
          x: Math.random() * 12 - 6,
          y: Math.random() * 5 + 2
        },
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }
    
    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else if (particle.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
        
        // Update position
        particle.velocity.y += gravity;
        if (particle.velocity.y > terminalVelocity) {
          particle.velocity.y = terminalVelocity;
        }
        
        // Apply drag
        particle.velocity.x *= (1 - drag);
        
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.rotation += particle.rotationSpeed;
        
        // Reset if off screen
        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
          particle.velocity.y = Math.random() * 5 + 2;
        }
      });
      
      requestAnimationFrame(drawConfetti);
    };
    
    const animationId = requestAnimationFrame(drawConfetti);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  const handleNextLevel = () => {
    // If stats.difficulty is 'hard', there's no next level
    if (stats.difficulty === 'hard') {
      router.push('/memory-cards');
      return;
    }
    
    const nextDifficulty = stats.difficulty === 'easy' ? 'medium' : 'hard';
    
    if (typeof onNextLevel === 'function') {
      onNextLevel(nextDifficulty);
    } else {
      router.push({
        pathname: '/memory-cards/play',
        query: { difficulty: nextDifficulty }
      });
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full z-10 relative overflow-hidden">
        {/* Background sparkles */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 opacity-80"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-2">Victory!</h2>
          <p className="text-center text-gray-600 mb-6">You've mastered the {stats.difficulty} level!</p>
          
          <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2">
                <p className="text-gray-600 text-sm">Time</p>
                <p className="text-xl font-bold text-indigo-700">
                  {Math.floor(stats.time / 60)}:{(stats.time % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <div className="text-center p-2">
                <p className="text-gray-600 text-sm">Tries</p>
                <p className="text-xl font-bold text-indigo-700">{stats.tries}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onPlayAgain}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Play Again
            </button>
            
            {stats.difficulty !== 'hard' && (
              <button
                onClick={handleNextLevel}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Next Level
              </button>
            )}
            
            <button
              onClick={() => router.push('/memory-cards')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;