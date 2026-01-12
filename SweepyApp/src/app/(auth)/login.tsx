import SocialButton from "@/components/auth/SocialButton";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import TextField from "@/components/ui/TextField";
import { useAuth } from "@/providers/AuthProvider";
import { APP, ERRORS, ROUTES } from "@/utils/constants";
import { COLORS, FONTS } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateAndRegister = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (email.trim() === "") {
      setEmailError(ERRORS.EMAIL_REQUIRED);
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError(ERRORS.PASSWORD_REQUIRED);
      isValid = false;
    }

    if (!isValid) return;

    // Intentar login
    const success = login(email, password);
    if (success) {
      router.replace(ROUTES.EXPLORAR);
    } else {
      setLoginError(ERRORS.LOGIN_ERROR);
    }
  };

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
              value={email}
              onChangeText={setEmail}
              leftIcon="mail-outline"
              error={!!emailError}
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Contraseña</Text>

            <TextField
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={!!passwordError}
            />

            {/* Olvidaste tu contraseña */}
            <Text style={styles.forgot} onPress={() => setForgotVisible(true)}>
              ¿Olvidaste tu contraseña?
            </Text>

            {/* MENSAJES DE ERROR */}
            {emailError !== "" && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
            {passwordError !== "" && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            {/* BOTÓN LOGIN */}
            <Button
              style={styles.formButton}
              title="Iniciar sesión"
              variant="primary"
              onPress={() => {
                validateAndRegister();
                console.log("login");
              }}
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
            <Link
              href={ROUTES.REGISTER}
              style={styles.registerLink}
            >
              Regístrate
            </Link>
          </Text>

          {/* 
            Portal para administradores (CRUD DE USUARIOS) 
            parte independiente a la app  
          */}
          <Text style={styles.adminPortal}>
            Portal para administradores{" "}
            <Link
              href={ROUTES.ADMINLOGIN}
              style={styles.registerLink}
            >
              Acceso
            </Link>
          </Text>
          
          {/* MODAL OLVIDAR CONTRASEÑA */}
          <Modal
            visible={forgotVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setForgotVisible(false)}
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
                        setForgotVisible(false);
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
                          `Se ha enviado un correo de recuperación a ${forgotEmail}`
                        );
                        console.log(
                          `Correo de recuperación enviado a: ${forgotEmail}`
                        );
                        setForgotEmail("");
                        setForgotVisible(false);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 40,
    color: COLORS.text,
    marginTop: 10,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginBottom: 30,
  },

  label: {
    textAlign: "left",
    fontFamily: FONTS.semibold,
    color: COLORS.text,
    fontSize: 14,
    width: "85%",
    paddingBottom: 8,
  },

  form: {
    width: "100%",
    alignItems: "center",
  },

  forgot: {
    textAlign: "right",
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginTop: 8,
    width: "85%",
    marginBottom: 25,
  },

  formButton: {
    width: "85%",
  },

  errorText: {
    width: "85%",
    color: COLORS.error,
    marginTop: 8,
    fontFamily: FONTS.regular,
  },

  register: {
    marginTop: 20,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  registerLink: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  adminPortal: {
    marginTop: 10,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  modalContainer: {
    width: "85%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 10,
  },

  modalText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  modalButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  modalButtonWrapper: {
    flex: 1,
  },
});
