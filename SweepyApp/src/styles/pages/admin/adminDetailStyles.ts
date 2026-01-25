import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const adminDetailStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    flex: 1,
    textAlign: "center",
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  clienteCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  clienteName: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
    flex: 1,
  },

  estado: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  activo: {
    backgroundColor: "rgba(0, 180, 120, 0.2)",
  },

  inactivo: {
    backgroundColor: "rgba(220, 50, 50, 0.15)",
  },

  estadoText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
  },

  infoSection: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },

  infoLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  infoValue: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
  },

  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },

  bottomSheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 0,
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 16,
    elevation: 10,
    width: "100%",
  },

  bottomSheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 12,
  },

  scrollContent: {
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },

  form: {
    marginBottom: 12,
    width: "90%",
    alignItems: "center",
    gap: 12,
  },

  fieldContainer: {
    width: "92%",
    maxWidth: 380,
    alignItems: "flex-start",
  },

  label: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  stateToggle: {
    marginTop: 12,
    width: "92%",
    maxWidth: 380,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
  },

  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  toggleBtnActive: {
    backgroundColor: "rgba(0, 180, 120, 0.2)",
    borderColor: COLORS.primary,
  },

  toggleBtnInactive: {
    backgroundColor: "rgba(220, 50, 50, 0.15)",
    borderColor: "#dc3232",
  },

  toggleText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  toggleTextActive: {
    color: COLORS.primary,
  },

  toggleTextInactive: {
    color: "#dc3232",
  },

  formActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
    width: "92%",
    maxWidth: 380,
  },

  actionBtn: {
    flex: 1,
  },
  roleSelector: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: "#666",
  },
  roleButtonTextActive: {
    color: "white",
  },
});
