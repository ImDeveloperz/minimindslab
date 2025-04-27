import React, { useState, useEffect } from 'react';
import Card from './Card';
import GameControls from './GameControls';
import VictoryScreen from './VictoryScreen';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  // Fetch cards from backend API
  const fetchCards = async (diffLevel) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/memory-cards?difficulty=${diffLevel}`);
      const data = await response.json();
      
      if (data.error) {
        console.error(data.error);
        return;
      }
      
      // Shuffle the cards
      const shuffledCards = [...data.cards].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
      
      // Reset game state
      setFlippedCards([]);
      setMatchedPairs([]);
      setGameComplete(false);
      setAttempts(0);
      
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch motivational feedback from backend
  const fetchFeedback = async () => {
    try {
      const response = await fetch(
        `/message/?difficulty=${difficulty}&time_taken=${elapsedTime}&attempts=${attempts}`
      );
      const data = await response.json();
      setFeedback(data.message);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Great job completing the game!");
    }
  };
  
  // Initialize game when difficulty changes
  useEffect(() => {
    fetchCards(difficulty);
  }, [difficulty]);
  
  // Timer effect
  useEffect(() => {
    let timerInterval;
    
    if (gameStarted && !gameComplete) {
      timerInterval = setInterval(() => {
        const current = Date.now();
        setElapsedTime(Math.floor((current - startTime) / 1000));
      }, 1000);
    }
    
    return () => clearInterval(timerInterval);
  }, [gameStarted, gameComplete, startTime]);
  
  // Check if game is complete
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameComplete(true);
      fetchFeedback();
    }
  }, [matchedPairs, cards.length]);
  
  // Handle card click
  const handleCardClick = (index) => {
    // Start the game timer on first card click
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }
    
    // Don't allow more than 2 cards flipped at once or clicking already matched cards
    if (flippedCards.length >= 2 || flippedCards.includes(index) || 
        matchedPairs.includes(cards[index].id)) {
      return;
    }
    
    // Flip the card
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    
    // Check for matches when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      setAttempts(prev => prev + 1);
      
      // Check if cards match (same id but different types)
      if (firstCard.id === secondCard.id && firstCard.type !== secondCard.type) {
        // It's a match!
        setMatchedPairs(prev => [...prev, firstCard.id]);
        setFlippedCards([]);
      } else {
        // Not a match, flip back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };
  
  // Start a new game with the current difficulty
  const startNewGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setElapsedTime(0);
    fetchCards(difficulty);
  };
  
  // Change difficulty and start new game
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setGameStarted(false);
    setGameComplete(false);
    setElapsedTime(0);
  };
  
  if (isLoading) {
    return <div className="loading">Loading game...</div>;
  }
  
  return (
    <div className="memory-game-container">
      <h1>Memory Cards: Programming Edition</h1>
      
      <GameControls 
        difficulty={difficulty} 
        changeDifficulty={changeDifficulty} 
        elapsedTime={elapsedTime}
        attempts={attempts}
        startNewGame={startNewGame}
      />
      
      {gameComplete ? (
        <VictoryScreen 
          elapsedTime={elapsedTime} 
          attempts={attempts} 
          feedback={feedback}
          startNewGame={startNewGame}
          difficulty={difficulty}
        />
      ) : (
        <div className={`card-grid difficulty-${difficulty}`}>
          {cards.map((card, index) => (
            <Card
              key={`${card.id}-${card.type}`}
              card={card}
              isFlipped={flippedCards.includes(index)}
              isMatched={matchedPairs.includes(card.id)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;