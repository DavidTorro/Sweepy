import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useLoginForm } from "@/hooks/useLoginForm";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { useToggle } from "@/hooks/useToggle";
import { useAuthStore } from "@/stores/auth.store";
import { adminLoginStyles } from "@/styles/pages/auth/adminLoginStyles";
import { APP, ERRORS, ROUTES } from "@/utils/constants/constants";
import { COLORS } from "@/utils/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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
  const { loginAdmin, isLoading } = useAuthStore();
  const { showPassword, toggleShowPassword, rightIcon } =
    usePasswordVisibility();
  const {
    isVisible: forgotVisible,
    show: showForgot,
    hide: hideForgot,
  } = useToggle(false);
  const [loginError, setLoginError] = useState("");

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          onPress: () => {
            router.replace(ROUTES.EXPLORAR);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  const form = useLoginForm({
    onSubmit: async (data) => {
      setLoginError("");
      try {
        await loginAdmin(data.email, data.password);
        router.replace(ROUTES.ADMIN);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ERRORS.LOGIN_ERROR;
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
            source={require("../../../assets/resources/Sweepy_Admin_Letter.png")}
            style={styles.logo}
          />

          {/* Título */}
          <Text style={styles.title}>{APP.NAME} Admin</Text>
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

          {/* Link volver a página principal */}
          <Text style={styles.noAdmin}>
            ¿No eres administrador?{" "}
            <Text
              style={styles.noAdminLink}
              onPress={() => router.replace(ROUTES.EXPLORAR)}
            >
              Vuelve a la página principal
            </Text>
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
                  Ponte en contacto con el soporte técnico para recuperar tu
                  contraseña.
                </Text>

                <View style={styles.modalButtonsContainer}>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Cancelar"
                      variant="outline"
                      onPress={hideForgot}
                    />
                  </View>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Aceptar"
                      variant="primary"
                      onPress={hideForgot}
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

const styles = adminLoginStyles;
