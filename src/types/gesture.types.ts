/**
 * Type definitions for gesture tracking and recognition
 */

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export type HandLandmarks = HandLandmark[];

export interface GestureState {
  isPinching: boolean;
  isPointing: boolean;
  isFist: boolean;
  confidence: number;
}

export interface FingerPosition {
  x: number;
  y: number;
}

export type GestureType = 'pinch' | 'point' | 'swipe' | 'draw' | 'fist' | 'none';

export interface DetectedGesture {
  type: GestureType;
  confidence: number;
  timestamp: number;
}

export interface ScreenPosition {
  x: number;
  y: number;
}
