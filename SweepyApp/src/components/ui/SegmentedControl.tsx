import { segmentedControlStyles } from "@/styles/components/SegmentedControlStyles";
import { Pressable, Text, View } from "react-native";

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
              <Text
                style={[styles.segmentText, active && styles.segmentTextActive]}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = segmentedControlStyles;
