import { COLORS, FONTS } from '@/utils/theme';
import { Stack } from 'expo-router';

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
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitle: "Detalles del Cliente",
        }}
      />
    </Stack>
  );
}
