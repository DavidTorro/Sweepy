import { Cliente } from "@/types/clientes";
import { mockAuthUsers } from "@/types/mocks/authMock";
import { mockClientes } from "@/types/mocks/clientesMock";
import { persistenceService } from "@/services/persistenceService";
import { useAuthStore } from "@/stores/auth.store";
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
    const currentClientes = get().clientes;
    const existing = currentClientes.find((c) => c.id === id);
    if (!existing) return;

    const updatedCliente: Cliente = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedList = currentClientes.map((cliente) =>
      cliente.id === id ? updatedCliente : cliente,
    );

    set({ clientes: updatedList });

    // Sincronizar con usuario autenticado si coincide
    const { user, setUser } = useAuthStore.getState();

    const userMatches =
      user && (user.id === updatedCliente.id || user.email === existing.email);

    if (user && userMatches) {
      const mergedUser = {
        ...user,
        name: updatedCliente.nombre ?? user.name,
        email: updatedCliente.email ?? user.email,
        telefono: updatedCliente.telefono ?? user.telefono,
        nifCif: updatedCliente.nifCif ?? user.nifCif,
        role: (updatedCliente.rol as any) || user.role,
        updatedAt: new Date().toISOString(),
      };
      setUser(mergedUser);
      persistenceService.saveUser(mergedUser).catch(() => {});
    }

    // Sincronizar mockAuthUsers para logins futuros
    const oldEmailKey = existing.email ?? updatedCliente.email;
    const mockEntry = oldEmailKey ? mockAuthUsers[oldEmailKey] : undefined;
    if (mockEntry) {
      const newEmail = updatedCliente.email ?? mockEntry.user.email;
      mockAuthUsers[newEmail] = {
        ...mockEntry,
        user: {
          ...mockEntry.user,
          name: updatedCliente.nombre ?? mockEntry.user.name,
          email: newEmail,
          telefono: updatedCliente.telefono ?? mockEntry.user.telefono,
          nifCif: updatedCliente.nifCif ?? mockEntry.user.nifCif,
          role: (updatedCliente.rol as any) ?? mockEntry.user.role,
          updatedAt: new Date().toISOString(),
        },
      };

      // Si cambió el email, elimina la clave anterior
      if (oldEmailKey && newEmail !== oldEmailKey) {
        delete mockAuthUsers[oldEmailKey];
      }
    }
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
