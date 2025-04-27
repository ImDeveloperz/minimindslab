"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function VictoryScreenLogicPath({ score, history, onRestart }) {
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  
  const completionTime = history.length > 0 
    ? ((history[history.length - 1].timestamp - history[0].timestamp) / 1000).toFixed(1)
    : 0;
  
  // Generate pseudo-code based on player's choices
  const generatePseudoCode = () => {
    if (!history || history.length === 0) return "// No code generated";
    
    // This is a simplified example - in a real implementation,
    // you would generate code based on the actual path taken
    let code = "// Code created from your solution:\n\n";
    code += "function solveChallenge() {\n";
    
    history.forEach((step, index) => {
      if (step.nodeKey !== "goal" && step.nodeKey !== "fail") {
        code += `  // Step ${index + 1}\n`;
        code += `  ${step.choice.replace(/Choose |Select /, "").replace(/\.$/, "")};\n\n`;
      }
    });
    
    code += "  // Success!\n";
    code += "  return true;\n";
    code += "}";
    
    return code;
  };

  const goToNextLevel = () => {
    router.push("/logic-path");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
      
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-bounce">
              +1
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Challenge Complete!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Congratulations! You've completed the logic challenge!
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-center mb-2">
              <span className="text-xl">⭐</span>
            </div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-xl font-bold">{score}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-center mb-2">
              <span className="text-xl">⏱️</span>
            </div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="text-xl font-bold">{completionTime}s</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-center mb-2">
              <span className="text-xl">📝</span>
            </div>
            <p className="text-sm text-gray-500">Steps</p>
            <p className="text-xl font-bold">{history.length}</p>
          </div>
        </div>
        
        {/* Code Generation Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center mx-auto text-indigo-600 hover:text-indigo-800"
          >
            <span className="mr-2">💻</span>
            {showCode ? "Hide My Code" : "Show My Code"}
          </button>
          
          {showCode && (
            <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-lg text-left overflow-x-auto">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {generatePseudoCode()}
              </pre>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-medium rounded-lg transition-all flex items-center justify-center"
          >
            <span className="mr-2">↺</span>
            Play Again
          </button>
          
          <button
            onClick={goToNextLevel}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 font-medium rounded-lg transition-all flex items-center justify-center"
          >
            Next Challenge
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}