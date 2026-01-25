import { Anuncio } from '@/types/anuncios';

export interface AnunciosFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
}

export interface SortOptions {
  key: 'price' | 'fecha';
  order: 'asc' | 'desc';
}

export const anunciosService = {
  // Búsqueda y filtrado
  search: (
    anuncios: Anuncio[],
    query: string,
    filters?: AnunciosFilters
  ): Anuncio[] => {
    let result = [...anuncios];

    // Filtro de búsqueda por texto
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((a) => {
        const title = a.title.toLowerCase();
        const description = a.description.toLowerCase();
        return title.includes(q) || description.includes(q);
      });
    }

    // Filtro de categoría
    if (filters?.category) {
      result = result.filter((a) => a.category === filters.category);
    }

    // Filtro de precio
    if (filters?.minPrice !== undefined) {
      result = result.filter((a) => a.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      result = result.filter((a) => a.price <= filters.maxPrice!);
    }

    // Filtro de condición
    if (filters?.condition) {
      result = result.filter((a) => a.condition === filters.condition);
    }

    return result;
  },

  // Ordenamiento
  sort: (anuncios: Anuncio[], options: SortOptions): Anuncio[] => {
    const sorted = [...anuncios];
    sorted.sort((a, b) => {
      if (options.key === 'price') {
        return options.order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return options.order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  },

  // Búsqueda + orden
  searchAndSort: (
    anuncios: Anuncio[],
    query: string,
    sortOptions: SortOptions,
    filters?: AnunciosFilters
  ): Anuncio[] => {
    const searched = anunciosService.search(anuncios, query, filters);
    return anunciosService.sort(searched, sortOptions);
  },

  // Obtener por ID
  getById: (anuncios: Anuncio[], id: string): Anuncio | undefined => {
    return anuncios.find((a) => a.id === id);
  },

  // Obtener por usuario
  getByUserId: (anuncios: Anuncio[], usuarioId: string): Anuncio[] => {
    return anuncios.filter((a) => a.usuarioId === usuarioId);
  },

  // Obtener categorías únicas
  getCategories: (anuncios: Anuncio[]): string[] => {
    return [...new Set(anuncios.map((a) => a.category))];
  },
};
