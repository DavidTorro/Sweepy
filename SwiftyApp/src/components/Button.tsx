import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "../theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyle =
    variant === "outline"
      ? styles.outlineButton
      : variant === "ghost"
      ? styles.ghostButton
      : styles.primaryButton;

  const textStyle =
    variant === "outline"
      ? styles.outlineText
      : variant === "ghost"
      ? styles.ghostText
      : styles.primaryText;

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, isDisabled && styles.disabled]}
      activeOpacity={0.7}
      disabled={isDisabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#fff" : COLORS.primary}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,

    // sombra ligera y elegante
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },

  /* --- VARIANTES DE BOTÓN --- */

  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: "#fff",
    fontFamily: FONTS.semibold,
    fontSize: 18,
  },

  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    fontSize: 18,
  },

  ghostButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  ghostText: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    fontSize: 18,
  },

  disabled: {
    opacity: 0.4,
  },
});
