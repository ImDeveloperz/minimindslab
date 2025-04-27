// src/lib/api.js
export async function fetchGameData() {
    try {
      const response = await fetch('/api/pattern-builder');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching game data:', error);
      throw error;
    }
  }
  
  export async function fetchLevelData(difficulty) {
    try {
      const response = await fetch(`/api/pattern-builder/${difficulty}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${difficulty} level data`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${difficulty} level data:`, error);
      throw error;
    }
  }
  
  // For tracking progress and achievements
  export function saveGameProgress(level, challengeIndex) {
    localStorage.setItem('patternBuilderProgress', JSON.stringify({
      level,
      challengeIndex
    }));
  }
  
  export function getGameProgress() {
    const savedProgress = localStorage.getItem('patternBuilderProgress');
    return savedProgress ? JSON.parse(savedProgress) : null;
  }
  
  export function resetGameProgress() {
    localStorage.removeItem('patternBuilderProgress');
    localStorage.removeItem('patternBuilderLevel');
  }