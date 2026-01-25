import { create } from 'zustand';
import { Cliente } from '@/types/clientes';
import { mockClientes } from '@/types/mocks/clientesMock';

interface ClientesStore {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
  crearCliente: (cliente: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) => void;
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
    const newCliente: Cliente = {
      ...cliente,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      clientes: [...state.clientes, newCliente],
    }));
  },

  editarCliente: (id: string, updates: Partial<Cliente>) => {
    set((state) => ({
      clientes: state.clientes.map((cliente) =>
        cliente.id === id
          ? { ...cliente, ...updates, updatedAt: new Date().toISOString() }
          : cliente
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
