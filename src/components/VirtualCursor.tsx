/**
 * VirtualCursor component - Cursor that follows finger position
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface VirtualCursorProps {
  x: number;
  y: number;
  visible: boolean;
}

export default function VirtualCursor({ x, y, visible }: VirtualCursorProps) {
  if (!visible) return null;

  return (
    <View
      style={[
        styles.cursor,
        {
          left: x - 10, // Center the cursor on the finger
          top: y - 10,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cursor: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    backgroundColor: 'transparent',
    zIndex: 999,
    pointerEvents: 'none',
  },
});
