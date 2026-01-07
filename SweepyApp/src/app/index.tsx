import { Redirect } from 'expo-router';

// Entrada de la App que redirige a la pantalla de Login
export default function Index() {
  return <Redirect href="/auth/login"/>;
}