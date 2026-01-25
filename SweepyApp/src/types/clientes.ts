export interface Cliente {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  nifCif?: string;
  notas?: string;
  activo: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
