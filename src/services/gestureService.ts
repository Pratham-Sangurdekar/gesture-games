/**
 * Gesture service - MediaPipe Hands integration and gesture detection
 *
 * Note: This implementation provides the structure for MediaPipe integration.
 * In production, you may need to use platform-specific implementations or
 * a web view bridge for MediaPipe Hands in React Native.
 */

import {
  HandLandmarks,
  GestureState,
  FingerPosition,
  ScreenPosition,
  GestureType,
  DetectedGesture,
} from '../types/gesture.types';

// MediaPipe landmark indices
export const LANDMARK_INDICES = {
  THUMB_TIP: 4,
  INDEX_TIP: 8,
  INDEX_MCP: 6,
  MIDDLE_TIP: 12,
  RING_TIP: 16,
  PINKY_TIP: 20,
  WRIST: 0,
};

/**
 * Calculate distance between two points
 */
const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Detect PINCH gesture (thumb and index finger together)
 */
export const detectPinch = (landmarks: HandLandmarks): boolean => {
  if (!landmarks || landmarks.length < 21) return false;

  const thumbTip = landmarks[LANDMARK_INDICES.THUMB_TIP];
  const indexTip = landmarks[LANDMARK_INDICES.INDEX_TIP];

  const distance = calculateDistance(
    thumbTip.x,
    thumbTip.y,
    indexTip.x,
    indexTip.y
  );

  // Pinch detected if distance is less than 0.05 in normalized coordinates
  return distance < 0.05;
};

/**
 * Detect POINT gesture (index finger extended, others curled)
 */
export const detectPoint = (landmarks: HandLandmarks): boolean => {
  if (!landmarks || landmarks.length < 21) return false;

  const indexTip = landmarks[LANDMARK_INDICES.INDEX_TIP];
  const indexMcp = landmarks[LANDMARK_INDICES.INDEX_MCP];

  // Index finger should be extended (tip higher than middle joint)
  const indexExtended = indexTip.y < indexMcp.y;

  return indexExtended;
};

/**
 * Detect FIST gesture (all fingers curled)
 */
export const detectFist = (landmarks: HandLandmarks): boolean => {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[LANDMARK_INDICES.WRIST];
  const thumbTip = landmarks[LANDMARK_INDICES.THUMB_TIP];
  const indexTip = landmarks[LANDMARK_INDICES.INDEX_TIP];
  const middleTip = landmarks[LANDMARK_INDICES.MIDDLE_TIP];
  const ringTip = landmarks[LANDMARK_INDICES.RING_TIP];
  const pinkyTip = landmarks[LANDMARK_INDICES.PINKY_TIP];

  // All fingertips should be close to the wrist (curled)
  const allCurled =
    indexTip.y > wrist.y &&
    middleTip.y > wrist.y &&
    ringTip.y > wrist.y &&
    pinkyTip.y > wrist.y;

  return allCurled;
};

/**
 * Get finger tip position for cursor tracking
 */
export const getFingerTipPosition = (
  landmarks: HandLandmarks
): FingerPosition | null => {
  if (!landmarks || landmarks.length < 21) return null;

  const indexTip = landmarks[LANDMARK_INDICES.INDEX_TIP];

  return {
    x: indexTip.x,
    y: indexTip.y,
  };
};

/**
 * Map normalized MediaPipe coordinates (0-1) to screen pixel coordinates
 * Applies mirroring for front camera
 */
export const mapToScreenCoordinates = (
  normalizedX: number,
  normalizedY: number,
  screenWidth: number,
  screenHeight: number,
  mirror: boolean = true
): ScreenPosition => {
  // Mirror X coordinate for front camera
  const x = mirror ? (1 - normalizedX) * screenWidth : normalizedX * screenWidth;
  const y = normalizedY * screenHeight;

  return { x, y };
};

/**
 * Get overall gesture state from landmarks
 */
export const getGestureState = (landmarks: HandLandmarks): GestureState => {
  return {
    isPinching: detectPinch(landmarks),
    isPointing: detectPoint(landmarks),
    isFist: detectFist(landmarks),
    confidence: 1.0, // MediaPipe provides confidence, default to 1.0 for now
  };
};

/**
 * Detect current gesture type
 */
export const detectGestureType = (landmarks: HandLandmarks): GestureType => {
  if (!landmarks || landmarks.length < 21) return 'none';

  if (detectFist(landmarks)) return 'fist';
  if (detectPinch(landmarks)) return 'pinch';
  if (detectPoint(landmarks)) return 'point';

  return 'none';
};

/**
 * Mock MediaPipe initialization
 * In production, this would initialize the MediaPipe Hands model
 */
export const initializeMediaPipe = async (): Promise<boolean> => {
  try {
    // In production: Load MediaPipe Hands model
    // For now, return success
    console.log('MediaPipe initialized (mock)');
    return true;
  } catch (error) {
    console.error('Error initializing MediaPipe:', error);
    return false;
  }
};

/**
 * Mock frame processing
 * In production, this would process camera frames and return landmarks
 */
export const processFrame = async (
  imageData: any
): Promise<HandLandmarks | null> => {
  // In production: Process frame with MediaPipe and return landmarks
  // For now, return null (no hand detected)
  return null;
};

export default {
  initializeMediaPipe,
  processFrame,
  detectPinch,
  detectPoint,
  detectFist,
  getFingerTipPosition,
  mapToScreenCoordinates,
  getGestureState,
  detectGestureType,
};
