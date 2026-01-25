import { buttonStyles } from "@/styles/components/ButtonStyles";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/constants/theme";

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
      style={[styles.base, variantStyle, isDisabled && styles.disabled, style]}
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

const styles = buttonStyles;
