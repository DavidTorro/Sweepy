import { create } from 'zustand';
import { Perfil } from '@/types/perfiles';
import { mockPerfiles } from '@/types/mocks/perfilesMock';

interface PerfilStore {
  perfil: Perfil | null;
  isLoading: boolean;
  error: string | null;
  establecerPerfil: (perfil: Perfil) => void;
  actualizarPerfil: (updates: Partial<Perfil>) => void;
  obtenerPerfil: () => Perfil | null;
  agregarValoracion: (puntos: number) => void;
  agregarVenta: () => void;
  setLoading: (loading: boolean) => void;
  limpiarPerfil: () => void;
}

export const usePerfilStore = create<PerfilStore>((set, get) => ({
  perfil: null,
  isLoading: false,
  error: null,

  establecerPerfil: (perfil: Perfil) => {
    set({ perfil });
  },

  actualizarPerfil: (updates: Partial<Perfil>) => {
    set((state) => {
      if (!state.perfil) return state;
      return {
        perfil: {
          ...state.perfil,
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  obtenerPerfil: () => get().perfil,

  agregarValoracion: (puntos: number) => {
    set((state) => {
      if (!state.perfil) return state;
      const totalValoraciones = Math.floor(state.perfil.rating * 5) + 1; // Simulación
      const newRating = (state.perfil.rating * totalValoraciones + puntos) / (totalValoraciones + 1);

      return {
        perfil: {
          ...state.perfil,
          rating: Math.min(5, parseFloat(newRating.toFixed(1))),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  agregarVenta: () => {
    set((state) => {
      if (!state.perfil) return state;
      return {
        perfil: {
          ...state.perfil,
          totalVentas: state.perfil.totalVentas + 1,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  limpiarPerfil: () => {
    set({ perfil: null });
  },
}));
