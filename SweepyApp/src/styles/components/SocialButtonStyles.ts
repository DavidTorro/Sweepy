import { COLORS, FONTS, SHADOWS, SIZES } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const socialButtonStyles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.card,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 12,
  },

  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  disabled: {
    opacity: 0.4,
  },
});
