import React, { createContext, useState } from "react";

interface User {
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Login de usuario normal de prueba
    if (email === "David" && password === "1234") {
      setUser({ email, name: "David", role: "user" });
      return true;
    }
    // También aceptar email con @
    if (email === "david@ejemplo.com" && password === "1234") {
      setUser({ email, name: "David", role: "user" });
      return true;
    }
    return false;
  };

  const loginAdmin = (email: string, password: string): boolean => {
    // Login de admin de prueba
    if (email === "Sweepy" && password === "admin1234") {
      setUser({ email, name: "Sweepy", role: "admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
