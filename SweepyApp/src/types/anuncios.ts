export interface Anuncio {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: "Nuevo" | "Como nuevo" | "Buen estado" | "Aceptable";
  usuarioId: string;
  imagenes?: string[];
  activo?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
