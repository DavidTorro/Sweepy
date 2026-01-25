import { COLORS, FONTS, SHADOWS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const selectButtonStyles = StyleSheet.create({
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
