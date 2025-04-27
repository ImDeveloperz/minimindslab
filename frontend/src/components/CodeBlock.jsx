// src/components/CodeBlock.jsx
export default function CodeBlock({ challenge, selectedOption }) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-gray-200 font-mono text-sm md:text-base">
          {challenge.map((line, index) => {
            const isBlankLine = line.includes('___');
            const filledLine = isBlankLine && selectedOption 
              ? line.replace('___', selectedOption) 
              : line;
              
            return (
              <div 
                key={index} 
                className={`line ${isBlankLine ? 'bg-gray-800 rounded py-1 my-1' : ''}`}
              >
                {filledLine}
              </div>
            );
          })}
        </pre>
      </div>
    );
  }