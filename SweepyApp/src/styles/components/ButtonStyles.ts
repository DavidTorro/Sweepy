import { COLORS, FONTS, SHADOWS, SIZES } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  /* --- BASE --- */
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.card,
  },

  /* --- VARIANTES --- */
  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  primaryText: {
    color: "#fff",
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },

  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  outlineText: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    fontSize: SIZES.medium,
  },

  ghostButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },

  ghostText: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    fontSize: 16,
  },

  disabled: {
    opacity: 0.4,
  },
});
