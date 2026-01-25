import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
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

  form: {
    width: "100%",
    alignItems: "center",
  },

  forgot: {
    textAlign: "right",
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginTop: 8,
    width: "85%",
    marginBottom: 25,
  },

  formButton: {
    width: "85%",
  },

  errorText: {
    width: "85%",
    color: COLORS.error,
    marginTop: 8,
    fontFamily: FONTS.regular,
  },

  register: {
    marginTop: 20,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  registerLink: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  adminPortal: {
    marginTop: 10,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },

  modalContainer: {
    width: "85%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 10,
  },

  modalText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  modalButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  modalButtonWrapper: {
    flex: 1,
  },
});
