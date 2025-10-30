/**
 * Word service - Manages word selection for Pictionary
 */

import { Word } from '../types/game.types';
import wordsData from '../data/pictionary-words.json';

/**
 * Load words from JSON file
 */
export const loadWords = (): Word[] => {
  return wordsData as Word[];
};

/**
 * Select a random word, excluding recently used words
 */
export const selectRandomWord = (excludeWords: string[] = []): Word => {
  const allWords = loadWords();

  // Filter out excluded words
  const availableWords = allWords.filter(
    (word) => !excludeWords.includes(word.word)
  );

  // If all words have been used, reset and use all words
  const words = availableWords.length > 0 ? availableWords : allWords;

  // Select random word
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

/**
 * Get words by difficulty level
 */
export const getWordsByDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard'
): Word[] => {
  const allWords = loadWords();
  return allWords.filter((word) => word.difficulty === difficulty);
};

/**
 * Get total word count
 */
export const getWordCount = (): number => {
  return loadWords().length;
};

export default {
  loadWords,
  selectRandomWord,
  getWordsByDifficulty,
  getWordCount,
};
