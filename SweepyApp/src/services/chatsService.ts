import { Chat, Message } from '@/types/chats';

export interface ChatsFilters {
  search?: string;
  usuarioId?: string;
}

export const chatsService = {
  // Obtener chats por usuario
  getChatsByUser: (chats: Chat[], usuarioId: string): Chat[] => {
    return chats.filter(
      (c) => c.usuarioId1 === usuarioId || c.usuarioId2 === usuarioId
    );
  },

  // Búsqueda
  search: (chats: Chat[], query: string): Chat[] => {
    if (!query.trim()) return chats;

    const q = query.trim().toLowerCase();
    return chats.filter(
      (c) =>
        (c.lastMessage ?? '').toLowerCase().includes(q) ||
        c.usuarioId1.toLowerCase().includes(q) ||
        c.usuarioId2.toLowerCase().includes(q)
    );
  },

  // Obtener chat entre dos usuarios
  getChatBetweenUsers: (
    chats: Chat[],
    usuarioId1: string,
    usuarioId2: string
  ): Chat | undefined => {
    return chats.find(
      (c) =>
        (c.usuarioId1 === usuarioId1 && c.usuarioId2 === usuarioId2) ||
        (c.usuarioId1 === usuarioId2 && c.usuarioId2 === usuarioId1)
    );
  },

  // Obtener por ID
  getById: (chats: Chat[], id: string): Chat | undefined => {
    return chats.find((c) => c.id === id);
  },

  // Ordenar por fecha de último mensaje (más reciente primero)
  sortByRecent: (chats: Chat[]): Chat[] => {
    const sorted = [...chats];
    sorted.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
    return sorted;
  },

  // Búsqueda + ordenamiento
  searchAndSort: (chats: Chat[], query: string): Chat[] => {
    const searched = chatsService.search(chats, query);
    return chatsService.sortByRecent(searched);
  },
};
