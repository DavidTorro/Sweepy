import { adminPortalStyles } from "@/styles/pages/admin/adminPortalStyles";
import type { Cliente } from "@/types/clientes";
import { useClientesStore } from "@/stores/clientes.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/ui/Button";
import ClienteCard from "../../components/ui/ClienteCard";
import SegmentedControl from "../../components/ui/SegmentedControl";
import SelectButton from "../../components/ui/SelectButton";
import TextField from "../../components/ui/TextField";
import { COLORS } from "../../utils/constants/theme";
type SortKey = "nombre" | "id";

export default function AdminPortal() {
  const { clientes, crearCliente, obtenerClientes } = useClientesStore();
  const [filterVisible, setFilterVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    activos: false,
    conEmail: false,
    conTelefono: false,
  });
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [clientesList, setClientesList] = useState<Cliente[]>([]);
  const [newClienteForm, setNewClienteForm] = useState({
    nombre: "",
    nifCif: "",
    telefono: "",
    email: "",
    notas: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  // Filtrar y ordenar
  const applyFilterAndSort = (list: Cliente[], query: string, key: SortKey) => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? list
      : list.filter((c) => {
          const nombre = c.nombre.toLowerCase();
          const email = (c.email ?? "").toLowerCase();
          const telefono = (c.telefono ?? "").toLowerCase();
          return (
            nombre.includes(q) || email.includes(q) || telefono.includes(q)
          );
        });

    const sorted = [...filtered].sort((a, b) => {
      if (key === "id") return a.id.localeCompare(b.id);
      return a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }); // ASC
    });

    return sorted;
  };

  useEffect(() => {
    setClientesList(applyFilterAndSort(clientes, searchText, sortKey));
  }, [clientes, searchText, sortKey]);

  const handleCreateCliente = async () => {
    if (!newClienteForm.nombre.trim()) {
      Alert.alert("Error", "El nombre del cliente es obligatorio");
      return;
    }

    setIsCreating(true);
    try {
      crearCliente({
        nombre: newClienteForm.nombre,
        nifCif: newClienteForm.nifCif || undefined,
        telefono: newClienteForm.telefono || undefined,
        email: newClienteForm.email || undefined,
        notas: newClienteForm.notas || undefined,
        activo: true,
      });

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
                    onToggle={(v: boolean) =>
                      setFilters((p) => ({ ...p, activos: v }))
                    }
                  />
                </View>

                <View style={styles.filterItemWrapper}>
                  <Text style={styles.filterLabel}>Contacto</Text>
                  <SelectButton
                    label="Con email"
                    selected={filters.conEmail}
                    onToggle={(v: boolean) =>
                      setFilters((p) => ({ ...p, conEmail: v }))
                    }
                  />
                  <SelectButton
                    label="Con teléfono"
                    selected={filters.conTelefono}
                    onToggle={(v: boolean) =>
                      setFilters((p) => ({ ...p, conTelefono: v }))
                    }
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

const styles = adminPortalStyles;
