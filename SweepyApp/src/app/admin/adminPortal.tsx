import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "@/src/components/ui/Button";
import TextField from "@/src/components/ui/TextField";
import { COLORS, FONTS } from "@/src/utils/theme";

export default function AdminPortal() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [orderASC, setOrderASC] = useState(false);
  // TODO mirar orden alternar entre asc y desc y default
  // TODO añadir Filtros desde constantes (foreach?) y su logica

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.mint, COLORS.primaryLight]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        {/* Parte superior (Barra de búsqueda) */}
        <View style={styles.container}>
          <TextField
            placeholder="Buscar nombre de usuario"
            leftIcon="search-outline"
            rightIcon="filter-outline"
            onRightIconPress={() => setFilterVisible(true)}
          />
          {/* Texto de ordenar por (por defecto de manera "ascendente", asi que al pulsar sera descendiente) */}
          <Text style={styles.ordenarText}>
            Ordenar por:{" "}
              <Text style={styles.ordenarText} onPress={() => {setOrderASC(!orderASC)}}>
                Nombre de usuario ▼
              </Text>
          </Text>
          
        </View>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* Modal de filtros */}
          <Modal
            visible={filterVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setFilterVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Buscar por:</Text>

                {/* listado de filtros */}

                <Button
                  title="Aplicar filtros"
                  variant="primary"
                  onPress={() => {
                    {/* Lógica para aplicar filtros */}

                    setFilterVisible(false);
                  }}
                />

                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => {
                    setFilterVisible(false);
                  }}
                />
              </View>
            </View>
          </Modal>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
  },

  ordenarText: {
    alignItems: "stretch",
    marginTop: 10,
    fontFamily: FONTS.regular,
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

  modalText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});