import { Cliente } from "@/types/clientes";

export const mockClientes: Cliente[] = [
  {
    id: "1",
    nombre: "Juan García",
    email: "juan@ejemplo.com",
    telefono: "+34 612 345 678",
    nifCif: "12345678A",
    notas: "Cliente frecuente",
    activo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    nombre: "María López",
    email: "maria@ejemplo.com",
    telefono: "+34 687 234 567",
    nifCif: "87654321B",
    notas: "Primer contacto",
    activo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    nombre: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    telefono: "+34 645 123 456",
    nifCif: "11223344C",
    notas: "",
    activo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
