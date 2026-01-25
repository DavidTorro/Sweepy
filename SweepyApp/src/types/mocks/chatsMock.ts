import { Chat, Message } from '@/types/chats';

export const mockChats: Chat[] = [
  {
    id: '1',
    usuarioId1: '1',
    usuarioId2: '2',
    lastMessage: 'Hola, ¿sigue disponible?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    usuarioId1: '1',
    usuarioId2: '3',
    lastMessage: 'Perfecto, gracias',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockMensajes: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      chatId: '1',
      usuarioId: '1',
      contenido: 'Hola, ¿sigue disponible?',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      chatId: '1',
      usuarioId: '2',
      contenido: 'Sí, está disponible',
      createdAt: new Date().toISOString(),
    },
  ],
  '2': [
    {
      id: '3',
      chatId: '2',
      usuarioId: '1',
      contenido: '¿Cuál es el mejor horario?',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      chatId: '2',
      usuarioId: '3',
      contenido: 'Mañana a las 5 PM',
      createdAt: new Date().toISOString(),
    },
  ],
};
