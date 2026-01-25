import { Cliente } from "@/types/clientes";
import { mockClientes } from "@/types/mocks/clientesMock";
import { create } from "zustand";

interface ClientesStore {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
  crearCliente: (
    cliente: Omit<Cliente, "id" | "createdAt" | "updatedAt">,
  ) => void;
  editarCliente: (id: string, cliente: Partial<Cliente>) => void;
  eliminarCliente: (id: string) => void;
  obtenerClientes: () => Cliente[];
  obtenerClientePorId: (id: string) => Cliente | undefined;
  setLoading: (loading: boolean) => void;
}

export const useClientesStore = create<ClientesStore>((set, get) => ({
  clientes: mockClientes,
  isLoading: false,
  error: null,

  crearCliente: (cliente) => {
    if (!cliente.nombre?.trim()) {
      throw new Error("El nombre es obligatorio");
    }

    set((state) => {
      const maxId = state.clientes.reduce((max, c) => {
        const num = Number(c.id);
        return Number.isFinite(num) ? Math.max(max, num) : max;
      }, 0);

      const newId = (maxId + 1).toString();

      const newCliente: Cliente = {
        ...cliente,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        clientes: [...state.clientes, newCliente],
      };
    });
  },

  editarCliente: (id: string, updates: Partial<Cliente>) => {
    set((state) => ({
      clientes: state.clientes.map((cliente) =>
        cliente.id === id
          ? { ...cliente, ...updates, updatedAt: new Date().toISOString() }
          : cliente,
      ),
    }));
  },

  eliminarCliente: (id: string) => {
    set((state) => ({
      clientes: state.clientes.filter((cliente) => cliente.id !== id),
    }));
  },

  obtenerClientes: () => get().clientes,

  obtenerClientePorId: (id: string) => {
    return get().clientes.find((cliente) => cliente.id === id);
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
