import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/theme";

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

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
   /* Línea partida cuando hay texto */
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  /* Texto opcional */
  text: {
    marginHorizontal: 12,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
  },

  /* Línea completa cuando NO hay texto */
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
});
