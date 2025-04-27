// src/components/FeedbackMessage.jsx
import { useEffect, useState } from 'react';

export default function FeedbackMessage({ isCorrect, explanation }) {
  const [showExplanation, setShowExplanation] = useState(false);
  
  useEffect(() => {
    // Show explanation after a short delay if the answer is correct
    if (isCorrect) {
      const timer = setTimeout(() => {
        setShowExplanation(true);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      // Show explanation immediately if the answer is wrong
      setShowExplanation(true);
    }
  }, [isCorrect]);
  
  return (
    <div className={`rounded-lg p-6 shadow-lg transition-all duration-300 ${
      isCorrect ? 'bg-green-100' : 'bg-red-100'
    }`}>
      <div className="flex items-center mb-4">
        {isCorrect ? (
          <>
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800">Correct! Great job!</h3>
          </>
        ) : (
          <>
            <div className="bg-red-500 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-800">Not quite right. Try again!</h3>
          </>
        )}
      </div>
      
      {showExplanation && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
          <p className={isCorrect ? 'text-green-800' : 'text-red-800'}>
            <span className="font-bold">Explanation:</span> {explanation}
          </p>
        </div>
      )}
    </div>
  );
}