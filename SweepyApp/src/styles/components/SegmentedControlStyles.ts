import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const segmentedControlStyles = StyleSheet.create({
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
