import { useAuth } from "@/providers/AuthProvider";
import { requireAuthStyles } from "@/styles/components/RequireAuthStyles";
import { ROUTES } from "@/utils/constants/constants";
import { COLORS } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Button from "../ui/Button";

interface RequireAuthProps {
  children: React.ReactNode;
  role?: "user" | "admin";
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  // Si requiere un rol específico y no lo tiene
  if (role === "admin" && !isAdmin) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={64} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Acceso denegado</Text>
          <Text style={styles.subtitle}>
            Necesitas ser administrador para acceder a esta sección
          </Text>

          <Button
            title="Volver"
            onPress={() => router.back()}
            style={styles.button}
          />
        </View>
      </View>
    );
  }

  // Si requiere autenticación general y no está autenticado
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={64} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Inicia sesión para continuar</Text>
          <Text style={styles.subtitle}>
            Necesitas tener una cuenta para acceder a esta sección
          </Text>

          <Button
            title="Iniciar sesión"
            onPress={() => router.push(ROUTES.LOGIN)}
            style={styles.button}
          />

          <Button
            title="Crear cuenta"
            onPress={() => router.push(ROUTES.REGISTER)}
            variant="outline"
            style={styles.buttonOutline}
          />
        </View>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = requireAuthStyles;
