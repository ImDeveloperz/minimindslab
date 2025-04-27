"use client";
import React from "react";

export default function CodeBlockVisualizer({ nodeData, gameHistory }) {
  // This visualizes how code executes based on choices and the visualization data
  
  if (!nodeData || !nodeData.visualization) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No visualization available for this step</p>
      </div>
    );
  }
  
  // Different visualization types based on the concept being taught
  const renderVisualization = () => {
    const { type, data, explanation } = nodeData.visualization;
    
    switch (type) {
      case "if-statement":
        return (
          <div className="p-4">
            <h3 className="font-bold mb-2">If Statement Visualization</h3>
            <div className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 font-mono text-sm">
                if ({data.condition}) {"{"}
              </div>
              <div className="p-3 pl-8 border-l-4 border-green-400 font-mono text-sm">
                {data.trueBlock}
              </div>
              <div className="bg-gray-100 p-3 font-mono text-sm">
                {"}"} else {"{"}
              </div>
              <div className="p-3 pl-8 border-l-4 border-red-400 font-mono text-sm">
                {data.falseBlock}
              </div>
              <div className="bg-gray-100 p-3 font-mono text-sm">
                {"}"}
              </div>
            </div>
          </div>
        );
        
      case "loop":
        return (
          <div className="p-4">
            <h3 className="font-bold mb-2">Loop Visualization</h3>
            <div className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 font-mono text-sm">
                for (let i = 0; i &lt; {data.iterations}; i++) {"{"}
              </div>
              <div className="p-3 pl-8 border-l-4 border-blue-400 font-mono text-sm">
                {data.loopBody}
              </div>
              <div className="bg-gray-100 p-3 font-mono text-sm">
                {"}"}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array(data.iterations).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs
                      ${i === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "function":
        return (
          <div className="p-4">
            <h3 className="font-bold mb-2">Function Visualization</h3>
            <div className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 font-mono text-sm">
                function {data.name}({data.params}) {"{"}
              </div>
              <div className="p-3 pl-8 font-mono text-sm">
                {data.body}
              </div>
              <div className="bg-gray-100 p-3 font-mono text-sm">
                {"}"}
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium">Return value: <span className="font-mono">{data.returnValue}</span></p>
            </div>
          </div>
        );
      
      case "array":
        return (
          <div className="p-4">
            <h3 className="font-bold mb-2">Array Visualization</h3>
            <div className="flex overflow-x-auto py-4">
              {data.elements.map((el, idx) => (
                <div key={idx} className="flex flex-col items-center mx-1 min-w-16">
                  <div className="bg-blue-100 border border-blue-300 rounded p-3 text-center mb-1">
                    {el}
                  </div>
                  <div className="text-xs text-gray-600">
                    index: {data.indices[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-gray-500">Custom visualization not available</p>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold mb-3 text-indigo-700">Code Visualization</h2>
      {renderVisualization()}
      
      <div className="mt-4 border-t pt-4">
        <h3 className="font-medium text-gray-700 mb-2">Why this matters:</h3>
        <p className="text-sm text-gray-600">{nodeData.visualization.explanation}</p>
      </div>
    </div>
  );
}