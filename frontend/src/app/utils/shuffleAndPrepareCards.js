/**
 * Filters cards by difficulty, ensures proper term-description pairs, and shuffles them
 * @param {Array} data - The full card dataset
 * @param {String} difficulty - "easy", "medium", or "hard"
 * @returns {Array} - Shuffled array of cards filtered by difficulty
 */
export function shuffleAndPrepareCards(data, difficulty) {
    // Filter cards by the selected difficulty
    const filteredCards = data.filter(card => card.difficulty === difficulty);
    
    // Group cards by ID to ensure we have complete pairs
    const cardsByIds = {};
    filteredCards.forEach(card => {
      if (!cardsByIds[card.id]) {
        cardsByIds[card.id] = [];
      }
      cardsByIds[card.id].push(card);
    });
    
    // Only include cards that have complete pairs (term + description)
    const validCardPairs = Object.values(cardsByIds).filter(cards => {
      // Check if we have exactly one term and one description card
      const hasTermCard = cards.some(card => card.type === 'term');
      const hasDescriptionCard = cards.some(card => card.type === 'description');
      return hasTermCard && hasDescriptionCard;
    });
    
    // Flatten the array of pairs
    const preparedCards = validCardPairs.flat();
    
    // Shuffle cards
    return shuffleArray(preparedCards);
  }
  
  /**
   * Shuffles an array using the Fisher-Yates algorithm
   * @param {Array} array - The array to shuffle
   * @returns {Array} - Shuffled array
   */
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
 