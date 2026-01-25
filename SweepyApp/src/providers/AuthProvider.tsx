import React, { createContext, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { persistenceService } from "@/services/persistenceService";
import { authService } from "@/services/authService";
import type { User } from "@/types/auth";

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

  // Restaurar usuario al iniciar
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const savedUser = await persistenceService.getUser();
        if (savedUser) {
          const isValid = await authService.validateUser(savedUser);
          if (isValid) {
            setStoreUser(savedUser);
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
  }, [setStoreUser]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = await authService.login(email, password);
      setStoreUser(user);
      await persistenceService.saveUser(user);
    } catch (error) {
      throw error;
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<void> => {
    try {
      const user = await authService.loginAdmin(email, password);
      setStoreUser(user);
      await persistenceService.saveUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setStoreUser(null);
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
        isAdmin: storeUser?.role === "admin" || storeUser?.role === "cliente",
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
