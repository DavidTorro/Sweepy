import RequireAuth from '@/components/auth/RequireAuth';
import { useAuth } from '@/providers/AuthProvider';
import { theme } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  
  const userStats = {
    rating: 4.8,
    reviews: 24,
    followers: 156,
    sells: 12,
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
      { text: 'Cerrar sesión', onPress: logout, style: 'destructive' },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: 'heart',
      label: 'Favoritos',
      onPress: () => Alert.alert('Favoritos'),
    },
    {
      id: '2',
      icon: 'wallet',
      label: 'Mi monedero',
      onPress: () => Alert.alert('Monedero'),
    },
    {
      id: '3',
      icon: 'star',
      label: 'Valoraciones',
      onPress: () => Alert.alert('Valoraciones'),
    },
    {
      id: '4',
      icon: 'notifications',
      label: 'Notificaciones',
      onPress: () => Alert.alert('Notificaciones'),
      showBadge: true,
    },
    {
      id: '5',
      icon: 'shield-checkmark',
      label: 'Seguridad y privacidad',
      onPress: () => Alert.alert('Seguridad'),
    },
    {
      id: '6',
      icon: 'help-circle',
      label: 'Ayuda y soporte',
      onPress: () => Alert.alert('Ayuda'),
    },
    {
      id: '7',
      icon: 'log-out',
      label: 'Cerrar sesión',
      onPress: handleLogout,
      color: '#FF3B30',
    },
  ];

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100/007AFF/FFFFFF?text=JD',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
            <Text style={styles.userHandle}>@{user?.email || 'usuario'}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.rating}>{userStats.rating}</Text>
              <Text style={styles.reviews}>({userStats.reviews})</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
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
            Comprador y vendedor verificado. Me gusta mantener mis productos en
            buen estado y hacer transacciones seguras.
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
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#ccc"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Sweepy v1.0.0</Text>
          <Text style={styles.versionSubtext}>© 2024 Sweepy Inc.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </RequireAuth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    gap: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: 13,
    color: '#999',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  versionSubtext: {
    fontSize: 11,
    color: '#ccc',
    marginTop: 4,
  },
});
