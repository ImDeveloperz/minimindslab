"use client";

import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableOption = ({ option, index, handleOptionClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'OPTION',
    item: { option },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md transform transition-transform ${
        isDragging ? 'opacity-50' : 'hover:scale-105'
      }`}
      onClick={() => handleOptionClick(option)}
    >
      {option}
    </div>
  );
};

const DroppableSlot = ({ index, slot, handleDrop, handleSlotClick }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'OPTION',
    drop: (item) => handleDrop(item.option, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed p-2 rounded-lg min-h-12 flex items-center justify-center transition-colors ${
        isOver ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-gray-100'
      } ${slot.value ? 'border-solid bg-white' : ''}`}
    >
      {slot.value ? (
        <div 
          className={`py-2 px-4 rounded-lg w-full text-center ${
            slot.isFixed ? 'bg-gray-300 text-gray-800' : 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
          }`}
          onClick={() => !slot.isFixed && handleSlotClick(index)}
        >
          {slot.value}
        </div>
      ) : (
        <div className="text-gray-500">Drop here...</div>
      )}
    </div>
  );
};

const LevelGame = ({ level, onLevelComplete }) => {
  const [pattern, setPattern] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Initialize pattern from level data
    if (level) {
      setPattern(
        level.pattern.map((item) => ({
          ...item,
          value: item.isFixed ? item.value : '',
        }))
      );
    }
  }, [level]);

  const handleOptionClick = (option) => {
    // Find the first empty slot and fill it with the option
    const updatedPattern = [...pattern];
    const emptySlotIndex = updatedPattern.findIndex(
      (slot) => !slot.isFixed && !slot.value
    );
    
    if (emptySlotIndex !== -1) {
      updatedPattern[emptySlotIndex].value = option;
      setPattern(updatedPattern);
      checkPatternCompletion(updatedPattern);
    }
  };

  const handleDrop = (option, index) => {
    // Only allow drops on empty slots
    if (!pattern[index].isFixed && !pattern[index].value) {
      const updatedPattern = [...pattern];
      updatedPattern[index].value = option;
      setPattern(updatedPattern);
      checkPatternCompletion(updatedPattern);
    }
  };

  const checkPatternCompletion = (currentPattern) => {
    // Check if all slots are filled
    const isComplete = currentPattern.every(slot => slot.isFixed || slot.value);
    
    if (isComplete) {
      // Check if all answers are correct
      const isAllCorrect = currentPattern.every(slot => 
        slot.isFixed || slot.value === slot.correctValue
      );
      
      if (isAllCorrect) {
        setIsCorrect(true);
        // Call parent's onLevelComplete function
        onLevelComplete();
      }
    }
  };

  const handleSlotClick = (index) => {
    // Only clear non-fixed slots
    if (!pattern[index].isFixed && pattern[index].value) {
      const updatedPattern = [...pattern];
      updatedPattern[index].value = '';
      setPattern(updatedPattern);
    }
  };

  const handleReset = () => {
    // Reset the pattern but keep fixed values
    setPattern(
      pattern.map((slot) => ({
        ...slot,
        value: slot.isFixed ? slot.value : '',
      }))
    );
    setIsCorrect(false);
  };

  if (!level) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white rounded-b-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{level.title}</h2>
          <p className="text-gray-700">{level.description}</p>
        </div>

        <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow-inner">
          <div className="space-y-3 font-mono text-sm">
            {pattern.map((slot, index) => (
              <DroppableSlot
                key={slot.id}
                index={index}
                slot={slot}
                handleDrop={handleDrop}
                handleSlotClick={handleSlotClick}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Available Blocks:</h3>
          <div className="flex flex-wrap gap-3">
            {level.options.map((option, index) => (
              <DraggableOption
                key={index}
                option={option}
                index={index}
                handleOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Reset
          </button>

          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">
              Drag blocks to the empty slots or click them to auto-fill
            </p>
            <p className="text-sm text-gray-600">
              Click on placed blocks to remove them
            </p>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default LevelGame;