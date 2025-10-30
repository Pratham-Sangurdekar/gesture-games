/**
 * AI service - OpenAI API integration for drawing recognition
 */

import axios from 'axios';
import { AIGuess } from '../types/game.types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

interface AIResponse {
  guesses: string[];
  isCorrect: boolean;
  matchedGuess?: string;
}

/**
 * Initialize AI service with API key
 */
export const initializeAI = (apiKey: string): void => {
  // Store API key for future requests
  if (!apiKey) {
    console.warn('No OpenAI API key provided. AI guessing will not work.');
  }
};

/**
 * Analyze drawing and get AI guesses
 */
export const analyzeDrawing = async (
  imageBase64: string,
  targetWord: string,
  apiKey?: string
): Promise<AIResponse> => {
  try {
    // Rate limiting check
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      console.log('Request throttled');
      return { guesses: [], isCorrect: false };
    }
    lastRequestTime = now;

    // Check if API key is provided
    if (!apiKey) {
      // Return mock guesses for development
      return getMockGuesses(targetWord);
    }

    // Make request to OpenAI GPT-4 Vision API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'This is a simple sketch drawing. What object or word could this represent? Provide exactly 3 guesses in order of confidence, separated by commas. Only provide the words, no explanations.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 5000,
      }
    );

    // Parse response
    const content = response.data.choices[0]?.message?.content || '';
    const guesses = content
      .split(',')
      .map((g: string) => g.trim().toUpperCase())
      .filter((g: string) => g.length > 0)
      .slice(0, 3);

    // Check if any guess matches target word
    const isCorrect = guesses.some((guess: string) =>
      checkMatch(guess, targetWord)
    );
    const matchedGuess = guesses.find((guess: string) =>
      checkMatch(guess, targetWord)
    );

    return {
      guesses,
      isCorrect,
      matchedGuess,
    };
  } catch (error) {
    console.error('Error analyzing drawing:', error);
    // Return mock guesses on error
    return getMockGuesses(targetWord);
  }
};

/**
 * Check if guess matches target word
 * Handles case-insensitive comparison and common variations
 */
export const checkMatch = (guess: string, targetWord: string): boolean => {
  const normalizedGuess = guess.toUpperCase().trim();
  const normalizedTarget = targetWord.toUpperCase().trim();

  // Direct match
  if (normalizedGuess === normalizedTarget) return true;

  // Check for plurals
  if (normalizedGuess === normalizedTarget + 'S') return true;
  if (normalizedGuess + 'S' === normalizedTarget) return true;

  // Common variations
  const variations: { [key: string]: string[] } = {
    CAR: ['AUTOMOBILE', 'VEHICLE'],
    HOUSE: ['HOME', 'BUILDING'],
    SMILE: ['HAPPY', 'SMILEY'],
    PHONE: ['MOBILE', 'CELL', 'CELLPHONE', 'SMARTPHONE'],
  };

  const targetVariations = variations[normalizedTarget] || [];
  if (targetVariations.includes(normalizedGuess)) return true;

  return false;
};

/**
 * Get mock guesses for development/testing
 * Simulates AI guessing with increasing accuracy
 */
let mockGuessCount = 0;
const getMockGuesses = (targetWord: string): AIResponse => {
  mockGuessCount++;

  const commonWords = [
    'CIRCLE',
    'SQUARE',
    'TRIANGLE',
    'LINE',
    'SHAPE',
    'OBJECT',
    'DRAWING',
    'SKETCH',
  ];

  // After 5-7 attempts, include the correct word
  const shouldGuessCorrect = mockGuessCount >= 5 + Math.floor(Math.random() * 3);

  let guesses: string[];
  if (shouldGuessCorrect) {
    // Include correct answer
    guesses = [
      commonWords[Math.floor(Math.random() * commonWords.length)],
      targetWord,
      commonWords[Math.floor(Math.random() * commonWords.length)],
    ];
  } else {
    // Random wrong guesses
    guesses = [
      commonWords[Math.floor(Math.random() * commonWords.length)],
      commonWords[Math.floor(Math.random() * commonWords.length)],
      commonWords[Math.floor(Math.random() * commonWords.length)],
    ];
  }

  const isCorrect = guesses.some((g) => checkMatch(g, targetWord));
  const matchedGuess = guesses.find((g) => checkMatch(g, targetWord));

  return {
    guesses,
    isCorrect,
    matchedGuess,
  };
};

/**
 * Reset mock guess counter (for testing)
 */
export const resetMockCounter = (): void => {
  mockGuessCount = 0;
};

export default {
  initializeAI,
  analyzeDrawing,
  checkMatch,
  resetMockCounter,
};
