import { create } from 'zustand';
import { Anuncio } from '@/types/anuncios';
import { mockAnuncios } from '@/types/mocks/anunciosMock';

interface AnunciosStore {
  anuncios: Anuncio[];
  filtroCategoria: string | null;
  isLoading: boolean;
  error: string | null;
  crearAnuncio: (anuncio: Omit<Anuncio, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editarAnuncio: (id: string, anuncio: Partial<Anuncio>) => void;
  eliminarAnuncio: (id: string) => void;
  obtenerAnuncios: () => Anuncio[];
  filtrarPorCategoria: (categoria: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAnunciosStore = create<AnunciosStore>((set, get) => ({
  anuncios: mockAnuncios,
  filtroCategoria: null,
  isLoading: false,
  error: null,

  crearAnuncio: (anuncio) => {
    const newAnuncio: Anuncio = {
      ...anuncio,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      anuncios: [...state.anuncios, newAnuncio],
    }));
  },

  editarAnuncio: (id: string, updates: Partial<Anuncio>) => {
    set((state) => ({
      anuncios: state.anuncios.map((anuncio) =>
        anuncio.id === id
          ? { ...anuncio, ...updates, updatedAt: new Date().toISOString() }
          : anuncio
      ),
    }));
  },

  eliminarAnuncio: (id: string) => {
    set((state) => ({
      anuncios: state.anuncios.filter((anuncio) => anuncio.id !== id),
    }));
  },

  obtenerAnuncios: () => {
    const { anuncios, filtroCategoria } = get();
    if (!filtroCategoria) return anuncios;
    return anuncios.filter((anuncio) => anuncio.category === filtroCategoria);
  },

  filtrarPorCategoria: (categoria: string | null) => {
    set({ filtroCategoria: categoria });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
