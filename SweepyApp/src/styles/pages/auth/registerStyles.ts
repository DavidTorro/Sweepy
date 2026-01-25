import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 50,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 40,
    color: COLORS.text,
    marginTop: 10,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginBottom: 30,
  },

  label: {
    textAlign: "left",
    fontFamily: FONTS.semibold,
    color: COLORS.text,
    fontSize: 14,
    width: "85%",
    paddingBottom: 8,
  },

  formButton: {
    width: "85%",
  },

  form: {
    width: "100%",
    alignItems: "center",
  },

  errorText: {
    width: "85%",
    color: COLORS.error,
    marginTop: 8,
    fontFamily: FONTS.regular,
  },

  login: {
    marginTop: 20,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  loginLink: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
  },
});
