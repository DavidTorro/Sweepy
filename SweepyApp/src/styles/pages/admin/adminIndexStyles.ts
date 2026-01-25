import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const adminIndexStyles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 12,
    alignItems: "center",
    gap: 10,
  },

  sortRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sortLabel: {
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

  listContainer: {
    flex: 1,
  },

  listContent: {
    paddingTop: 6,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },

  filterModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  filterModalBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  filterModalContainer: {
    width: "80%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  filtersColumn: {
    width: "100%",
    gap: 8,
    marginVertical: 12,
    alignItems: "center",
  },

  filterItem: {
    width: "100%",
    alignItems: "center",
  },

  filterItemWrapper: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    gap: 6,
  },

  filterLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
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

  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  modalBtn: {
    flex: 1,
  },

  fabButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  fabLogoutButton: {
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },

  createModalOverlay: {
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

  scrollContent: {
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  createModalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },

  createForm: {
    marginBottom: 12,
    width: "100%",
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
});
