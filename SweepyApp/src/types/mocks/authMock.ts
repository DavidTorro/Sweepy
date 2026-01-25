import { User, UserRole } from '@/types/auth';

export const mockAuthUsers: Record<string, { user: User; password: string }> = {
  'david@ejemplo.com': {
    user: {
      id: '1',
      email: 'david@ejemplo.com',
      name: 'David',
      role: 'cliente' as UserRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    password: '1234',
  },
  'sweepy@admin.com': {
    user: {
      id: '2',
      email: 'sweepy@admin.com',
      name: 'Sweepy',
      role: 'admin' as UserRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    password: 'admin1234',
  },
};
