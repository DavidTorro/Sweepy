import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { userService } from "@/services/userService";
import { User, UserRole } from "@/types/auth";
import { COLORS, FONTS } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminUsersScreen() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("cliente");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const users = userService.getAllUsers();
    setUsuarios(users);
  };

  const filteredUsers = usuarios.filter((u) =>
    u.name.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setEditModalVisible(true);
  };

  const handleSaveRole = () => {
    if (!selectedUser) return;

    userService.updateUserRole(selectedUser.email, selectedRole);
    loadUsers();
    setEditModalVisible(false);
    Alert.alert("Éxito", "Rol actualizado correctamente");
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "#FF3B30";
      case "cliente":
        return COLORS.primary;
      case "user":
        return "#FFB800";
      default:
        return "#999";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "cliente":
        return "Cliente";
      case "user":
        return "Usuario";
      default:
        return role;
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.mint, COLORS.primaryLight]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <TextField
          placeholder="Buscar usuario"
          leftIcon="search-outline"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => handleEditUser(item)}
          >
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: getRoleBadgeColor(item.role) },
              ]}
            >
              <Text style={styles.roleBadgeText}>{getRoleLabel(item.role)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* MODAL EDITAR ROL */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setEditModalVisible(false)}
            activeOpacity={0.8}
          />

          <View style={styles.bottomSheet}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Cambiar Rol</Text>
                <TouchableOpacity
                  onPress={() => setEditModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={28} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>

              {selectedUser && (
                <>
                  <View style={styles.userPreview}>
                    <Text style={styles.previewName}>{selectedUser.name}</Text>
                    <Text style={styles.previewEmail}>{selectedUser.email}</Text>
                  </View>

                  <View style={styles.roleSelector}>
                    <Text style={styles.fieldLabel}>Selecciona el rol:</Text>
                    <View style={styles.roleButtons}>
                      <TouchableOpacity
                        style={[
                          styles.roleButton,
                          selectedRole === "cliente" && styles.roleButtonActive,
                        ]}
                        onPress={() => setSelectedRole("cliente")}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            selectedRole === "cliente" && styles.roleButtonTextActive,
                          ]}
                        >
                          Cliente
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.roleButton,
                          selectedRole === "admin" && styles.roleButtonActive,
                        ]}
                        onPress={() => setSelectedRole("admin")}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            selectedRole === "admin" && styles.roleButtonTextActive,
                          ]}
                        >
                          Admin
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.roleButton,
                          selectedRole === "user" && styles.roleButtonActive,
                        ]}
                        onPress={() => setSelectedRole("user")}
                      >
                        <Text
                          style={[
                            styles.roleButtonText,
                            selectedRole === "user" && styles.roleButtonTextActive,
                          ]}
                        >
                          Usuario
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              <View style={styles.formActions}>
                <View style={styles.actionBtn}>
                  <Button
                    title="Cancelar"
                    variant="outline"
                    onPress={() => setEditModalVisible(false)}
                  />
                </View>
                <View style={styles.actionBtn}>
                  <Button
                    title="Guardar"
                    variant="primary"
                    onPress={handleSaveRole}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 8,
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: "white",
  },
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
    maxHeight: "70%",
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
    flexGrow: 1,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
    width: "100%",
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -8,
  },
  userPreview: {
    width: "90%",
    alignItems: "center",
    marginBottom: 24,
  },
  previewName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 4,
  },
  previewEmail: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  roleSelector: {
    width: "90%",
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#666",
  },
  roleButtonTextActive: {
    color: "white",
  },
  formActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "90%",
  },
  actionBtn: {
    flex: 1,
  },
});
