/**
 * App.tsx - Root component
 */

import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { isOnboardingComplete } from './src/services/storageService';
import { RootStackParamList } from './src/types/navigation.types';
import colors from './src/theme/colors';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import CameraPermissionScreen from './src/screens/CameraPermissionScreen';
import GestureTutorialScreen from './src/screens/GestureTutorialScreen';
import InteractivePracticeScreen from './src/screens/InteractivePracticeScreen';
import GamesDashboardScreen from './src/screens/GamesDashboardScreen';
import ModeSelectionScreen from './src/screens/pictionary/ModeSelectionScreen';
import GameplayScreen from './src/screens/pictionary/GameplayScreen';
import ResultsScreen from './src/screens/pictionary/ResultsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Welcome');
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await isOnboardingComplete();
      setInitialRoute(completed ? 'Dashboard' : 'Welcome');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setInitialRoute('Welcome');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttonPrimary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.background },
            animationEnabled: true,
          }}
        >
          {/* Onboarding Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="CameraPermission"
            component={CameraPermissionScreen}
          />
          <Stack.Screen
            name="GestureTutorial"
            component={GestureTutorialScreen}
          />
          <Stack.Screen
            name="InteractivePractice"
            component={InteractivePracticeScreen}
          />

          {/* Main Dashboard */}
          <Stack.Screen name="Dashboard" component={GamesDashboardScreen} />

          {/* Pictionary Game Flow */}
          <Stack.Screen
            name="PictionaryModeSelection"
            component={ModeSelectionScreen}
          />
          <Stack.Screen
            name="PictionaryGameplay"
            component={GameplayScreen}
          />
          <Stack.Screen
            name="PictionaryResults"
            component={ResultsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
