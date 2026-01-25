import { clienteCardStyles } from "@/styles/components/ClienteCardStyles";
import { ROUTES } from "@/utils/constants/constants";
import type { Cliente } from "@/types/clientes";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  cliente: Cliente;
}

export default function ClienteCard({ cliente }: Props) {
  const handlePress = () => {
    router.push({
      pathname: ROUTES.CLIENTBYID,
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
      <Text style={styles.linea}>Teléfono: {cliente.telefono ?? "—"}</Text>
      <Text style={styles.linea}>Email: {cliente.email ?? "—"}</Text>
    </TouchableOpacity>
  );
}

const styles = clienteCardStyles;
