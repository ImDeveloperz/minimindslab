// src/components/VictoryScreen.jsx
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VictoryScreen({ difficulty, onReset }) {
  const router = useRouter();
  
  const handleNextLevel = () => {
    let nextLevel;
    
    switch(difficulty) {
      case 'easy':
        nextLevel = 'medium';
        break;
      case 'medium':
        nextLevel = 'hard';
        break;
      default:
        // If already at hard, just reset the same level
        nextLevel = difficulty;
    }
    
    localStorage.setItem('patternBuilderLevel', nextLevel);
    localStorage.setItem('patternBuilderProgress', JSON.stringify({
      level: nextLevel,
      challengeIndex: 0
    }));
    
    router.push(`/pattern-builder/${nextLevel}`);
  };
  
  const difficultyColors = {
    easy: 'from-green-300 to-green-500',
    medium: 'from-yellow-300 to-yellow-500',
    hard: 'from-red-300 to-red-500'
  };
  
  const getNextLevelText = () => {
    switch(difficulty) {
      case 'easy':
        return 'Go to Medium Level';
      case 'medium':
        return 'Try Hard Level';
      case 'hard':
        return 'Play Again';
      default:
        return 'Continue';
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className={`py-8 px-6 bg-gradient-to-r ${difficultyColors[difficulty]} text-center`}>
          <h1 className="text-4xl font-bold text-white mb-2">
            Level Complete!
          </h1>
          <p className="text-white text-lg opacity-90">
            You've mastered the {difficulty} level challenges!
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-8 py-8 flex flex-col items-center">
            <div className="w-24 h-24 mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Congratulations!
            </h2>
            
            <p className="text-gray-600 text-center">
              You've successfully completed all the challenges in the {difficulty} level.
              Your coding skills are growing stronger!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/pattern-builder" className="py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-center font-medium">
              Choose Another Level
            </Link>
            
            <button
              onClick={difficulty === 'hard' ? onReset : handleNextLevel}
              className="py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center font-medium"
            >
              {getNextLevelText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}