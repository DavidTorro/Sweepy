import { Stack } from 'expo-router';
import { COLORS, FONTS } from '@/utils/theme';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: FONTS.bold,
          fontSize: 18,
        },
        headerTitle: 'Administración',
      }}
    />
  );
}
