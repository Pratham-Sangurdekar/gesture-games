/**
 * Toast component - Notification message that slides up from bottom
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../theme/colors';
import { borderRadius, spacing, fontSize } from '../theme/spacing';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
}

export default function Toast({
  message,
  visible,
  duration = 2000,
  onHide,
}: ToastProps) {
  const translateY = React.useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      // Slide up
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto hide after duration
      const timeout = setTimeout(() => {
        // Slide down
        Animated.timing(translateY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide?.();
        });
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [visible, duration, onHide, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.toast}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minWidth: 200,
  },
  text: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    textAlign: 'center',
  },
});
