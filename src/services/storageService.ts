/**
 * Storage service - AsyncStorage wrapper for app data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  RECENT_WORDS: 'recent_words',
};

/**
 * Mark onboarding as complete
 */
export const setOnboardingComplete = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
};

/**
 * Check if user has completed onboarding
 */
export const isOnboardingComplete = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Save recent words to prevent repetition
 * Keeps last 5 words
 */
export const saveRecentWords = async (words: string[]): Promise<void> => {
  try {
    // Keep only last 5 words
    const recentWords = words.slice(-5);
    await AsyncStorage.setItem(KEYS.RECENT_WORDS, JSON.stringify(recentWords));
  } catch (error) {
    console.error('Error saving recent words:', error);
  }
};

/**
 * Get recent words
 */
export const getRecentWords = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.RECENT_WORDS);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error getting recent words:', error);
    return [];
  }
};

/**
 * Clear all app data (for development/debugging)
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log('All app data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export default {
  setOnboardingComplete,
  isOnboardingComplete,
  saveRecentWords,
  getRecentWords,
  clearAllData,
};
