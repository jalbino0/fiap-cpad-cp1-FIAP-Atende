import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AtendimentoProvider } from '../context/AtendimentoContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AtendimentoProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#050505' },
          }}
        />
      </AtendimentoProvider>
    </SafeAreaProvider>
  );
}
