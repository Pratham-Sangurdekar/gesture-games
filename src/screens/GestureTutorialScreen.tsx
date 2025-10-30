/**
 * GestureTutorialScreen - Teach users the gestures
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import colors from '../theme/colors';
import { spacing, borderRadius, fontSize, iconSize } from '../theme/spacing';

type GestureTutorialScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GestureTutorial'
>;

interface Props {
  navigation: GestureTutorialScreenNavigationProp;
}

interface GestureInfo {
  emoji: string;
  name: string;
  description: string;
}

const tutorialPages: GestureInfo[][] = [
  // Page 1 - POINT and PINCH
  [
    {
      emoji: '👆',
      name: 'POINT',
      description: 'Extend index finger to hover and select items',
    },
    {
      emoji: '🤏',
      name: 'PINCH',
      description: 'Pinch thumb and finger together to click and confirm',
    },
  ],
  // Page 2 - SWIPE
  [
    {
      emoji: '👈👉',
      name: 'SWIPE',
      description: 'Move hand left or right to navigate',
    },
  ],
  // Page 3 - DRAW
  [
    {
      emoji: '✍️',
      name: 'DRAW',
      description: 'Extend index finger and move to draw in the air',
    },
  ],
];

export default function GestureTutorialScreen({ navigation }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < tutorialPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Last page, navigate to practice
      navigation.navigate('InteractivePractice');
    }
  };

  const handleSkip = () => {
    navigation.navigate('InteractivePractice');
  };

  const gestures = tutorialPages[currentPage];
  const isLastPage = currentPage === tutorialPages.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Learn Gestures</Text>

        {/* Gesture cards */}
        <View style={styles.cardsContainer}>
          {gestures.map((gesture, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.emoji}>{gesture.emoji}</Text>
              <Text style={styles.gestureName}>{gesture.name}</Text>
              <Text style={styles.description}>{gesture.description}</Text>
            </View>
          ))}
        </View>

        {/* Progress dots */}
        <View style={styles.progressDots}>
          {tutorialPages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {isLastPage ? 'TRY IT' : 'NEXT'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Skip Tutorial</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
  },
  cardsContainer: {
    gap: spacing.xl,
    marginBottom: spacing.xxxl,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emoji: {
    fontSize: iconSize.lg,
    marginBottom: spacing.md,
  },
  gestureName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.buttonPrimary,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  skipButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
