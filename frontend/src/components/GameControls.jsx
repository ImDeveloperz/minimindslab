import React from 'react';

const GameControls = ({ difficulty, changeDifficulty, elapsedTime, attempts, startNewGame }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="game-controls">
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(elapsedTime)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Attempts:</span>
          <span className="stat-value">{attempts}</span>
        </div>
      </div>
      
      <div className="game-actions">
        <div className="difficulty-selector">
          <label>Difficulty:</label>
          <div className="difficulty-buttons">
            <button 
              className={difficulty === 'easy' ? 'active' : ''}
              onClick={() => changeDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              className={difficulty === 'medium' ? 'active' : ''}
              onClick={() => changeDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              className={difficulty === 'hard' ? 'active' : ''}
              onClick={() => changeDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </div>
        
        <button className="new-game-btn" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;