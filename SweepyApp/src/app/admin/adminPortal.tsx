import Button from "@/components/ui/Button";
import ClienteCard from "@/components/ui/ClienteCard";
import SegmentedControl from "@/components/ui/SegmentedControl";
import SelectButton from "@/components/ui/SelectButton";
import TextField from "@/components/ui/TextField";
import { COLORS, FONTS } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from "react-native";
import type { Cliente } from "../../../entregas/recursos_aules/types";
import { clientes } from "../../../entregas/recursos_aules/types";
type SortKey = "nombre" | "id";

export default function AdminPortal() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    activos: false,
    conEmail: false,
    conTelefono: false,
  });
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [baseClientes, setBaseClientes] = useState<Cliente[]>([]);
  const [clientesList, setClientesList] = useState<Cliente[]>([]);

  // Inicializar lista base de clientes (sin buscar ni filtrar)
  useEffect(() => {
    setBaseClientes(clientes);
    setClientesList(clientes);
  }, []);

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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Buscar por:</Text>
              
              {/* Aquí van los filtros (por ahora solo un ejemplo) */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                <SelectButton
                  label="Activos"
                  selected={filters.activos}
                  onToggle={(v) => setFilters((p) => ({ ...p, activos: v }))}
                />

                <SelectButton
                  label="Con email"
                  selected={filters.conEmail}
                  onToggle={(v) => setFilters((p) => ({ ...p, conEmail: v }))}
                />

                <SelectButton
                  label="Con teléfono"
                  selected={filters.conTelefono}
                  onToggle={(v) => setFilters((p) => ({ ...p, conTelefono: v }))}
                />
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
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
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

  // “Combo” tipo segmented control
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
    // sombra suave para que parezca “seleccionado”
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
});