/**
 * InteractivePracticeScreen - Practice gestures with live camera
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import { setOnboardingComplete } from '../services/storageService';
import colors from '../theme/colors';
import { spacing, borderRadius, fontSize } from '../theme/spacing';

type InteractivePracticeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InteractivePractice'
>;

interface Props {
  navigation: InteractivePracticeScreenNavigationProp;
}

interface Task {
  id: number;
  name: string;
  emoji: string;
  hint: string;
}

const tasks: Task[] = [
  {
    id: 1,
    name: 'PINCH',
    emoji: '👌',
    hint: 'Bring your thumb and index finger together',
  },
  {
    id: 2,
    name: 'POINT',
    emoji: '👆',
    hint: 'Extend your index finger',
  },
  {
    id: 3,
    name: 'DRAW',
    emoji: '✍️',
    hint: 'Move your extended finger in a circle',
  },
];

export default function InteractivePracticeScreen({ navigation }: Props) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;
  const allTasksComplete = currentTaskIndex >= tasks.length;

  useEffect(() => {
    // Simulate gesture detection
    // In production, this would use MediaPipe to detect actual gestures
    const simulateDetection = setTimeout(() => {
      if (!allTasksComplete && !isSuccess) {
        handleGestureDetected();
      }
    }, 3000); // Simulate detection after 3 seconds

    return () => clearTimeout(simulateDetection);
  }, [currentTaskIndex, isSuccess]);

  const handleGestureDetected = () => {
    setIsSuccess(true);

    // Move to next task after showing success
    setTimeout(() => {
      setIsSuccess(false);
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        // All tasks complete
        setCurrentTaskIndex(tasks.length);
      }
    }, 1500);
  };

  const handleContinue = async () => {
    // Mark onboarding as complete
    await setOnboardingComplete();
    // Navigate to Dashboard
    navigation.navigate('Dashboard');
  };

  const handleSkip = async () => {
    await setOnboardingComplete();
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Try It Yourself</Text>
        <Text style={styles.subtitle}>Follow the instructions below</Text>

        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Camera view */}
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={CameraType.front}
            onCameraReady={() => setCameraReady(true)}
          >
            <Text style={styles.cameraLabel}>LIVE CAMERA FEED</Text>
          </Camera>
        </View>

        {!allTasksComplete ? (
          <>
            {/* Instruction card */}
            <View style={styles.instructionCard}>
              <Text style={styles.taskNumber}>
                TASK {currentTask.id} OF {tasks.length}
              </Text>
              <Text style={styles.taskDescription}>
                Make a {currentTask.name} gesture {currentTask.emoji}
              </Text>
              <Text style={styles.hint}>{currentTask.hint}</Text>
            </View>

            {/* Status indicator */}
            <View style={styles.statusCard}>
              {isSuccess ? (
                <Text style={styles.statusSuccess}>
                  ✓ Perfect! Moving to next task
                </Text>
              ) : (
                <Text style={styles.statusWaiting}>
                  ⚡ Waiting for gesture...
                </Text>
              )}
            </View>
          </>
        ) : (
          <View style={styles.completeCard}>
            <Text style={styles.completeEmoji}>🎉</Text>
            <Text style={styles.completeText}>All Tasks Complete!</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {allTasksComplete ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>CONTINUE TO GAMES</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>SKIP PRACTICE</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.buttonPrimary,
    borderRadius: 4,
  },
  cameraContainer: {
    height: 280,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  camera: {
    flex: 1,
  },
  cameraLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    padding: spacing.sm,
  },
  instructionCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    marginBottom: spacing.md,
  },
  taskNumber: {
    fontSize: fontSize.base,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  taskDescription: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  hint: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statusCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  statusWaiting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  statusSuccess: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  completeCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.lg,
    padding: spacing.xxxl,
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  completeEmoji: {
    fontSize: 60,
    marginBottom: spacing.md,
  },
  completeText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  buttonContainer: {
    marginTop: spacing.lg,
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
  secondaryButton: {
    backgroundColor: colors.border,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
