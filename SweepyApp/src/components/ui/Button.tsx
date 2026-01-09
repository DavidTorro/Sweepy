import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../utils/theme";

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
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyle =
    variant === "outline"
      ? styles.outlineButton
      : variant === "ghost"
      ? styles.ghostButton
      : styles.primaryButton;

  const textStyle = {
    primary: styles.primaryText,
    outline: styles.outlineText,
    ghost: styles.ghostText,
  }[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyle,
        isDisabled && styles.disabled,
        style,
      ]}
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
  /* --- BASE --- */
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.card,
  },

  /* --- VARIANTES --- */
  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  primaryText: {
    color: "#fff",
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },

  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  outlineText: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },

  ghostButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },

  ghostText: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    fontSize: 16,
  },

  disabled: {
    opacity: 0.4,
  },
});
