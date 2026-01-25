import { COLORS, FONTS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const clienteCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,

    // sombra Android
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  nombre: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    paddingRight: 10,
  },

  estado: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  activo: {
    backgroundColor: "rgba(0, 180, 120, 0.2)",
  },

  inactivo: {
    backgroundColor: "rgba(220, 60, 60, 0.2)",
  },

  estadoText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
  },

  linea: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
