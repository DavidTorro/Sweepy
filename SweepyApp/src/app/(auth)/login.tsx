import SocialButton from "@/components/auth/SocialButton";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import TextField from "@/components/ui/TextField";
import { useLoginForm } from "@/hooks/useLoginForm";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { useToggle } from "@/hooks/useToggle";
import { useAuthStore } from "@/stores/auth.store";
import { loginStyles } from "@/styles/pages/auth/loginStyles";
import { APP, ERRORS, ROUTES } from "@/utils/constants/constants";
import { COLORS } from "@/utils/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login, isLoading, error, clearError } = useAuthStore();
  const { showPassword, toggleShowPassword, rightIcon } =
    usePasswordVisibility();
  const {
    isVisible: forgotVisible,
    show: showForgot,
    hide: hideForgot,
  } = useToggle(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const form = useLoginForm({
    onSubmit: async (data) => {
      clearError();
      setLoginError("");
      try {
        await login(data.email, data.password);
        router.replace(ROUTES.EXPLORAR);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERRORS.LOGIN_ERROR;
        setLoginError(errorMessage);
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
            Introduce tus credenciales para continuar
          </Text>

          {/* FORMULARIO */}
          <View style={styles.form}>
            <Text style={styles.label}>Correo electrónico</Text>

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

            <Text style={[styles.label, { marginTop: 20 }]}>Contraseña</Text>

            <TextField
              placeholder="********"
              value={form.values.password}
              onChangeText={(text) => form.setFieldValue("password", text)}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={rightIcon}
              onRightIconPress={toggleShowPassword}
              error={!!form.errors.password}
            />
            {form.errors.password && (
              <Text style={styles.errorText}>{form.errors.password}</Text>
            )}

            {/* Olvidaste tu contraseña */}
            <Text style={styles.forgot} onPress={showForgot}>
              ¿Olvidaste tu contraseña?
            </Text>

            {/* MENSAJES DE ERROR */}
            {loginError !== "" && (
              <Text style={styles.errorText}>{loginError}</Text>
            )}

            {/* BOTÓN LOGIN */}
            <Button
              style={styles.formButton}
              title={form.isSubmitting ? "Iniciando..." : "Iniciar sesión"}
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
            onPress={() => console.log("Google login")}
          />

          {/* Registro */}
          <Text style={styles.register}>
            ¿No tienes una cuenta?{" "}
            <Link href={ROUTES.REGISTER} style={styles.registerLink}>
              Regístrate
            </Link>
          </Text>

          {/* 
            Portal para administradores (CRUD DE USUARIOS) 
            parte independiente a la app  
          */}
          <Text style={styles.adminPortal}>
            Portal para administradores{" "}
            <Link href={ROUTES.ADMINLOGIN} style={styles.registerLink}>
              Acceso
            </Link>
          </Text>

          {/* MODAL OLVIDAR CONTRASEÑA */}
          <Modal
            visible={forgotVisible}
            transparent
            animationType="fade"
            onRequestClose={hideForgot}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Recuperar contraseña</Text>
                <Text style={styles.modalText}>
                  Te enviaremos un enlace para restablecer tu contraseña.
                </Text>

                <TextField
                  placeholder="Tu correo electrónico"
                  leftIcon="mail-outline"
                  value={forgotEmail}
                  onChangeText={setForgotEmail}
                  style={{ width: "100%", marginTop: 10 }}
                />

                <View style={styles.modalButtonsContainer}>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Cancelar"
                      variant="outline"
                      onPress={() => {
                        setForgotEmail("");
                        hideForgot();
                      }}
                    />
                  </View>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Enviar enlace"
                      variant="primary"
                      onPress={() => {
                        Alert.alert(
                          "Enlace enviado",
                          `Se ha enviado un correo de recuperación a ${forgotEmail}`,
                        );
                        console.log(
                          `Correo de recuperación enviado a: ${forgotEmail}`,
                        );
                        setForgotEmail("");
                        hideForgot();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = loginStyles;
