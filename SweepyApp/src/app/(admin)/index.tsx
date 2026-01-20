import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Cliente } from "../../../entregas/recursos_aules/types";
import { clientes, createCliente, loadClientes } from "../../../entregas/recursos_aules/types";
import Button from "../../components/ui/Button";
import ClienteCard from "../../components/ui/ClienteCard";
import SegmentedControl from "../../components/ui/SegmentedControl";
import SelectButton from "../../components/ui/SelectButton";
import TextField from "../../components/ui/TextField";
import { COLORS, FONTS } from "../../utils/theme";
import { useAuth } from "../../providers/AuthProvider";
import { ROUTES } from "../../utils/constants";

type SortKey = "nombre" | "id";

export default function AdminPortal() {
  const router = useRouter();
  const { logout } = useAuth();
  const [filterVisible, setFilterVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    activos: false,
    conEmail: false,
    conTelefono: false,
  });
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [baseClientes, setBaseClientes] = useState<Cliente[]>([]);
  const [clientesList, setClientesList] = useState<Cliente[]>([]);
  const [newClienteForm, setNewClienteForm] = useState({
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  // Función para recargar clientes
  const reloadClientes = useCallback(async () => {
    try {
      const loadedClientes = await loadClientes();
      setBaseClientes(loadedClientes);
      setClientesList(loadedClientes);
    } catch (error) {
      console.error('Error cargando clientes:', error);
      // Fallback a datos iniciales
      setBaseClientes(clientes);
      setClientesList(clientes);
    }
  }, []);

  // Cargar clientes al iniciar
  useEffect(() => {
    reloadClientes();
  }, [reloadClientes]);

  // Recargar clientes cuando la pantalla vuelve al foco
  useFocusEffect(
    useCallback(() => {
      reloadClientes();
    }, [reloadClientes])
  );

  // Filtrar y ordenar
  const applyFilterAndSort = (list: Cliente[], query: string, key: SortKey) => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? list
      : list.filter((c) => {
          const activo = c.activo.toString().toLowerCase();
          const email = (c.email ?? "").toLowerCase();
          const telefono = (c.telefono ?? "").toLowerCase();
          return (
            activo.includes(q) || email.includes(q) || telefono.includes(q)
          );
        });

    const sorted = [...filtered].sort((a, b) => {
      if (key === "id") return a.id - b.id; // ASC
      return a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }); // ASC
    });

    return sorted;
  };

  useEffect(() => {
    setClientesList(applyFilterAndSort(baseClientes, searchText, sortKey));
  }, [baseClientes, searchText, sortKey]);

  const handleCreateCliente = async () => {
    if (!newClienteForm.nombre.trim()) {
      Alert.alert("Error", "El nombre del cliente es obligatorio");
      return;
    }

    setIsCreating(true);
    try {
      const newCliente = await createCliente(
        {
          nombre: newClienteForm.nombre,
          nifCif: newClienteForm.nifCif || undefined,
          telefono: newClienteForm.telefono || undefined,
          email: newClienteForm.email || undefined,
          notas: newClienteForm.notas || undefined,
          activo: true,
        },
        baseClientes
      );

      // Recargar la lista de clientes
      await reloadClientes();

      setCreateModalVisible(false);
      setNewClienteForm({
        nombre: "",
        nifCif: "",
        telefono: "",
        email: "",
        notas: "",
      });

      Alert.alert("Éxito", "Cliente creado correctamente");
    } catch (error) {
      console.error("Error creando cliente:", error);
      Alert.alert("Error", "No se pudo crear el cliente");
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          onPress: () => {
            logout();
            router.replace(ROUTES.EXPLORAR);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

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
          <TextField
            placeholder="Buscar nombre de usuario"
            leftIcon="search-outline"
            rightIcon="filter-outline"
            onRightIconPress={() => setFilterVisible(true)}
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* Selector orden ASC */}
          <SegmentedControl<SortKey>
            label="Ordenar por:"
            value={sortKey}
            onChange={setSortKey}
            options={[
              { label: "Nombre", value: "nombre" },
              { label: "ID", value: "id" },
            ]}
          />

        </View>
        
        {/* LISTA */}
        <View style={styles.listContainer}>
          <FlatList
            data={clientesList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ClienteCard cliente={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        {/* MODAL FILTROS */}
        <Modal
          visible={filterVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.filterModalOverlay}>
            <TouchableOpacity
              style={styles.filterModalBackdrop}
              onPress={() => setFilterVisible(false)}
              activeOpacity={1}
            />
            <View style={styles.filterModalContainer}>
              <Text style={styles.modalTitle}>Filtros</Text>
              
              {/* Filtros organizados en columna */}
              <View style={styles.filtersColumn}>
                <View style={styles.filterItemWrapper}>
                  <Text style={styles.filterLabel}>Estado</Text>
                  <SelectButton
                    label="Activos"
                    selected={filters.activos}
                    onToggle={(v: boolean) => setFilters((p) => ({ ...p, activos: v }))}
                  />
                </View>

                <View style={styles.filterItemWrapper}>
                  <Text style={styles.filterLabel}>Contacto</Text>
                  <SelectButton
                    label="Con email"
                    selected={filters.conEmail}
                    onToggle={(v: boolean) => setFilters((p) => ({ ...p, conEmail: v }))}
                  />
                  <SelectButton
                    label="Con teléfono"
                    selected={filters.conTelefono}
                    onToggle={(v: boolean) => setFilters((p) => ({ ...p, conTelefono: v }))}
                  />
                </View>
              </View>

              <View style={styles.modalActions}>
                <View style={styles.modalBtn}>
                  <Button
                    title="Cancelar"
                    variant="outline"
                    onPress={() => setFilterVisible(false)}
                  />
                </View>

                <View style={styles.modalBtn}>
                  <Button
                    title="Aplicar"
                    variant="primary"
                    onPress={() => setFilterVisible(false)}
                  />
                </View>

              </View>
            </View>
          </View>
        </Modal>

        {/* FAB BUTTON */}
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>

        {/* FAB LOGOUT BUTTON */}
        <TouchableOpacity
          style={styles.fabLogoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={32} color="white" />
        </TouchableOpacity>

        {/* MODAL CREAR CLIENTE */}
        <Modal
          visible={createModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCreateModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.createModalOverlay}
          >
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setCreateModalVisible(false)}
              activeOpacity={0.8}
            />

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
                  <Text style={styles.createModalTitle}>Crear Cliente</Text>
                  <TouchableOpacity
                    onPress={() => setCreateModalVisible(false)}
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

                <View style={styles.createForm}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextField
                      placeholder="Nombre del cliente"
                      value={newClienteForm.nombre}
                      onChangeText={(text: string) =>
                        setNewClienteForm((p) => ({ ...p, nombre: text }))
                      }
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>NIF/CIF</Text>
                    <TextField
                      placeholder="NIF/CIF"
                      value={newClienteForm.nifCif}
                      onChangeText={(text: string) =>
                        setNewClienteForm((p) => ({ ...p, nifCif: text }))
                      }
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Teléfono</Text>
                    <TextField
                      placeholder="Teléfono"
                      value={newClienteForm.telefono}
                      onChangeText={(text: string) =>
                        setNewClienteForm((p) => ({ ...p, telefono: text }))
                      }
                      keyboardType="phone-pad"
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextField
                      placeholder="Email"
                      value={newClienteForm.email}
                      onChangeText={(text: string) =>
                        setNewClienteForm((p) => ({ ...p, email: text }))
                      }
                      keyboardType="email-address"
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Notas</Text>
                    <TextField
                      placeholder="Notas adicionales"
                      value={newClienteForm.notas}
                      onChangeText={(text: string) =>
                        setNewClienteForm((p) => ({ ...p, notas: text }))
                      }
                      multiline
                      numberOfLines={4}
                      style={{ width: "100%" }}
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <View style={styles.actionBtn}>
                    <Button
                      title="Cancelar"
                      variant="outline"
                      onPress={() => setCreateModalVisible(false)}
                      disabled={isCreating}
                    />
                  </View>

                  <View style={styles.actionBtn}>
                    <Button
                      title={isCreating ? "Creando..." : "Crear"}
                      variant="primary"
                      onPress={handleCreateCliente}
                      disabled={isCreating}
                    />
                  </View>
                </View>

                <View style={{ height: 30 }} />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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

  // "Combo" tipo segmented control
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
    // sombra suave para que parezca "seleccionado"
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

  // FAB BUTTON
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

  // MODAL CREAR CLIENTE
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
