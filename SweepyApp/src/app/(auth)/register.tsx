import SocialButton from "@/components/auth/SocialButton";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import TextField from "@/components/ui/TextField";
import { registerStyles } from "@/styles/pages/auth/registerStyles";
import { APP, ERRORS, ROUTES } from "@/utils/constants/constants";
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // --- VALIDACIÓN ---
  const validateAndRegister = () => {
    let isValid = true;

    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUsernameError(ERRORS.USERNAME_REQUIRED);
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError(ERRORS.EMAIL_REQUIRED);
      isValid = false;
    }

    if (password.length < 3) {
      setPasswordError(ERRORS.PASSWORD_SHORT);
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError(ERRORS.PASSWORD_MISMATCH);
      isValid = false;
    }

    if (!isValid) return;

    console.log("Usuario registrado con éxito:");
    console.log("Usuario:", username);
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
              value={username}
              onChangeText={setUsername}
              leftIcon="person-outline"
              error={!!usernameError}
            />

            <Text style={[styles.label, { marginTop: 10 }]}>
              Correo electrónico
            </Text>

            <TextField
              placeholder="nombre@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              leftIcon="mail-outline"
              error={!!emailError}
            />

            <Text style={[styles.label, { marginTop: 10 }]}>Contraseña</Text>

            <TextField
              placeholder="********"
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                setPasswordError("");
              }}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={!!passwordError}
            />

            <Text style={[styles.label, { marginTop: 10 }]}>
              Confirmar contraseña
            </Text>

            <TextField
              placeholder="********"
              value={confirmPassword}
              onChangeText={(text: string) => {
                setConfirmPassword(text);
                setPasswordError("");
              }}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={!!passwordError}
              style={{ marginBottom: 25 }}
            />

            {/* MENSAJES DE ERROR */}
            {usernameError !== "" && (
              <Text style={styles.errorText}>{usernameError}</Text>
            )}
            {emailError !== "" && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
            {passwordError !== "" && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            {/* BOTÓN REGISTER */}
            <Button
              style={styles.formButton}
              title="Registrarse"
              variant="primary"
              onPress={() => {
                validateAndRegister();
                console.log("register");
              }}
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
