import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { APP, ERRORS, ROUTES } from "@/utils/constants";
import { COLORS, FONTS } from "@/utils/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  // TODO: validar que solo administradores puedan loguearse
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

    if (password.length < 4) {
      setPasswordError(ERRORS.PASSWORD_SHORT);
      isValid = false;
    }

    if (!isValid) {
      return;
    };

    // usuario para pruebas:
    if (email === "Sweepy" && password === "admin1234") {
      router.replace(ROUTES.ADMIN);
      return;
      //TODO ver guardar sesion
    } else {
      setLoginError(ERRORS.LOGIN_ERROR);
    }

    console.log("Admin logeado con éxito:");
    console.log("Email:", email);
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
            {loginError !== "" && (
              <Text style={styles.errorText}>{loginError}</Text>
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
                  Ponte en contacto con el soporte técnico para recuperar tu
                  contraseña.
                </Text>

                <View style={styles.modalButtonsContainer}>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Cancelar"
                      variant="outline"
                      onPress={() => {
                        setForgotVisible(false);
                      }}
                    />
                  </View>
                  <View style={styles.modalButtonWrapper}>
                    <Button
                      title="Aceptar"
                      variant="primary"
                      onPress={() => setForgotVisible(false)}
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
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
