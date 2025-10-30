/**
 * ResultsScreen - Show game results
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import colors from '../../theme/colors';
import { spacing, borderRadius, fontSize } from '../../theme/spacing';

type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PictionaryResults'
>;

type ResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PictionaryResults'
>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

export default function ResultsScreen({ navigation, route }: Props) {
  const { result, word, emoji, timeElapsed, attemptCount } = route.params;

  const isSuccess = result === 'success';

  const handlePlayAgain = () => {
    navigation.navigate('PictionaryGameplay');
  };

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.resultsCard}>
          {/* Icon */}
          <Text style={styles.icon}>{isSuccess ? '🎉' : '⏱'}</Text>

          {/* Title */}
          <Text style={styles.title}>
            {isSuccess ? 'SUCCESS!' : "TIME'S UP"}
          </Text>

          {/* Message */}
          <Text style={styles.message}>
            {isSuccess
              ? 'AI guessed your drawing!'
              : `The word was: ${word} ${emoji}`}
          </Text>

          {/* Stats */}
          <View style={styles.stats}>
            {isSuccess ? (
              <>
                <Text style={styles.statText}>Time: {formatTime(timeElapsed)}</Text>
                <Text style={styles.statText}>AI attempts: {attemptCount}</Text>
                <Text style={styles.statText}>
                  Your word: {word} {emoji}
                </Text>
              </>
            ) : (
              <Text style={styles.statText}>
                Better luck next time! Try drawing again.
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handlePlayAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackToDashboard}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
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
  resultsCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.xl,
    padding: spacing.xxxl,
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.mega,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  stats: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  statText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    borderWidth: 2,
    borderColor: colors.borderBright,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
