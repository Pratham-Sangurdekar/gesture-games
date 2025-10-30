/**
 * Root Navigator - Main navigation structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';

// Import screens (will be created next)
import WelcomeScreen from '../screens/WelcomeScreen';
import CameraPermissionScreen from '../screens/CameraPermissionScreen';
import GestureTutorialScreen from '../screens/GestureTutorialScreen';
import InteractivePracticeScreen from '../screens/InteractivePracticeScreen';
import GamesDashboardScreen from '../screens/GamesDashboardScreen';
import ModeSelectionScreen from '../screens/pictionary/ModeSelectionScreen';
import GameplayScreen from '../screens/pictionary/GameplayScreen';
import ResultsScreen from '../screens/pictionary/ResultsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#333333' },
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
  );
}
