/**
 * Type definitions for React Navigation
 */

export type RootStackParamList = {
  Welcome: undefined;
  CameraPermission: undefined;
  GestureTutorial: undefined;
  InteractivePractice: undefined;
  Dashboard: undefined;
  PictionaryModeSelection: undefined;
  PictionaryGameplay: undefined;
  PictionaryResults: {
    result: 'success' | 'timeout';
    word: string;
    emoji: string;
    timeElapsed: number;
    attemptCount: number;
    drawing?: string;
  };
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  CameraPermission: undefined;
  GestureTutorial: undefined;
  InteractivePractice: undefined;
};

export type PictionaryStackParamList = {
  ModeSelection: undefined;
  Gameplay: undefined;
  Results: {
    result: 'success' | 'timeout';
    word: string;
    emoji: string;
    timeElapsed: number;
    attemptCount: number;
    drawing?: string;
  };
};
