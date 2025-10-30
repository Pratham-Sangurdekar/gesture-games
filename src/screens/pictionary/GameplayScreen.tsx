/**
 * GameplayScreen - Main Pictionary game with drawing canvas
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation.types';
import { selectRandomWord } from '../../services/wordService';
import { analyzeDrawing } from '../../services/aiService';
import { Word, AIGuess, DrawingStroke } from '../../types/game.types';
import colors from '../../theme/colors';
import { spacing, borderRadius, fontSize } from '../../theme/spacing';

type GameplayScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PictionaryGameplay'
>;

interface Props {
  navigation: GameplayScreenNavigationProp;
}

const GAME_DURATION = 120; // 2 minutes in seconds
const { width } = Dimensions.get('window');
const CANVAS_HEIGHT = 350;

export default function GameplayScreen({ navigation }: Props) {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [aiGuesses, setAiGuesses] = useState<AIGuess[]>([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [strokes, setStrokes] = useState<DrawingStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const gameStartTime = useRef(Date.now());
  const aiRequestTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize game
  useEffect(() => {
    const word = selectRandomWord();
    setCurrentWord(word);
    gameStartTime.current = Date.now();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive]);

  // Request AI guesses periodically while drawing
  useEffect(() => {
    if (!isGameActive || strokes.length === 0) return;

    // Throttle AI requests to once per 2 seconds
    if (aiRequestTimeout.current) {
      clearTimeout(aiRequestTimeout.current);
    }

    aiRequestTimeout.current = setTimeout(() => {
      requestAIGuess();
    }, 2000);

    return () => {
      if (aiRequestTimeout.current) {
        clearTimeout(aiRequestTimeout.current);
      }
    };
  }, [strokes]);

  const requestAIGuess = async () => {
    if (!currentWord) return;

    // In production, capture canvas as base64 image
    // For now, use mock AI service
    const result = await analyzeDrawing('', currentWord.word);

    if (result.guesses.length > 0) {
      const newGuesses: AIGuess[] = result.guesses.map((guess) => ({
        guess,
        confidence: 0.8,
        timestamp: Date.now(),
        isCorrect: result.isCorrect && result.matchedGuess === guess,
      }));

      setAiGuesses((prev) => [...prev, ...newGuesses].slice(-3));

      if (result.isCorrect) {
        handleSuccess();
      }
    }
  };

  const handleSuccess = () => {
    setIsGameActive(false);
    const timeElapsed = GAME_DURATION - timeRemaining;

    navigation.navigate('PictionaryResults', {
      result: 'success',
      word: currentWord!.word,
      emoji: currentWord!.emoji,
      timeElapsed,
      attemptCount: aiGuesses.length,
    });
  };

  const handleTimeout = () => {
    setIsGameActive(false);

    navigation.navigate('PictionaryResults', {
      result: 'timeout',
      word: currentWord!.word,
      emoji: currentWord!.emoji,
      timeElapsed: GAME_DURATION,
      attemptCount: aiGuesses.length,
    });
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigation.navigate('Dashboard');
  };

  const cancelExit = () => {
    setShowExitDialog(false);
  };

  // Drawing handlers (simplified - would use gesture tracking in production)
  const handleDrawStart = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setIsDrawing(true);
    setCurrentStroke([{ x: locationX, y: locationY, timestamp: Date.now() }]);
  };

  const handleDrawMove = (event: any) => {
    if (!isDrawing) return;

    const { locationX, locationY } = event.nativeEvent;
    setCurrentStroke((prev) => [
      ...prev,
      { x: locationX, y: locationY, timestamp: Date.now() },
    ]);
  };

  const handleDrawEnd = () => {
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const pathFromStroke = (stroke: DrawingStroke): string => {
    if (stroke.length === 0) return '';

    let path = `M ${stroke[0].x} ${stroke[0].y}`;
    for (let i = 1; i < stroke.length; i++) {
      path += ` L ${stroke[i].x} ${stroke[i].y}`;
    }
    return path;
  };

  if (!currentWord) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>⏱ {formatTime(timeRemaining)}</Text>
        </View>

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>✕ Exit</Text>
        </TouchableOpacity>
      </View>

      {/* Word prompt */}
      <View style={styles.wordPrompt}>
        <Text style={styles.wordLabel}>Draw This:</Text>
        <Text style={styles.word}>
          {currentWord.emoji} {currentWord.word}
        </Text>
      </View>

      {/* Drawing canvas */}
      <View
        style={styles.canvas}
        onTouchStart={handleDrawStart}
        onTouchMove={handleDrawMove}
        onTouchEnd={handleDrawEnd}
      >
        <Svg height={CANVAS_HEIGHT} width={width - 40}>
          {strokes.map((stroke, index) => (
            <Path
              key={index}
              d={pathFromStroke(stroke)}
              stroke={colors.drawingWhite}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentStroke.length > 0 && (
            <Path
              d={pathFromStroke(currentStroke)}
              stroke={colors.drawingWhite}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>

        <Text style={styles.handIndicator}>✋</Text>
      </View>

      {/* AI Guesses panel */}
      <View style={styles.guessesPanel}>
        <View style={styles.guessesPanelHeader}>
          <Text style={styles.guessesPanelTitle}>🤖 AI Guesses</Text>
          <Text style={styles.guessesStatus}>
            ● {aiGuesses.length > 0 ? 'Thinking...' : 'Waiting...'}
          </Text>
        </View>

        <View style={styles.guessesList}>
          {aiGuesses.length === 0 ? (
            <Text style={styles.noGuessesText}>No guesses yet</Text>
          ) : (
            aiGuesses.slice(-3).map((guess, index) => (
              <View
                key={index}
                style={[
                  styles.guessItem,
                  guess.isCorrect && styles.guessItemCorrect,
                ]}
              >
                <Text style={styles.guessIcon}>
                  {guess.isCorrect ? '✓' : '❓'}
                </Text>
                <Text
                  style={[
                    styles.guessText,
                    guess.isCorrect && styles.guessTextCorrect,
                  ]}
                >
                  {guess.guess}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>

      {/* Exit confirmation dialog */}
      <Modal
        visible={showExitDialog}
        transparent
        animationType="fade"
        onRequestClose={cancelExit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Exit Game?</Text>
            <Text style={styles.modalMessage}>Your progress will be lost</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalPrimaryButton}
                onPress={cancelExit}
              >
                <Text style={styles.modalPrimaryButtonText}>Keep Playing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSecondaryButton}
                onPress={confirmExit}
              >
                <Text style={styles.modalSecondaryButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  loadingText: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  timerContainer: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
  },
  timerText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  exitButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  exitButtonText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  wordPrompt: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  wordLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  word: {
    fontSize: fontSize.title,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  canvas: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  handIndicator: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    fontSize: 30,
    opacity: 0.5,
  },
  guessesPanel: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    height: 120,
  },
  guessesPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  guessesPanelTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  guessesStatus: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  guessesList: {
    gap: 6,
  },
  noGuessesText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  guessItem: {
    backgroundColor: colors.cardBackgroundLight,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  guessItemCorrect: {
    backgroundColor: colors.accentGreenTint,
    borderWidth: 1,
    borderColor: colors.accentGreenBorder,
  },
  guessIcon: {
    fontSize: fontSize.lg,
  },
  guessText: {
    fontSize: fontSize.base,
    color: '#cccccc',
  },
  guessTextCorrect: {
    color: colors.accentGreen,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '80%',
  },
  modalTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalMessage: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  modalButtons: {
    gap: spacing.md,
  },
  modalPrimaryButton: {
    backgroundColor: colors.buttonPrimary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  modalPrimaryButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  modalSecondaryButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  modalSecondaryButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
