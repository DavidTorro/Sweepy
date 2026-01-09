import { COLORS, FONTS } from "@/utils/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Option<T extends string> = {
  label: string;
  value: T;
};

interface SegmentedControlProps<T extends string> {
  // opcional (por ejemplo "Ordenar por:")
  label?: string;

  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;

  // opcional
  style?: any;
}

export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps<T>) {
  return (
    <View style={[styles.row, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.segment}>
        {options.map((opt) => {
          const active = opt.value === value;

          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[styles.segmentBtn, active && styles.segmentBtnActive]}
            >
              <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  segment: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
  },

  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  segmentBtnActive: {
    backgroundColor: COLORS.card,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },

  segmentText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  segmentTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
});
