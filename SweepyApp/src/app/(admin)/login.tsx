import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
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
import { useAuth } from "../../providers/AuthProvider";

export default function LoginScreen() {
  const { logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
            logout();
            router.replace(ROUTES.EXPLORAR);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

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
    }

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

const styles = adminLoginStyles;
