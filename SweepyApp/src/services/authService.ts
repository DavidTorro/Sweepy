import { User, UserRole } from '@/types/auth';
import { mockAuthUsers } from '@/types/mocks/authMock';

export const authService = {
  // Login
  login: async (email: string, password: string): Promise<User> => {
    // Simulamos delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser = mockAuthUsers[email];

    if (!mockUser || mockUser.password !== password) {
      throw new Error('Email o contraseña incorrectos');
    }

    return mockUser.user;
  },

  // Login Admin (misma lógica)
  loginAdmin: async (email: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser = mockAuthUsers[email];

    if (!mockUser || mockUser.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    // Validar que sea admin
    if (mockUser.user.role !== 'admin') {
      throw new Error('Solo administradores pueden acceder aquí');
    }

    return mockUser.user;
  },

  // Register
  register: async (
    email: string,
    name: string,
    password: string
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (mockAuthUsers[email]) {
      throw new Error('El email ya está registrado');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'cliente' as UserRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockAuthUsers[email] = { user: newUser, password };

    return newUser;
  },

  // Validar usuario existente (para persistencia)
  validateUser: async (user: User): Promise<boolean> => {
    try {
      const mockUser = mockAuthUsers[user.email];
      return !!mockUser;
    } catch {
      return false;
    }
  },
};
