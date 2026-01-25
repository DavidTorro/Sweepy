import { separatorStyles } from "@/styles/components/SeparatorStyles";
import { Text, View } from "react-native";

interface SeparatorProps {
  text?: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <View style={styles.container}>
      {/* Si NO hay texto → línea completa */}
      {!text && <View style={styles.fullLine} />}

      {/* Si hay texto → línea + texto + línea */}
      {text && (
        <>
          <View style={styles.line} />
          <Text style={styles.text}>{text}</Text>
          <View style={styles.line} />
        </>
      )}
    </View>
  );
}

const styles = separatorStyles;
