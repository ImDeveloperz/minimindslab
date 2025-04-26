// utils/fetchCards.js

export async function fetchCards(difficulty) {
    try {
      const response = await fetch("/api/cards");
      const allCards = await response.json();
  
      // Filter by difficulty
      const filtered = allCards.filter(card => card.difficulty === difficulty);
  
      // Pair terms and descriptions by id
      const pairedIds = [...new Set(filtered.map(card => card.id))];
      const pairedCards = [];
  
      pairedIds.forEach(id => {
        const pair = filtered.filter(card => card.id === id);
        pairedCards.push(...pair);
      });
  
      // Slice based on difficulty level
      let numCards = 8; // default easy
      if (difficulty === "medium") numCards = 12;
      if (difficulty === "hard") numCards = 16;
  
      const selectedCards = pairedCards.slice(0, numCards);
  
      // Final shuffle
      const shuffled = selectedCards.sort(() => Math.random() - 0.5);
  
      return shuffled;
    } catch (error) {
      console.error("Error fetching cards:", error);
      return [];
    }
  }
  