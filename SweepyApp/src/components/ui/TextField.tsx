import { textFieldStyles } from "@/styles/components/TextFieldStyles";
import { Ionicons } from "@expo/vector-icons";
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../utils/constants/theme";

interface Props extends TextInputProps {
  leftIcon?: string; // nombre del icono Ionicons
  rightIcon?: string; // nombre del icono Ionicons
  onRightIconPress?: () => void; // acción al pulsar el icono derecho
  error?: boolean; // si hay error
  style?: any;
}

export default function TextField({
  leftIcon,
  rightIcon,
  onRightIconPress,
  error = false,
  style,
  ...props
}: Props) {
  return (
    <View style={[styles.container, error && styles.errorBorder, style]}>
      {/* ICONO IZQUIERDO OPCIONAL */}
      {leftIcon && (
        <Ionicons
          name={leftIcon as any}
          size={20}
          color={COLORS.textSecondary}
          style={styles.leftIcon}
        />
      )}

      {/* INPUT */}
      <TextInput
        {...props}
        style={[
          styles.input,
          leftIcon && { paddingLeft: 4 },
          rightIcon && { paddingRight: 4 },
        ]}
        placeholderTextColor={COLORS.textSecondary}
      />

      {/* ICONO DERECHO OPCIONAL */}
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          <Ionicons
            name={rightIcon as any}
            size={20}
            color={COLORS.textSecondary}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = textFieldStyles;
