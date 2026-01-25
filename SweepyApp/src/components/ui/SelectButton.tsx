import { selectButtonStyles } from "@/styles/components/SelectButtonStyles";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/constants/theme";

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

const styles = selectButtonStyles;
