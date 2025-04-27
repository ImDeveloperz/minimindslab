"use client";
import React, { useState, useEffect } from "react";
import LogicNode from "@/components/LogicNode";
import VictoryScreenLogicPath from "@/components/VictoryScreenLogicPath";
import CodeBlockVisualizer from "@/components/CodeBlockVisualizer";

export default function LogicPathBoard({ pathData }) {
  const [currentNodeKey, setCurrentNodeKey] = useState("start");
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [lives, setLives] = useState(3);

  // Calculate total nodes and progress percentage
  useEffect(() => {
    if (pathData) {
      const totalNodes = Object.keys(pathData).filter(key => 
        key !== "goal" && key !== "fail" && !key.includes("optional")
      ).length;
      
      const currentProgress = gameHistory.filter(item => 
        item.nodeKey !== "fail" && !item.nodeKey.includes("optional")
      ).length;
      
      setProgress(Math.min(100, (currentProgress / totalNodes) * 100));
    }
  }, [gameHistory, pathData]);

  const handleChoice = (choice) => {
    const currentNode = pathData[currentNodeKey];
    if (!currentNode || !currentNode.choices) {
      console.error("Invalid current node or choices.");
      return;
    }

    // Add to history
    setGameHistory(prev => [...prev, {
      nodeKey: currentNodeKey,
      choice: choice,
      timestamp: Date.now()
    }]);

    const nextNodeKey = currentNode.choices[choice];
    
    if (nextNodeKey === "fail") {
      // Reduce lives instead of immediate failure
      if (lives > 1) {
        setLives(lives - 1);
        // Show feedback but stay on same node
        setFailed(true);
        setTimeout(() => setFailed(false), 2000);
      } else {
        setLives(0);
        setFailed(true);
      }
    } else if (nextNodeKey === "goal") {
      // Add final points
      setScore(prevScore => prevScore + 100);
      setCurrentNodeKey("goal");
    } else if (nextNodeKey && pathData[nextNodeKey]) {
      // Add points for correct progress
      setScore(prevScore => prevScore + 20);
      setCurrentNodeKey(nextNodeKey);
    } else {
      console.error("Invalid choice path.");
    }
  };

  const restartGame = () => {
    setCurrentNodeKey("start");
    setFailed(false);
    setProgress(0);
    setScore(0);
    setLives(3);
    setGameHistory([]);
  };

  const toggleVisualizer = () => {
    setShowVisualizer(!showVisualizer);
  };

  if (currentNodeKey === "goal") {
    return <VictoryScreenLogicPath score={score} history={gameHistory} onRestart={restartGame} />;
  }

  if (failed && lives === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over</h2>
        <p className="text-lg text-gray-700 mb-6">
          You've run out of lives. But don't worry, every coder faces challenges!
        </p>
        <p className="text-md text-gray-600 mb-8">
          Score: {score} points | Progress: {Math.round(progress)}%
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl transition-all shadow-md flex items-center"
          >
            <span className="mr-2">↺</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentNode = pathData[currentNodeKey];
  if (!currentNode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-red-500">Node not found! Please reload.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-5xl w-full mx-auto">
      {/* Game Header */}
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <div className="flex items-center">
          <button
            onClick={restartGame}
            className="flex items-center mr-6 text-gray-600 hover:text-gray-800"
          >
            <span className="mr-1">←</span>
            <span>Restart</span>
          </button>
        </div>
        
        <div className="flex space-x-6">
          {/* Lives indicator */}
          <div className="flex items-center">
            <span className="text-red-500 font-bold mr-2">Lives:</span>
            {Array(3).fill(0).map((_, i) => (
              <span 
                key={i} 
                className={`text-lg ${i < lives ? 'text-red-500' : 'text-gray-300'}`}
              >
                ❤️
              </span>
            ))}
          </div>
          
          {/* Score display */}
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Feedback message when failing but having lives left */}
      {failed && lives > 0 && (
        <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 animate-pulse">
          <div className="flex items-center">
            <span className="mr-2">❌</span>
            <span>Oops! That doesn't work. Try again! Lives remaining: {lives}</span>
          </div>
        </div>
      )}
      
      {/* Code Visualizer Toggle */}
      <div className="w-full mb-6 flex justify-end px-4">
        <button
          onClick={toggleVisualizer}
          className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition-all"
        >
          <span className="mr-2">📝</span>
          {showVisualizer ? "Hide" : "Show"} Code Visualizer
        </button>
      </div>
      
      {/* Code Visualizer Panel */}
      {showVisualizer && currentNode.visualization && (
        <div className="w-full mb-6 bg-white rounded-xl shadow-md p-4">
          <CodeBlockVisualizer 
            nodeData={currentNode}
            gameHistory={gameHistory}
          />
        </div>
      )}
      
      {/* Main Game Node */}
      <LogicNode
        question={currentNode.question}
        choices={Object.keys(currentNode.choices)}
        codeBlock={currentNode.codeBlock}
        hint={currentNode.hint}
        onChoice={handleChoice}
      />
    </div>
  );
}