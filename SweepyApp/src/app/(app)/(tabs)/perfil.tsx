import RequireAuth from "@/components/auth/RequireAuth";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/stores/user.store";
import { perfilStyles } from "@/styles/pages/app/perfilStyles";
import { theme } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
  showBadge?: boolean;
}

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { updateUser } = useUserStore();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    telefono: "",
    nifCif: "",
  });

  const normalizePhone = (phone: string) => phone.replace(/[\s-]/g, "");
  const isValidPhone = (phone: string) => {
    const normalized = normalizePhone(phone);
    if (!normalized) return true;
    return /^[6789]\d{8}$/.test(normalized);
  };
  const isValidNifCif = (value: string) => {
    const normalized = value.replace(/[\s-]/g, "").toUpperCase();
    if (!normalized) return true;
    const nif = /^[0-9]{8}[A-Z]$/;
    const nie = /^[XYZ][0-9]{7}[A-Z]$/;
    const cif = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/;
    return nif.test(normalized) || nie.test(normalized) || cif.test(normalized);
  };

  const userStats = {
    rating: 4.8,
    reviews: 24,
    followers: 156,
    sells: 12,
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", onPress: () => {}, style: "cancel" },
      { text: "Cerrar sesión", onPress: logout, style: "destructive" },
    ]);
  };

  const handleEditProfile = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      telefono: user?.telefono || "",
      nifCif: user?.nifCif || "",
    });
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    const nameTrim = editForm.name.trim();
    const emailTrim = editForm.email.trim();
    const nifTrim = editForm.nifCif.trim();
    const phoneNormalized = normalizePhone(editForm.telefono);

    if (!nameTrim) {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }

    if (!emailTrim) {
      Alert.alert("Error", "El email no puede estar vacío");
      return;
    }

    if (!/.+@.+\..+/.test(emailTrim)) {
      Alert.alert("Error", "Email inválido");
      return;
    }

    if (nifTrim && !isValidNifCif(nifTrim)) {
      Alert.alert("Error", "NIF/CIF inválido");
      return;
    }

    if (editForm.telefono && !isValidPhone(editForm.telefono)) {
      Alert.alert("Error", "Teléfono inválido (9 dígitos, empieza por 6/7/8/9)");
      return;
    }

    try {
      await updateUser({ 
        name: nameTrim,
        email: emailTrim,
        telefono: phoneNormalized || undefined,
        nifCif: nifTrim ? nifTrim.toUpperCase() : undefined,
      });
      setEditModalVisible(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil");
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: "1",
      icon: "heart",
      label: "Favoritos",
      onPress: () => Alert.alert("Favoritos"),
    },
    {
      id: "2",
      icon: "wallet",
      label: "Mi monedero",
      onPress: () => Alert.alert("Monedero"),
    },
    {
      id: "3",
      icon: "star",
      label: "Valoraciones",
      onPress: () => Alert.alert("Valoraciones"),
    },
    {
      id: "4",
      icon: "notifications",
      label: "Notificaciones",
      onPress: () => Alert.alert("Notificaciones"),
      showBadge: true,
    },
    {
      id: "5",
      icon: "shield-checkmark",
      label: "Seguridad y privacidad",
      onPress: () => Alert.alert("Seguridad"),
    },
    {
      id: "6",
      icon: "help-circle",
      label: "Ayuda y soporte",
      onPress: () => Alert.alert("Ayuda"),
    },
    {
      id: "7",
      icon: "log-out",
      label: "Cerrar sesión",
      onPress: handleLogout,
      color: "#FF3B30",
    },
  ];

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: "https://via.placeholder.com/100/007AFF/FFFFFF?text=JD",
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || "Usuario"}</Text>
              <Text style={styles.userHandle}>@{user?.email || "usuario"}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text style={styles.rating}>{userStats.rating}</Text>
                <Text style={styles.reviews}>({userStats.reviews})</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userStats.sells}</Text>
              <Text style={styles.statLabel}>Ventas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Compras</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>Confianza</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Sobre mí</Text>
            <Text style={styles.description}>
              Comprador y vendedor verificado. Me gusta mantener mis productos
              en buen estado y hacer transacciones seguras.
            </Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.color || theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.menuItemLabel,
                      item.color && { color: item.color },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.showBadge && <View style={styles.badge} />}
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Version Info */}
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Sweepy</Text>
            <Text style={styles.versionSubtext}>© 2026 Sweepy Inc.</Text>
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
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
                  <Text style={styles.sheetTitle}>Editar perfil</Text>
                  <TouchableOpacity
                    onPress={() => setEditModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={28} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.form}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Nombre</Text>
                    <TextField
                      placeholder="Tu nombre"
                      leftIcon="person-outline"
                      value={editForm.name}
                      onChangeText={(text) =>
                        setEditForm((p) => ({ ...p, name: text }))
                      }
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextField
                      placeholder="tu@email.com"
                      leftIcon="mail-outline"
                      value={editForm.email}
                      onChangeText={(text) =>
                        setEditForm((p) => ({ ...p, email: text }))
                      }
                      keyboardType="email-address"
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Teléfono</Text>
                    <TextField
                      placeholder="612345678"
                      leftIcon="call-outline"
                      value={editForm.telefono}
                      onChangeText={(text) =>
                        setEditForm((p) => ({ ...p, telefono: text }))
                      }
                      keyboardType="phone-pad"
                      style={{ width: "100%" }}
                    />
                  </View>

                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>NIF/CIF</Text>
                    <TextField
                      placeholder="12345678A"
                      leftIcon="card-outline"
                      value={editForm.nifCif}
                      onChangeText={(text) =>
                        setEditForm((p) => ({ ...p, nifCif: text }))
                      }
                      style={{ width: "100%" }}
                    />
                  </View>
                </View>

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
                      onPress={handleSaveProfile}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </RequireAuth>
  );
}

const styles = perfilStyles;
