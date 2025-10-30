/**
 * GamesDashboardScreen - Main hub for game selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import GameCard from '../components/GameCard';
import Toast from '../components/Toast';
import colors from '../theme/colors';
import { spacing, borderRadius, fontSize } from '../theme/spacing';

type GamesDashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

interface Props {
  navigation: GamesDashboardScreenNavigationProp;
}

interface Game {
  id: number;
  icon: string;
  name: string;
  status: 'live' | 'locked';
  isFeatured?: boolean;
  route?: keyof RootStackParamList;
}

const games: Game[] = [
  {
    id: 1,
    icon: '🎨',
    name: 'AIR PICTIONARY',
    status: 'live',
    isFeatured: true,
    route: 'PictionaryModeSelection',
  },
  {
    id: 2,
    icon: '🎯',
    name: 'TARGET TAP',
    status: 'locked',
  },
  {
    id: 3,
    icon: '🎵',
    name: 'BEAT MASTER',
    status: 'locked',
  },
  {
    id: 4,
    icon: '🧩',
    name: 'PUZZLE SWIPE',
    status: 'locked',
  },
  {
    id: 5,
    icon: '⚡',
    name: 'SPEED STACK',
    status: 'locked',
  },
  {
    id: 6,
    icon: '🎪',
    name: 'JUGGLE PRO',
    status: 'locked',
  },
  {
    id: 7,
    icon: '🌀',
    name: 'SPIN MASTER',
    status: 'locked',
  },
  {
    id: 8,
    icon: '🎭',
    name: 'MIME TIME',
    status: 'locked',
  },
];

export default function GamesDashboardScreen({ navigation }: Props) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleGamePress = (game: Game) => {
    if (game.status === 'locked') {
      // Show "Coming Soon" toast
      setToastMessage('🔒 Coming Soon! More games launching soon.');
      setToastVisible(true);
    } else if (game.route) {
      // Navigate to the game
      navigation.navigate(game.route);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚡ GESTURE GAMES</Text>
          <Text style={styles.headerSubtitle}>Next-Gen Hand Control</Text>
        </View>

        {/* Camera status indicator */}
        <View style={styles.cameraStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>CAMERA TRACKING ACTIVE</Text>
        </View>

        {/* Games grid */}
        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              icon={game.icon}
              name={game.name}
              status={game.status}
              isFeatured={game.isFeatured}
              onPress={() => handleGamePress(game)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Toast notification */}
      <Toast
        message={toastMessage}
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
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  cameraStatus: {
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.buttonPrimary,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: fontSize.sm,
    color: '#cccccc',
    fontWeight: 'bold',
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 5,
  },
});
