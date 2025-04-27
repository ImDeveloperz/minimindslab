"use client";
import React, { useState } from "react";
import { Code, Lightbulb } from "lucide-react";

export default function LogicNode({ question, choices, onChoice, codeBlock, hint }) {
  const [showHint, setShowHint] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    setAnimating(true);
    
    // Allow animation to play before moving to next screen
    setTimeout(() => {
      onChoice(choice);
      setAnimating(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl transition-all duration-300">
      {/* Question Section */}
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{question}</h3>
        
        {/* Interactive Code Block Section */}
        {codeBlock && (
          <div className="mb-6">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-2"
            >
              <Code size={18} className="mr-1" />
              {showCode ? "Hide Code" : "Show Code Example"}
            </button>
            
            {showCode && (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {codeBlock}
              </div>
            )}
          </div>
        )}

        {/* Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice)}
              className={`relative p-4 text-left rounded-lg transition-all duration-300 ${
                selectedChoice === choice && animating
                  ? "transform scale-105"
                  : "transform hover:scale-102"
              } ${
                selectedChoice === choice
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "border border-gray-200 hover:border-blue-300 bg-gray-50 hover:bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{choice}</span>
                {selectedChoice === choice && animating && (
                  <span className="ml-2 animate-pulse">→</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Hint Section */}
        {hint && (
          <div className="mt-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center"
            >
              <Lightbulb size={16} className="mr-1" />
              {showHint ? "Hide Hint" : "Need a Hint?"}
            </button>
            
            {showHint && (
              <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800">
                {hint}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}