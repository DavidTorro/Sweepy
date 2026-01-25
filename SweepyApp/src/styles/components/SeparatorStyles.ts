import { COLORS, FONTS, SIZES } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const separatorStyles = StyleSheet.create({
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
