// page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [hovering, setHovering] = useState(false);
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Create random stars for the background
    const newStars = [];
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 5 + 2,
        animationDuration: Math.random() * 3 + 2
      });
    }
    setStars(newStars);
  }, []);
  
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-700 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Stars background */}
      {stars.map(star => (
        <div 
          key={star.id}
          className="absolute rounded-full bg-white opacity-70 animate-pulse"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.animationDuration}s`
          }}
        />
      ))}
      
      {/* Floating Code Elements */}
      <div className="absolute top-10 left-20 text-green-400 text-xl font-mono animate-bounce">{'<div>'}</div>
      <div className="absolute bottom-20 right-20 text-yellow-300 text-xl font-mono animate-pulse">{'function() {'}</div>
      <div className="absolute top-40 right-40 text-pink-400 text-xl font-mono animate-bounce delay-300">{'for (let i=0)'}</div>
      <div className="absolute bottom-40 left-40 text-blue-300 text-xl font-mono animate-pulse delay-200">{'.map()'}</div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-300 to-pink-300">
              minimindsLab
            </h1>
            <p className="text-xl font-bold text-cyan-200 mb-2">Where Coding Adventures Begin!</p>
            <div className="w-32 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto"></div>
          </div>

          {/* Main content box */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-3xl border border-white border-opacity-20 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Robot mascot placeholder */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-indigo-900 rounded-full flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    {/* Robot face */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-cyan-300 rounded-full"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-cyan-300 rounded-full"></div>
                    <div className="absolute bottom-8 left-10 w-12 h-4 bg-cyan-300 rounded-full"></div>
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-4">Blast Off into Coding!</h2>
                <p className="text-cyan-100 mb-6">
                  Join us on an incredible journey through the universe of programming. 
                  Build games, solve puzzles, and create amazing projects while learning 
                  to code in a fun and interactive way!
                </p>
                
                {/* Login button */}
                <button
                  onClick={handleLogin}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="relative bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {hovering ? "Let's Go! 🚀" : "Login to Play 👾"}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Features highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Fun Challenges</h3>
              <p className="text-cyan-100">Solve coding puzzles and level up your skills!</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-green-300 mb-2">Earn Badges</h3>
              <p className="text-cyan-100">Collect cool badges and show off your achievements!</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="text-xl font-bold text-pink-300 mb-2">Build Projects</h3>
              <p className="text-cyan-100">Create awesome games and apps to share with friends!</p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-cyan-200">© 2025 minimindsLab - Blast off into the coding universe!</p>
          </div>
        </div>
      </div>
    </main>
  );
}