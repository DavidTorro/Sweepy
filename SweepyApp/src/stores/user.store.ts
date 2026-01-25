import { useClientesStore } from "@/stores/clientes.store";
import { persistenceService } from "@/services/persistenceService";
import { useAuthStore } from "@/stores/auth.store";
import { User } from "@/types/auth";
import { mockAuthUsers } from "@/types/mocks/authMock";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: (user: User | null) => {
    set({ user });
  },

  updateUser: async (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) {
      throw new Error("No hay usuario autenticado");
    }

    const updatedUser: User = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    set({ user: updatedUser });
    useAuthStore.getState().setUser(updatedUser);
    await persistenceService.saveUser(updatedUser);

    // Sincronizar clientes store si coincide el ID o el email
    const clientesStore = useClientesStore.getState();
    const clienteMatch =
      clientesStore.obtenerClientePorId(updatedUser.id) ||
      clientesStore.obtenerClientes().find((c) => c.email === currentUser.email);

    if (clienteMatch) {
      clientesStore.editarCliente(clienteMatch.id, {
        nombre: updatedUser.name,
        email: updatedUser.email,
        telefono: updatedUser.telefono,
        nifCif: updatedUser.nifCif,
        rol: updatedUser.role as any,
      });
    }

    // Sincronizar mockAuthUsers para logins futuros
    const mockEntry = mockAuthUsers[currentUser.email];
    if (mockEntry) {
      const newEmail = updatedUser.email;
      mockAuthUsers[newEmail] = {
        ...mockEntry,
        user: {
          ...mockEntry.user,
          name: updatedUser.name,
          email: newEmail,
          telefono: updatedUser.telefono,
          nifCif: updatedUser.nifCif,
          role: updatedUser.role,
          updatedAt: updatedUser.updatedAt,
        },
      };
      if (newEmail !== currentUser.email) {
        delete mockAuthUsers[currentUser.email];
      }
    }
  },

  clearUser: () => {
    set({ user: null });
  },
}));
