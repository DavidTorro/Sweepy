import RequireAuth from "@/components/auth/RequireAuth";
import { useAuthStore } from "@/stores/auth.store";
import { useChatsStore } from "@/stores/chats.store";
import { chatsService } from "@/services/chatsService";
import { chatStyles } from "@/styles/pages/app/chatStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const { user } = useAuthStore();
  const { chats } = useChatsStore();
  const [searchText, setSearchText] = useState("");

  const userId = user?.id ?? "1";

  const conversations = useMemo(() => {
    const userChats = chatsService.getChatsByUser(chats, userId);
    return chatsService.searchAndSort(userChats, searchText);
  }, [chats, userId, searchText]);

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mensajes</Text>
            {/* Buscador removido */}
          </View>

          {/* Conversations */}
          <View style={styles.conversationsList}>
            {conversations.map((conversation) => {
              const otherUser =
                conversation.usuarioId1 === userId
                  ? conversation.usuarioId2
                  : conversation.usuarioId1;

              return (
                <TouchableOpacity
                  key={conversation.id}
                  style={styles.conversationCard}
                >
                  <View style={styles.userImageContainer}>
                    <Image
                      source={{
                        uri: "https://via.placeholder.com/50/999999/FFFFFF?text=U",
                      }}
                      style={styles.userImage}
                    />
                  </View>

                  <View style={styles.conversationInfo}>
                    <View style={styles.conversationHeader}>
                      <Text style={styles.userName}>Usuario {otherUser}</Text>
                      <Text style={styles.timestamp}>
                        {new Date(conversation.updatedAt).toLocaleDateString()}
                      </Text>
                    </View>

                    <Text style={styles.productTitle} numberOfLines={1}>
                      Chat #{conversation.id}
                    </Text>

                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {conversation.lastMessage || "Sin mensajes"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </RequireAuth>
  );
}

const styles = chatStyles;
