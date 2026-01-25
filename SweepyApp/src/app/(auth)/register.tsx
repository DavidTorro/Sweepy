import SocialButton from "@/components/auth/SocialButton";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import TextField from "@/components/ui/TextField";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useAuthStore } from "@/stores/auth.store";
import { registerStyles } from "@/styles/pages/auth/registerStyles";
import { APP, ROUTES } from "@/utils/constants/constants";
import { COLORS } from "@/utils/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RegisterScreen() {
  const { register, isLoading, error, clearError } = useAuthStore();
  const { showPassword, toggleShowPassword, rightIcon } =
    usePasswordVisibility();
  const [registerError, setRegisterError] = useState("");

  const form = useRegisterForm({
    onSubmit: async (data) => {
      clearError();
      setRegisterError("");
      try {
        await register(data.email, data.username, data.password);
        console.log("Usuario registrado con éxito:");
        console.log("Usuario:", data.username);
        console.log("Email:", data.email);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al registrarse";
        setRegisterError(errorMessage);
      }
    },
  });

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.mint, COLORS.primaryLight]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require("../../../assets/resources/Sweepy_Letter.png")}
            style={styles.logo}
          />

          {/* Título */}
          <Text style={styles.title}>{APP.NAME}</Text>
          <Text style={styles.subtitle}>
            Rellena los campos para crear una cuenta
          </Text>

          {/* FORMULARIO */}
          <View style={styles.form}>
            <Text style={styles.label}>Nombre de usuario</Text>

            <TextField
              placeholder="nombre de usuario"
              value={form.values.username}
              onChangeText={(text) => form.setFieldValue("username", text)}
              leftIcon="person-outline"
              error={!!form.errors.username}
            />
            {form.errors.username && (
              <Text style={styles.errorText}>{form.errors.username}</Text>
            )}

            <Text style={[styles.label, { marginTop: 10 }]}>
              Correo electrónico
            </Text>

            <TextField
              placeholder="nombre@ejemplo.com"
              value={form.values.email}
              onChangeText={(text) => form.setFieldValue("email", text)}
              leftIcon="mail-outline"
              error={!!form.errors.email}
            />
            {form.errors.email && (
              <Text style={styles.errorText}>{form.errors.email}</Text>
            )}

            <Text style={[styles.label, { marginTop: 10 }]}>Contraseña</Text>

            <TextField
              placeholder="********"
              value={form.values.password}
              onChangeText={(text: string) =>
                form.setFieldValue("password", text)
              }
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={rightIcon}
              onRightIconPress={toggleShowPassword}
              error={!!form.errors.password}
            />

            <Text style={[styles.label, { marginTop: 10 }]}>
              Confirmar contraseña
            </Text>

            <TextField
              placeholder="********"
              value={form.values.confirmPassword}
              onChangeText={(text: string) =>
                form.setFieldValue("confirmPassword", text)
              }
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={rightIcon}
              onRightIconPress={toggleShowPassword}
              error={!!form.errors.confirmPassword}
              style={{ marginBottom: 25 }}
            />

            {/* MENSAJES DE ERROR */}
            {form.errors.confirmPassword && (
              <Text style={styles.errorText}>{form.errors.confirmPassword}</Text>
            )}
            {form.errors.password && (
              <Text style={styles.errorText}>{form.errors.password}</Text>
            )}

            {/* BOTÓN REGISTER */}
            <Button
              style={styles.formButton}
              title={form.isSubmitting ? "Registrando..." : "Registrarse"}
              variant="primary"
              onPress={form.handleSubmit}
              disabled={form.isSubmitting}
            />
          </View>

          {/* Separador */}
          <Separator text="O continúa con" />

          {/* Botón Google */}
          <SocialButton
            style={styles.formButton}
            title="Continuar con Google"
            onPress={() => console.log("Google register")}
          />
          {/* Ir a login */}
          <Text style={styles.login}>
            ¿Ya tienes una cuenta?{" "}
            <Link href={ROUTES.LOGIN} style={styles.loginLink}>
              Inicia sesión
            </Link>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = registerStyles;
