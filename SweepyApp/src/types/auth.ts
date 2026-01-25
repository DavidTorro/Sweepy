export type UserRole = "user" | "admin" | "cliente";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  telefono?: string;
  nifCif?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<boolean>;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  error?: string;
}
