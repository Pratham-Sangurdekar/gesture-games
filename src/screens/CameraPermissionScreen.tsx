/**
 * CameraPermissionScreen - Request camera access
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import { requestCameraPermission } from '../services/cameraService';
import colors from '../theme/colors';
import { spacing, borderRadius, fontSize, iconSize } from '../theme/spacing';

type CameraPermissionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CameraPermission'
>;

interface Props {
  navigation: CameraPermissionScreenNavigationProp;
}

export default function CameraPermissionScreen({ navigation }: Props) {
  const [error, setError] = useState<string>('');
  const [canAskAgain, setCanAskAgain] = useState(true);

  const handleAllowCamera = async () => {
    setError('');

    const result = await requestCameraPermission();

    if (result.granted) {
      // Permission granted, navigate to tutorial
      navigation.navigate('GestureTutorial');
    } else {
      // Permission denied
      setError('Camera required to play gesture games');
      setCanAskAgain(result.canAskAgain);
    }
  };

  const handleNotNow = () => {
    setError('Camera required to play gesture games');
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Camera Access</Text>

        {/* Icon */}
        <Text style={styles.icon}>📷</Text>

        {/* Permission reasons card */}
        <View style={styles.card}>
          <Text style={styles.reason}>✓ Track your hand movements</Text>
          <Text style={styles.reason}>✓ Recognize gestures in real-time</Text>
          <Text style={styles.reason}>✓ No recording or storage</Text>
        </View>

        {/* Error message */}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={canAskAgain ? handleAllowCamera : handleOpenSettings}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {canAskAgain ? 'ALLOW CAMERA' : 'OPEN SETTINGS'}
          </Text>
        </TouchableOpacity>

        {canAskAgain && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleNotNow}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Not Now</Text>
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
    padding: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: iconSize.xxl,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.md,
  },
  reason: {
    fontSize: fontSize.md,
    color: '#cccccc',
    marginBottom: spacing.sm,
  },
  error: {
    fontSize: fontSize.md,
    color: colors.accentRed,
    textAlign: 'center',
    marginTop: spacing.md,
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
