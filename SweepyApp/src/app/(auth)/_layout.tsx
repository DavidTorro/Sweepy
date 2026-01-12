import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F7F9FA' },
        gestureEnabled: false,
      }}
    />
  );
}
