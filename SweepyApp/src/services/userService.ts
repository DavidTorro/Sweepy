import { User, UserRole } from "@/types/auth";
import { mockAuthUsers } from "@/types/mocks/authMock";

export const userService = {
  // Obtener todos los usuarios registrados
  getAllUsers: (): User[] => {
    return Object.values(mockAuthUsers).map((u) => u.user);
  },

  // Obtener usuario por email
  getUserByEmail: (email: string): User | null => {
    const found = mockAuthUsers[email];
    return found ? found.user : null;
  },

  // Actualizar rol de usuario
  updateUserRole: (email: string, newRole: UserRole): void => {
    const user = mockAuthUsers[email];
    if (user) {
      user.user.role = newRole;
      user.user.updatedAt = new Date().toISOString();
    }
  },

  // Actualizar datos de usuario
  updateUser: (
    email: string,
    updates: Partial<Omit<User, "id" | "createdAt">>
  ): void => {
    const user = mockAuthUsers[email];
    if (user) {
      Object.assign(user.user, updates, {
        updatedAt: new Date().toISOString(),
      });
    }
  },
};
