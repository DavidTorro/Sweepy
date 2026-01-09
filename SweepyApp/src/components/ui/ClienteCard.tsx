import { COLORS, FONTS } from "@/utils/theme";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Cliente } from "../../../entregas/recursos_aules/types";

interface Props {
  cliente: Cliente;
}

export default function ClienteCard({ cliente }: Props) {
  const handlePress = () => {
    router.push({
      pathname: "/admin/[id]",
      params: { id: cliente.id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.nombre}>{cliente.nombre}</Text>

        <View
          style={[
            styles.estado,
            cliente.activo ? styles.activo : styles.inactivo,
          ]}
        >
          <Text style={styles.estadoText}>
            {cliente.activo ? "ACTIVO" : "INACTIVO"}
          </Text>
        </View>
      </View>

      {/* Info */}
      <Text style={styles.linea}>ID: {cliente.id}</Text>
      <Text style={styles.linea}>
        Teléfono: {cliente.telefono ?? "—"}
      </Text>
      <Text style={styles.linea}>
        Email: {cliente.email ?? "—"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

