import { ROUTES } from '@/utils/constants';
import { theme } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MyAnnouncement {
  id: string;
  title: string;
  price: number;
  image: string;
  status: 'activo' | 'vendido' | 'pendiente';
  views: number;
  timestamp: string;
}

export default function MisAnunciosScreen() {
  const [announcements] = useState<MyAnnouncement[]>([
    {
      id: '1',
      title: 'Cámara digital Canon EOS',
      price: 320,
      image: 'https://via.placeholder.com/150/FF3B30/FFFFFF?text=Cámara',
      status: 'activo',
      views: 45,
      timestamp: 'hace 2 días',
    },
    {
      id: '2',
      title: 'Patinete eléctrico',
      price: 180,
      image: 'https://via.placeholder.com/150/34C759/FFFFFF?text=Patinete',
      status: 'vendido',
      views: 128,
      timestamp: 'hace 1 semana',
    },
    {
      id: '3',
      title: 'Auriculares Sony WH-1000',
      price: 220,
      image: 'https://via.placeholder.com/150/007AFF/FFFFFF?text=Auriculares',
      status: 'activo',
      views: 32,
      timestamp: 'hace 5 días',
    },
  ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
              <Image
                source={{ uri: announcement.image }}
                style={styles.announcementImage}
              />
              <View style={styles.announcementInfo}>
                <Text style={styles.announcementTitle} numberOfLines={2}>
                  {announcement.title}
                </Text>
                <Text style={styles.announcementPrice}>€{announcement.price}</Text>
                <View style={styles.announcementMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="eye" size={14} color="#999" />
                    <Text style={styles.metaText}>{announcement.views} vistas</Text>
                  </View>
                  <Text style={styles.metaText}>{announcement.timestamp}</Text>
                </View>
              </View>

              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  announcement.status === 'activo' && styles.statusActivo,
                  announcement.status === 'vendido' && styles.statusVendido,
                  announcement.status === 'pendiente' && styles.statusPendiente,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    announcement.status === 'activo' && styles.statusTexActivo,
                  ]}
                >
                  {announcement.status === 'activo' && '✓ Activo'}
                  {announcement.status === 'vendido' && '✓ Vendido'}
                  {announcement.status === 'pendiente' && '⏳ Pendiente'}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="pencil" size={18} color={theme.colors.primary} />
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
                <Text style={styles.emptyStateButtonText}>Crear un anuncio</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  announcementsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  announcementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  announcementInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  announcementPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  announcementMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  statusActivo: {
    backgroundColor: '#E8F5E9',
  },
  statusVendido: {
    backgroundColor: '#FFE0E0',
  },
  statusPendiente: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  statusTexActivo: {
    color: '#2E7D32',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  emptyStateButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
