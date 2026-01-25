import RequireAuth from "@/components/auth/RequireAuth";
import { useAuthStore } from "@/stores/auth.store";
import { useAnunciosStore } from "@/stores/anuncios.store";
import { misAnunciosStyles } from "@/styles/pages/app/misAnunciosStyles";
import { anunciosService } from "@/services/anunciosService";
import { ROUTES } from "@/utils/constants/constants";
import { theme } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisAnunciosScreen() {
  const { user } = useAuthStore();
  const { anuncios } = useAnunciosStore();

  const userId = user?.id ?? "1";

  const userAnuncios = useMemo(() => {
    return anunciosService.getByUserId(anuncios, userId);
  }, [anuncios, userId]);

  const stats = useMemo(() => {
    const activos = userAnuncios.length; // no status field; asumimos activos
    const vendidos = 0;
    const visitas = userAnuncios.length * 20; // mock placeholder
    return { activos, vendidos, visitas };
  }, [userAnuncios]);

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mis anuncios</Text>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.activos}</Text>
                <Text style={styles.statLabel}>Activos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.vendidos}</Text>
                <Text style={styles.statLabel}>Vendidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.visitas}</Text>
                <Text style={styles.statLabel}>Visitas</Text>
              </View>
            </View>
          </View>

          {/* Announcements List */}
          <View style={styles.announcementsList}>
            {userAnuncios.map((announcement) => (
              <TouchableOpacity
                key={announcement.id}
                style={styles.announcementCard}
              >
                <Image
                  source={{
                    uri:
                      announcement.imagenes?.[0] ??
                      "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Foto",
                  }}
                  style={styles.announcementImage}
                />
                <View style={styles.announcementInfo}>
                  <Text style={styles.announcementTitle} numberOfLines={2}>
                    {announcement.title}
                  </Text>
                  <Text style={styles.announcementPrice}>
                    €{announcement.price}
                  </Text>
                  <View style={styles.announcementMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="pricetag" size={14} color="#999" />
                      <Text style={styles.metaText}>{announcement.category}</Text>
                    </View>
                    <Text style={styles.metaText}>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name="pencil"
                      size={18}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="trash" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State Message */}
          {userAnuncios.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="pricetag-outline" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>No tienes anuncios aún</Text>
              <Link href={ROUTES.CREAR} asChild>
                <TouchableOpacity style={styles.emptyStateButton}>
                  <Text style={styles.emptyStateButtonText}>
                    Crear un anuncio
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </RequireAuth>
  );
}

const styles = misAnunciosStyles;
