// src/components/OptionsSelector.jsx
export default function OptionsSelector({ options, selectedOption, onSelect, disabled }) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Choose the correct option:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              disabled={disabled}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOption === option
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              } ${disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <code className="font-mono">{option}</code>
            </button>
          ))}
        </div>
      </div>
    );
  }