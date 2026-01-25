import { Perfil } from '@/types/perfiles';

export const mockPerfiles: Record<string, Perfil> = {
  '1': {
    id: 'p1',
    usuarioId: '1',
    bio: 'Vendedor de artículos varios',
    avatar: 'https://via.placeholder.com/150',
    ubicacion: 'Madrid, España',
    rating: 4.5,
    totalVentas: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  '2': {
    id: 'p2',
    usuarioId: '2',
    bio: 'Comprador ocasional',
    avatar: 'https://via.placeholder.com/150',
    ubicacion: 'Barcelona, España',
    rating: 4.8,
    totalVentas: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};
