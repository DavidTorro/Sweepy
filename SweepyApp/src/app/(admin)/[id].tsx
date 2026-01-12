import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { COLORS, FONTS } from "@/utils/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import type { Cliente } from "../../../entregas/recursos_aules/types";
import { clientes, loadClientes, updateCliente, deleteCliente } from "../../../entregas/recursos_aules/types";

export default function ClienteDetailScreen() {
  const { id } = useLocalSearchParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [allClientes, setAllClientes] = useState<Cliente[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
    activo: true,
  });

  // Cargar cliente desde AsyncStorage
  useEffect(() => {
    const loadCliente = async () => {
      try {
        const loadedClientes = await loadClientes();
        setAllClientes(loadedClientes);
        
        const foundCliente = loadedClientes.find((c) => c.id === Number(id));
        if (foundCliente) {
          setCliente(foundCliente);
          setFormData({
            nombre: foundCliente.nombre,
            nifCif: foundCliente.nifCif ?? "",
            telefono: foundCliente.telefono ?? "",
            email: foundCliente.email ?? "",
            notas: foundCliente.notas ?? "",
            activo: foundCliente.activo,
          });
        }
      } catch (error) {
        console.error('Error cargando cliente:', error);
        // Fallback
        const foundCliente = clientes.find((c) => c.id === Number(id));
        if (foundCliente) {
          setCliente(foundCliente);
          setFormData({
            nombre: foundCliente.nombre,
            nifCif: foundCliente.nifCif ?? "",
            telefono: foundCliente.telefono ?? "",
            email: foundCliente.email ?? "",
            notas: foundCliente.notas ?? "",
            activo: foundCliente.activo,
          });
        }
      }
    };
    loadCliente();
  }, [id]);

  const handleEditClose = () => {
    setEditModalVisible(false);
  };

  const handleSaveChanges = async () => {
    if (!formData.nombre.trim()) {
      Alert.alert("Error", "El nombre del cliente es obligatorio");
      return;
    }

    setIsSaving(true);
    try {
      if (!cliente) return;

      const updated = await updateCliente(
        cliente.id,
        {
          nombre: formData.nombre,
          nifCif: formData.nifCif || undefined,
          telefono: formData.telefono || undefined,
          email: formData.email || undefined,
          notas: formData.notas || undefined,
          activo: formData.activo,
        },
        allClientes
      );

      setCliente(updated);
      
      // Recargar la lista de clientes
      const loadedClientes = await loadClientes();
      setAllClientes(loadedClientes);

      handleEditClose();
      Alert.alert("Éxito", "Cliente actualizado correctamente");
    } catch (error) {
      console.error("Error guardando cliente:", error);
      Alert.alert("Error", "No se pudo guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCliente = () => {
    if (!cliente) return;

    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro de que desea eliminar a ${cliente.nombre}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteCliente(cliente.id, allClientes);
              Alert.alert("Éxito", "Cliente eliminado correctamente", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              console.error("Error eliminando cliente:", error);
              Alert.alert("Error", "No se pudo eliminar el cliente");
            } finally {
              setIsDeleting(false);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  if (!cliente) {
    return (
      <LinearGradient
        colors={[COLORS.background, COLORS.mint, COLORS.primaryLight]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 18, color: COLORS.text }}>Cargando...</Text>
      </LinearGradient>
    );
  }

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
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.text}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles del Cliente</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* CONTENIDO */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* TARJETA CLIENTE */}
          <View style={styles.clienteCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.clienteName}>{cliente.nombre}</Text>
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

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>ID</Text>
              <Text style={styles.infoValue}>{cliente.id}</Text>
            </View>

            {cliente.nifCif && (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>NIF/CIF</Text>
                <Text style={styles.infoValue}>{cliente.nifCif}</Text>
              </View>
            )}

            {cliente.telefono && (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <Text style={styles.infoValue}>{cliente.telefono}</Text>
              </View>
            )}

            {cliente.email && (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{cliente.email}</Text>
              </View>
            )}

            {cliente.notas && (
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Notas</Text>
                <Text style={styles.infoValue}>{cliente.notas}</Text>
              </View>
            )}
          </View>

          {/* BOTONES */}
          <View style={styles.buttonContainer}>
            <Button
              title="Editar Cliente"
              variant="primary"
              onPress={() => setEditModalVisible(true)}
            />
          </View>

          <View style={[styles.buttonContainer, { marginTop: 12 }]}>
            <Button
              title="Eliminar Cliente"
              variant="primary"
              onPress={handleDeleteCliente}
              disabled={isDeleting}
              style={{ backgroundColor: "#dc3232" }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL EDICIÓN (BOTTOM SHEET) */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleEditClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          {/* Fondo oscuro */}
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={handleEditClose}
            activeOpacity={0.8}
          />

          {/* Bottom Sheet */}
          <View style={styles.bottomSheet}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                  marginTop: 8,
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.modalTitle}>Editar Cliente</Text>
                <TouchableOpacity
                  onPress={handleEditClose}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: -8,
                  }}
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              {/* FORMULARIO */}
              <View style={styles.form}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Nombre</Text>
                  <TextField
                    placeholder="Nombre del cliente"
                    value={formData.nombre}
                    onChangeText={(text) =>
                      setFormData((p) => ({ ...p, nombre: text }))
                    }
                    style={{ width: "100%" }}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>NIF/CIF</Text>
                  <TextField
                    placeholder="NIF/CIF"
                    value={formData.nifCif}
                    onChangeText={(text) =>
                      setFormData((p) => ({ ...p, nifCif: text }))
                    }
                    style={{ width: "100%" }}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Teléfono</Text>
                  <TextField
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChangeText={(text) =>
                      setFormData((p) => ({ ...p, telefono: text }))
                    }
                    keyboardType="phone-pad"
                    style={{ width: "100%" }}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextField
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData((p) => ({ ...p, email: text }))
                    }
                    keyboardType="email-address"
                    style={{ width: "100%" }}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Notas</Text>
                  <TextField
                    placeholder="Notas adicionales"
                    value={formData.notas}
                    onChangeText={(text) =>
                      setFormData((p) => ({ ...p, notas: text }))
                    }
                    multiline
                    numberOfLines={4}
                    style={{ width: "100%" }}
                  />
                </View>

                <View style={styles.stateToggle}>
                  <Text style={styles.label}>Estado</Text>
                  <TouchableOpacity
                    style={[
                      styles.toggleBtn,
                      formData.activo ? styles.toggleBtnActive : styles.toggleBtnInactive,
                    ]}
                    onPress={() =>
                      setFormData((p) => ({ ...p, activo: !p.activo }))
                    }
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        formData.activo && styles.toggleTextActive,
                        !formData.activo && styles.toggleTextInactive,
                      ]}
                    >
                      {formData.activo ? "ACTIVO" : "INACTIVO"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* BOTONES ACCIÓN */}
              <View style={styles.formActions}>
                <View style={styles.actionBtn}>
                  <Button
                    title="Cancelar"
                    variant="outline"
                    onPress={handleEditClose}
                    disabled={isSaving}
                  />
                </View>

                <View style={styles.actionBtn}>
                  <Button
                    title={isSaving ? "Guardando..." : "Guardar"}
                    variant="primary"
                    onPress={handleSaveChanges}
                    disabled={isSaving}
                  />
                </View>
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  // MODAL STYLES
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
});
