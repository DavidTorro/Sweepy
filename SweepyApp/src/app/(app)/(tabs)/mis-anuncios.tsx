import RequireAuth from "@/components/auth/RequireAuth";
import { misAnunciosStyles } from "@/styles/pages/app/misAnunciosStyles";
import { ROUTES } from "@/utils/constants/constants";
import { theme } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MyAnnouncement {
  id: string;
  title: string;
  price: number;
  image: string;
  status: "activo" | "vendido" | "pendiente";
  views: number;
  timestamp: string;
}

export default function MisAnunciosScreen() {
  const [announcements] = useState<MyAnnouncement[]>([
    {
      id: "1",
      title: "Cámara digital Canon EOS",
      price: 320,
      image: "https://via.placeholder.com/150/FF3B30/FFFFFF?text=Cámara",
      status: "activo",
      views: 45,
      timestamp: "hace 2 días",
    },
    {
      id: "2",
      title: "Patinete eléctrico",
      price: 180,
      image: "https://via.placeholder.com/150/34C759/FFFFFF?text=Patinete",
      status: "vendido",
      views: 128,
      timestamp: "hace 1 semana",
    },
    {
      id: "3",
      title: "Auriculares Sony WH-1000",
      price: 220,
      image: "https://via.placeholder.com/150/007AFF/FFFFFF?text=Auriculares",
      status: "activo",
      views: 32,
      timestamp: "hace 5 días",
    },
  ]);

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mis anuncios</Text>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Activos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>Vendidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>205</Text>
                <Text style={styles.statLabel}>Visitas</Text>
              </View>
            </View>
          </View>

          {/* Announcements List */}
          <View style={styles.announcementsList}>
            {announcements.map((announcement) => (
              <TouchableOpacity
                key={announcement.id}
                style={styles.announcementCard}
              >
                <Image
                  source={{ uri: announcement.image }}
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
                      <Ionicons name="eye" size={14} color="#999" />
                      <Text style={styles.metaText}>
                        {announcement.views} vistas
                      </Text>
                    </View>
                    <Text style={styles.metaText}>
                      {announcement.timestamp}
                    </Text>
                  </View>
                </View>

                {/* Status Badge */}
                <View
                  style={[
                    styles.statusBadge,
                    announcement.status === "activo" && styles.statusActivo,
                    announcement.status === "vendido" && styles.statusVendido,
                    announcement.status === "pendiente" &&
                      styles.statusPendiente,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      announcement.status === "activo" &&
                        styles.statusTexActivo,
                    ]}
                  >
                    {announcement.status === "activo" && "✓ Activo"}
                    {announcement.status === "vendido" && "✓ Vendido"}
                    {announcement.status === "pendiente" && "⏳ Pendiente"}
                  </Text>
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
          {announcements.length === 0 && (
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
