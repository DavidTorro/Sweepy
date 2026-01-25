import { authService } from "@/services/authService";
import { persistenceService } from "@/services/persistenceService";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import type { User } from "@/types/auth";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user: storeUser, setUser: setStoreUser } = useAuthStore();
  const { setUser: setUserStore, clearUser: clearUserStore } = useUserStore();

  // Restaurar usuario al iniciar
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const savedUser = await persistenceService.getUser();
        if (savedUser) {
          const isValid = await authService.validateUser(savedUser);
          if (isValid) {
            setStoreUser(savedUser);
            setUserStore(savedUser);
          } else {
            await persistenceService.clearAll();
          }
        }
      } catch (error) {
        console.error("Error restaurando usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreUser();
  }, [setStoreUser, setUserStore]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = await authService.login(email, password);
      setStoreUser(user);
      setUserStore(user);
      await persistenceService.saveUser(user);
    } catch (error) {
      throw error;
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<void> => {
    try {
      const user = await authService.loginAdmin(email, password);
      setStoreUser(user);
      setUserStore(user);
      await persistenceService.saveUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setStoreUser(null);
      clearUserStore();
      await persistenceService.clearAll();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: storeUser,
        isAuthenticated: !!storeUser,
        isAdmin: storeUser?.role === "admin",
        isLoading,
        login,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
