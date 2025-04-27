// src/app/pattern-builder/[difficulty]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CodeBlock from '../../../components/CodeBlock';
import OptionsSelector from '../../../components/OptionsSelector';
import FeedbackMessage from '../../../components/FeedbackMessage';
import VictoryScreen from '../../../components/VictoryScreen2';

export default function GamePage({ params }) {
  const { difficulty } = params;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [levelData, setLevelData] = useState(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Load level data from API
  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/pattern-builder/${difficulty}`);
        if (!response.ok) {
          throw new Error('Failed to fetch level data');
        }
        const data = await response.json();
        setLevelData(data);
        
        // Load progress from localStorage
        const savedProgress = localStorage.getItem('patternBuilderProgress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          if (progress.level === difficulty) {
            setCurrentChallengeIndex(progress.challengeIndex);
          } else {
            // If switching to a new difficulty, reset progress
            localStorage.setItem('patternBuilderProgress', JSON.stringify({
              level: difficulty,
              challengeIndex: 0
            }));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching level data:', error);
        setLoading(false);
      }
    };
    
    fetchLevelData();
  }, [difficulty]);
  
  // Save progress whenever the challenge index changes
  useEffect(() => {
    if (levelData) {
      localStorage.setItem('patternBuilderProgress', JSON.stringify({
        level: difficulty,
        challengeIndex: currentChallengeIndex
      }));
    }
  }, [currentChallengeIndex, difficulty, levelData]);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const currentChallenge = levelData.challenges[currentChallengeIndex];
    const isAnswerCorrect = selectedOption === currentChallenge.correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    if (isAnswerCorrect) {
      // Wait for feedback animation, then move to next challenge
      setTimeout(() => {
        if (currentChallengeIndex < levelData.challenges.length - 1) {
          setCurrentChallengeIndex(prevIndex => prevIndex + 1);
          setSelectedOption(null);
          setShowFeedback(false);
          setShowHint(false);
        } else {
          // Completed all challenges in this level
          setCompleted(true);
        }
      }, 2000);
    }
  };
  
  const resetGame = () => {
    setCurrentChallengeIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setShowHint(false);
    setCompleted(false);
    
    // Update localStorage
    localStorage.setItem('patternBuilderProgress', JSON.stringify({
      level: difficulty,
      challengeIndex: 0
    }));
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-3xl font-bold text-purple-600">Loading...</div>
      </div>
    );
  }
  
  if (completed) {
    return <VictoryScreen difficulty={difficulty} onReset={resetGame} />;
  }
  
  const currentChallenge = levelData.challenges[currentChallengeIndex];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-600">
            {levelData.title}
          </h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Challenge {currentChallengeIndex + 1} of {levelData.challenges.length}
            </span>
            <Link href="/pattern-builder" className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded">
              Change Level
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {currentChallenge.title}
          </h2>
          <p className="text-gray-700 mb-6">
            {currentChallenge.description}
          </p>
          
          <div className="mb-8">
            <CodeBlock 
              challenge={currentChallenge.challenge} 
              selectedOption={selectedOption}
            />
          </div>
          
          <div className="mb-6">
            <OptionsSelector 
              options={currentChallenge.options}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
              disabled={showFeedback}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || showFeedback}
              className={`px-6 py-2 ${
                !selectedOption || showFeedback
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-medium rounded-lg transition-colors`}
            >
              Check Answer
            </button>
          </div>
          
          {showHint && (
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
              <p className="text-yellow-800">
                <span className="font-bold">Hint:</span> {currentChallenge.hint}
              </p>
            </div>
          )}
        </div>
        
        {showFeedback && (
          <FeedbackMessage 
            isCorrect={isCorrect} 
            explanation={currentChallenge.explanation}
          />
        )}
      </div>
    </div>
  );
}