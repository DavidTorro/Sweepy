import { Cliente } from '@/types/clientes';

export interface ClientesFilters {
  search?: string;
  activos?: boolean;
  conEmail?: boolean;
  conTelefono?: boolean;
}

export interface SortOptions {
  key: 'nombre' | 'id';
  order: 'asc' | 'desc';
}

export const clientesService = {
  // Búsqueda y filtrado
  search: (
    clientes: Cliente[],
    query: string,
    filters?: ClientesFilters
  ): Cliente[] => {
    let result = [...clientes];

    // Filtro de búsqueda por texto
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((c) => {
        const nombre = c.nombre.toLowerCase();
        const email = (c.email ?? '').toLowerCase();
        const telefono = (c.telefono ?? '').toLowerCase();
        return nombre.includes(q) || email.includes(q) || telefono.includes(q);
      });
    }

    // Filtro de estado
    if (filters?.activos !== undefined) {
      result = result.filter((c) => c.activo === filters.activos);
    }

    // Filtro: con email
    if (filters?.conEmail) {
      result = result.filter((c) => !!c.email);
    }

    // Filtro: con teléfono
    if (filters?.conTelefono) {
      result = result.filter((c) => !!c.telefono);
    }

    return result;
  },

  // Ordenamiento
  sort: (clientes: Cliente[], options: SortOptions): Cliente[] => {
    const sorted = [...clientes];
    sorted.sort((a, b) => {
      if (options.key === 'id') {
        return options.order === 'asc'
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id);
      }
      return options.order === 'asc'
        ? a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
        : b.nombre.localeCompare(a.nombre, 'es', { sensitivity: 'base' });
    });
    return sorted;
  },

  // Búsqueda + orden
  searchAndSort: (
    clientes: Cliente[],
    query: string,
    sortOptions: SortOptions,
    filters?: ClientesFilters
  ): Cliente[] => {
    const searched = clientesService.search(clientes, query, filters);
    return clientesService.sort(searched, sortOptions);
  },

  // Obtener por ID
  getById: (clientes: Cliente[], id: string): Cliente | undefined => {
    return clientes.find((c) => c.id === id);
  },

  // Contar por estado
  countByStatus: (clientes: Cliente[]): { activos: number; inactivos: number } => {
    return {
      activos: clientes.filter((c) => c.activo).length,
      inactivos: clientes.filter((c) => !c.activo).length,
    };
  },
};
