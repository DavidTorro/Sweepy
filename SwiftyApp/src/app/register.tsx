import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native";
import Button from "../components/Button";
import Separator from "../components/Separator";
import SocialButton from "../components/SocialButton";
import TextField from "../components/TextField";
import { COLORS, FONTS } from "../theme";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // funcion para validar campos
  const validateAndRegister = () => {
    let isValid = true;

    // Reiniciar errores
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUsernameError("El nombre de usuario no puede estar vacío");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("El correo electrónico no puede estar vacío");
      isValid = false;
    }

    if (password.length < 3) {
      setPasswordError("La contraseña debe tener al menos 3 caracteres");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
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
          source={require("../../assets/images/Swifty_Letter.png")}
          style={styles.logo}
        />

        {/* Título */}
        <Text style={styles.title}>Swifty</Text>
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
            style={[
              usernameError ? { borderColor: "red", borderWidth: 1 } : {}
            ]}
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Correo electrónico</Text>

          <TextField
            placeholder="nombre@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            leftIcon="mail-outline"
            style={[
              emailError ? { borderColor: "red", borderWidth: 1 } : {}
            ]}
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Contraseña</Text>

          <TextField
            placeholder="********"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("")
            }}
            secureTextEntry={!showPassword}
            leftIcon="lock-closed-outline"
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            style={[
              passwordError ? { borderColor: "red", borderWidth: 1 } : {}
            ]}
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Confirmar contraseña</Text>

          <TextField
            placeholder="********"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordError("")
            }}
            secureTextEntry={!showPassword}
            leftIcon="lock-closed-outline"
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            style={[
              passwordError ? { borderColor: "red", borderWidth: 1 } : {}
            ]}
          />

          {/* MENSAJE DE ERROR */}
          {usernameError !== "" && (
            <Text style={styles.errorText}>{usernameError}</Text>
          )}
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
          {passwordError !== "" && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          <Button
            title="Registrarse"
            variant="primary"
            onPress={() => {
              validateAndRegister();
              console.log("register")
            }}
          />
        </View>

        {/* Separador */}
        <Separator text="O continúa con" />

        {/* Botón Google */}
        <SocialButton onPress={() => console.log("Google login")} />

        {/* Registro */}
        <Text style={styles.login}>
          ¿Ya tienes una cuenta? {" "}
          <Link href="/login" style={styles.loginLink} onPress={() => console.log("login")}>
            Inicia sesión
          </Link>
        </Text>

      </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 50,
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

  button: {
    width: "100%",          
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "100%",
    alignItems: "center",
  },

  errorText: {
    width: "85%",
    color: "red",
    marginTop: 8,
    fontFamily: FONTS.regular,
  },

  login: {
    marginTop: 20,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  loginLink: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
  },
});