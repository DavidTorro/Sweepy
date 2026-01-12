import { theme } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatConversation {
  id: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  productTitle: string;
  online: boolean;
}

export default function ChatScreen() {
  const [conversations] = useState<ChatConversation[]>([
    {
      id: '1',
      userName: 'María García',
      userImage: 'https://via.placeholder.com/50/007AFF/FFFFFF?text=MG',
      lastMessage: '¿Sigue disponible el artículo?',
      timestamp: 'hace 2 min',
      unread: true,
      productTitle: 'iPhone 14 Pro',
      online: true,
    },
    {
      id: '2',
      userName: 'Carlos López',
      userImage: 'https://via.placeholder.com/50/34C759/FFFFFF?text=CL',
      lastMessage: 'Perfecto, me lo llevo',
      timestamp: 'hace 1 hora',
      unread: false,
      productTitle: 'Bicicleta de montaña',
      online: false,
    },
    {
      id: '3',
      userName: 'Ana Martínez',
      userImage: 'https://via.placeholder.com/50/FF3B30/FFFFFF?text=AM',
      lastMessage: 'Tú: ¿Cuál es el precio más bajo?',
      timestamp: 'ayer',
      unread: false,
      productTitle: 'Sofá gris 3 plazas',
      online: true,
    },
    {
      id: '4',
      userName: 'Roberto Sánchez',
      userImage: 'https://via.placeholder.com/50/5856D6/FFFFFF?text=RS',
      lastMessage: 'Me interesa mucho, ¿dónde te vemos?',
      timestamp: '12 ene',
      unread: false,
      productTitle: 'MacBook Air M1',
      online: false,
    },
  ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mensajes</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Conversations */}
        <View style={styles.conversationsList}>
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={[
                styles.conversationCard,
                conversation.unread && styles.conversationCardUnread,
              ]}
            >
              {/* User Image con Online Indicator */}
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: conversation.userImage }}
                  style={styles.userImage}
                />
                {conversation.online && <View style={styles.onlineIndicator} />}
              </View>

              {/* Conversation Info */}
              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text
                    style={[
                      styles.userName,
                      conversation.unread && styles.userNameUnread,
                    ]}
                  >
                    {conversation.userName}
                  </Text>
                  <Text
                    style={[
                      styles.timestamp,
                      conversation.unread && styles.timestampUnread,
                    ]}
                  >
                    {conversation.timestamp}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.productTitle,
                    conversation.unread && styles.productTitleUnread,
                  ]}
                  numberOfLines={1}
                >
                  {conversation.productTitle}
                </Text>

                <Text
                  style={[
                    styles.lastMessage,
                    conversation.unread && styles.lastMessageUnread,
                  ]}
                  numberOfLines={1}
                >
                  {conversation.lastMessage}
                </Text>
              </View>

              {/* Unread Badge */}
              {conversation.unread && (
                <View style={styles.unreadBadge} />
              )}
            </TouchableOpacity>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationsList: {
    paddingHorizontal: 0,
    paddingBottom: 80,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  conversationCardUnread: {
    backgroundColor: '#f9f9f9',
  },
  userImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  userNameUnread: {
    fontWeight: '700',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
  },
  timestampUnread: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  productTitleUnread: {
    color: '#666',
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 13,
    color: '#999',
  },
  lastMessageUnread: {
    color: '#333',
    fontWeight: '500',
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginLeft: 12,
  },
});
