import { Chat, Message } from "@/types/chats";
import { mockChats, mockMensajes } from "@/types/mocks/chatsMock";
import { create } from "zustand";

interface ChatsStore {
  chats: Chat[];
  mensajesActuales: Message[];
  chatActual: Chat | null;
  isLoading: boolean;
  error: string | null;
  obtenerChats: () => Chat[];
  abrirChat: (chatId: string) => void;
  enviarMensaje: (chatId: string, usuarioId: string, contenido: string) => void;
  crearChat: (usuarioId1: string, usuarioId2: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatsStore = create<ChatsStore>((set, get) => ({
  chats: mockChats,
  mensajesActuales: [],
  chatActual: null,
  isLoading: false,
  error: null,

  obtenerChats: () => get().chats,

  abrirChat: (chatId: string) => {
    const chat = get().chats.find((c) => c.id === chatId);
    if (chat) {
      set({
        chatActual: chat,
        mensajesActuales: mockMensajes[chatId] || [],
      });
    }
  },

  enviarMensaje: (chatId: string, usuarioId: string, contenido: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      chatId,
      usuarioId,
      contenido,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updated = [...state.mensajesActuales, newMessage];
      if (!mockMensajes[chatId]) {
        mockMensajes[chatId] = [];
      }
      mockMensajes[chatId].push(newMessage);

      return {
        mensajesActuales: updated,
      };
    });
  },

  crearChat: (usuarioId1: string, usuarioId2: string) => {
    const newChat: Chat = {
      id: Math.random().toString(36).substr(2, 9),
      usuarioId1,
      usuarioId2,
      lastMessage: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      chats: [...state.chats, newChat],
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
