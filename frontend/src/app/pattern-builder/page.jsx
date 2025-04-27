// src/app/pattern-builder/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DifficultySelector() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if we have a saved level in localStorage
    const savedLevel = localStorage.getItem('patternBuilderLevel');
    const savedProgress = localStorage.getItem('patternBuilderProgress');
    
    if (savedLevel && savedProgress) {
      // Option to continue where they left off
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  
  const selectDifficulty = (level) => {
    localStorage.setItem('patternBuilderLevel', level);
    localStorage.setItem('patternBuilderProgress', JSON.stringify({ level, challengeIndex: 0 }));
    router.push(`/pattern-builder/${level}`);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-3xl font-bold text-purple-600">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-600 mb-8">
          Pattern Builder
        </h1>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to Pattern Builder! Learn coding by completing missing parts in patterns.
            Choose your difficulty level to begin the adventure!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Easy Level */}
          <div 
            onClick={() => selectDifficulty('easy')}
            className="bg-green-500 hover:bg-green-600 transition-all transform hover:scale-105 rounded-xl shadow-lg p-6 text-center cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Easy</h2>
            <p className="text-white">Simple patterns for beginners</p>
            <div className="mt-4">
              <span className="inline-block bg-green-700 rounded-full px-4 py-2 text-white font-semibold">
                Start Here!
              </span>
            </div>
          </div>
          
          {/* Medium Level */}
          <div 
            onClick={() => selectDifficulty('medium')}
            className="bg-yellow-500 hover:bg-yellow-600 transition-all transform hover:scale-105 rounded-xl shadow-lg p-6 text-center cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Medium</h2>
            <p className="text-white">More complex patterns for growing coders</p>
          </div>
          
          {/* Hard Level */}
          <div 
            onClick={() => selectDifficulty('hard')}
            className="bg-red-500 hover:bg-red-600 transition-all transform hover:scale-105 rounded-xl shadow-lg p-6 text-center cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Hard</h2>
            <p className="text-white">Advanced patterns for coding masters</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-purple-600 hover:text-purple-800 text-lg font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}