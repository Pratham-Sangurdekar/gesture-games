/**
 * GameCard component - Card for displaying games on Dashboard
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { borderRadius, spacing, fontSize, iconSize } from '../theme/spacing';

interface GameCardProps {
  icon: string;
  name: string;
  status: 'live' | 'locked';
  isFeatured?: boolean;
  isHighlighted?: boolean;
  onPress?: () => void;
}

export default function GameCard({
  icon,
  name,
  status,
  isFeatured = false,
  isHighlighted = false,
  onPress,
}: GameCardProps) {
  const isLocked = status === 'locked';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFeatured && styles.featuredCard,
        isHighlighted && styles.highlightedCard,
        isLocked && styles.lockedCard,
      ]}
      onPress={onPress}
      activeOpacity={isLocked ? 1 : 0.7}
      disabled={isLocked}
    >
      {isFeatured && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW</Text>
        </View>
      )}

      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.status, isLocked && styles.statusLocked]}>
        {status === 'live' ? '● LIVE' : '○ LOCKED'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  featuredCard: {
    backgroundColor: colors.cardBackgroundLight,
    borderWidth: 3,
    borderColor: colors.borderHighlight,
  },
  highlightedCard: {
    borderColor: colors.borderBright,
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },
  lockedCard: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.buttonPrimary,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: fontSize.tiny,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: iconSize.md,
    marginBottom: spacing.sm,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.base,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  status: {
    color: colors.textPrimary,
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
  statusLocked: {
    color: colors.textSecondary,
  },
});
