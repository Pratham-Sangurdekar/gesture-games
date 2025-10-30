/**
 * Type definitions for game state and logic
 */

export interface Word {
  word: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AIGuess {
  guess: string;
  confidence: number;
  timestamp: number;
  isCorrect: boolean;
}

export interface GameState {
  currentWord: Word | null;
  timeRemaining: number;
  aiGuesses: AIGuess[];
  isGameActive: boolean;
  gameResult: 'success' | 'timeout' | null;
}

export interface DrawingPoint {
  x: number;
  y: number;
  timestamp: number;
}

export type DrawingStroke = DrawingPoint[];

export interface GameResult {
  success: boolean;
  word: Word;
  timeElapsed: number;
  attemptCount: number;
  drawing?: string; // base64 image
}
