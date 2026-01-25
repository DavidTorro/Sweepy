import { authService } from "@/services/authService";
import { persistenceService } from "@/services/persistenceService";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types/auth";
import { mockAuthUsers } from "@/types/mocks/authMock";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // Simulamos delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser = mockAuthUsers[email];

      if (!mockUser || mockUser.password !== password) {
        throw new Error("Email o contraseña incorrectos");
      }

      set({ user: mockUser.user, isLoading: false });
      useUserStore.getState().setUser(mockUser.user);
      await persistenceService.saveUser(mockUser.user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  register: async (email: string, name: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const newUser = await authService.register(email, name, password);
      set({ user: newUser, isLoading: false });
      useUserStore.getState().setUser(newUser);
      await persistenceService.saveUser(newUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al registrarse";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  loginAdmin: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const user = await authService.loginAdmin(email, password);
      set({ user, isLoading: false });
      useUserStore.getState().setUser(user);
      await persistenceService.saveUser(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    set({ user: null, error: null });
    useUserStore.getState().clearUser();
    persistenceService.clearAll().catch(() => {});
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  clearError: () => {
    set({ error: null });
  },
}));
