import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS } from "../../utils/theme";

interface FilterPillProps {
  label: string;
  selected: boolean;
  // toggle directo
  onToggle: (nextSelected: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export default function SelectButton({
  label,
  selected,
  onToggle,
  disabled = false,
  loading = false,
  style,
}: FilterPillProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      onPress={() => onToggle(!selected)} // ✅ toggle real
      style={[
        styles.base,
        selected ? styles.selectedPill : styles.unselectedPill,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={selected ? "#fff" : COLORS.primary} />
      ) : (
        <Text style={[styles.text, selected ? styles.textOn : styles.textOff]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  // ON: relleno primary + sombra suave
  selectedPill: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.card,
  },

  // OFF: outline azul, sin relleno
  unselectedPill: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  text: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
  },

  textOn: {
    color: "#fff",
  },

  textOff: {
    color: COLORS.primary,
  },

  disabled: {
    opacity: 0.4,
  },
});
