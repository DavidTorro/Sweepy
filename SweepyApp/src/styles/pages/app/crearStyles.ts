import { theme } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const crearStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#999",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  charCount: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
    textAlign: "right",
  },
  photosContainer: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  addPhotoButton: {
    alignItems: "center",
    gap: 8,
  },
  addPhotoText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  categoriesContainer: {
    marginHorizontal: -8,
  },
  categoriesContent: {
    paddingHorizontal: 8,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
  },
  categoryButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  categoryButtonTextSelected: {
    color: "white",
  },
  conditionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  conditionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
  },
  conditionButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  conditionButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  conditionButtonTextSelected: {
    color: "white",
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
  },
  priceSymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.primary,
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  actionsContainer: {
    gap: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  publishButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  draftButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
});
