import { COLORS } from "@/utils/constants/theme";
import { StyleSheet } from "react-native";

export const notFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: -80,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
});
