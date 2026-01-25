export interface Perfil {
  id: string;
  usuarioId: string;
  bio?: string;
  avatar?: string;
  ubicacion?: string;
  rating: number;
  totalVentas: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
