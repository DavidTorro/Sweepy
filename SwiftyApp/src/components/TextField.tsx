import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../theme";

interface Props extends TextInputProps {
  leftIcon?: string;               // nombre del icono Ionicons
  rightIcon?: string;              // nombre del icono Ionicons
  onRightIconPress?: () => void;   // acción al pulsar el icono derecho
  style?: any;
}

export default function TextField({
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: Props) {
  return (
    <View style={[styles.container, style]}>
      
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
        style={[styles.input, leftIcon && { paddingLeft: 4 }, rightIcon && { paddingRight: 4 }]}
        placeholderTextColor={COLORS.textSecondary}
      />

      {/* ICONO DERECHO OPCIONAL */}
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
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

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 50,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.text,
  },
});
