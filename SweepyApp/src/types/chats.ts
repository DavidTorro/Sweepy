export interface Chat {
  id: string;
  usuarioId1: string;
  usuarioId2: string;
  lastMessage?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Message {
  id: string;
  chatId: string;
  usuarioId: string;
  contenido: string;
  createdAt: string | Date;
}
