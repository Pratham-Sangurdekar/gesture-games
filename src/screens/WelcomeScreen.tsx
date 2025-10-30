/**
 * WelcomeScreen - First onboarding screen
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
import { RootStackParamList } from '../types/navigation.types';
import colors from '../theme/colors';
import { spacing, borderRadius, fontSize, iconSize } from '../theme/spacing';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

export default function WelcomeScreen({ navigation }: Props) {
  const handleGetStarted = () => {
    navigation.navigate('CameraPermission');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <Text style={styles.icon}>⚡</Text>

        {/* Title */}
        <Text style={styles.title}>GESTURE GAMES</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Control games with your hands.{'\n'}
          No tapping. Just gestures.
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
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
  icon: {
    fontSize: iconSize.xl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.mega,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  tagline: {
    fontSize: fontSize.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    padding: spacing.md,
    borderRadius: borderRadius.xxl,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
});
