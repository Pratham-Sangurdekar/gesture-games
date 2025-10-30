/**
 * ModeSelectionScreen - Choose game mode (VS AI or Private Room)
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
import { RootStackParamList } from '../../types/navigation.types';
import Toast from '../../components/Toast';
import colors from '../../theme/colors';
import { spacing, borderRadius, fontSize, iconSize } from '../../theme/spacing';

type ModeSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PictionaryModeSelection'
>;

interface Props {
  navigation: ModeSelectionScreenNavigationProp;
}

export default function ModeSelectionScreen({ navigation }: Props) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleVSAI = () => {
    navigation.navigate('PictionaryGameplay');
  };

  const handlePrivateRoom = () => {
    setToastVisible(true);
  };

  const handleBack = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.icon}>🎨</Text>
          <Text style={styles.title}>AIR PICTIONARY</Text>
          <Text style={styles.description}>
            Draw in the air. Let AI guess your drawings!
          </Text>
        </View>

        {/* Mode cards */}
        <View style={styles.modesContainer}>
          {/* VS AI Mode - Playable */}
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={handleVSAI}
            activeOpacity={0.8}
          >
            <Text style={styles.modeIcon}>🤖</Text>
            <View style={styles.modeContent}>
              <Text style={styles.modeTitle}>VS AI</Text>
              <Text style={styles.modeDescription}>
                Draw a word and let the AI guess what you're drawing
              </Text>
              <View style={styles.modeMetaContainer}>
                <View style={styles.modeBadge}>
                  <Text style={styles.modeBadgeText}>QUICK START</Text>
                </View>
                <Text style={styles.modeMeta}>Solo play</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Private Room - Locked */}
          <TouchableOpacity
            style={styles.lockedCard}
            onPress={handlePrivateRoom}
            activeOpacity={0.7}
          >
            <Text style={styles.modeIcon}>👥</Text>
            <View style={styles.modeContent}>
              <Text style={styles.modeTitle}>PRIVATE ROOM</Text>
              <Text style={styles.modeDescription}>
                Create a room and play with friends online
              </Text>
              <View style={styles.modeMetaContainer}>
                <View style={styles.modeBadgeLocked}>
                  <Text style={styles.modeBadgeText}>COMING SOON</Text>
                </View>
                <Text style={styles.modeMeta}>Multiplayer</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hint */}
        <View style={styles.hintCard}>
          <Text style={styles.hintText}>
            👆 Point to select • 🤏 Pinch to confirm
          </Text>
        </View>
      </View>

      <Toast
        message="🔒 Multiplayer coming soon!"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.lg,
  },
  backButtonText: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: iconSize.xl,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modesContainer: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  featuredCard: {
    backgroundColor: colors.cardBackgroundLight,
    borderWidth: 3,
    borderColor: colors.borderHighlight,
    borderRadius: borderRadius.lg,
    padding: spacing.xxl,
    flexDirection: 'row',
    gap: spacing.xl,
  },
  lockedCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.xxl,
    flexDirection: 'row',
    gap: spacing.xl,
    opacity: 0.8,
  },
  modeIcon: {
    fontSize: iconSize.lg,
  },
  modeContent: {
    flex: 1,
  },
  modeTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  modeDescription: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  modeMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  modeBadge: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
  },
  modeBadgeLocked: {
    backgroundColor: colors.border,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
  },
  modeBadgeText: {
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  modeMeta: {
    fontSize: fontSize.sm,
    color: colors.border,
  },
  hintCard: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  hintText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
