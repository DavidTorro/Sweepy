import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/auth';

const USER_KEY = 'sweepy_user';
const TOKEN_KEY = 'sweepy_token';

export const persistenceService = {
  // Guardar usuario
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error guardando usuario:', error);
      throw error;
    }
  },

  // Obtener usuario guardado
  getUser: async (): Promise<User | null> => {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  },

  // Guardar token
  saveToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error guardando token:', error);
      throw error;
    }
  },

  // Obtener token
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  },

  // Limpiar todo
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY]);
    } catch (error) {
      console.error('Error limpiando almacenamiento:', error);
      throw error;
    }
  },
};
