/**
 * Utilidades genéricas de filtrado y búsqueda
 */

export interface SearchOptions {
  caseSensitive?: boolean;
  fuzzy?: boolean;
}

export const filterService = {
  // Búsqueda de texto simple
  searchText: (
    items: any[],
    query: string,
    fields: string[],
    options?: SearchOptions
  ): any[] => {
    if (!query.trim()) return items;

    const q = options?.caseSensitive
      ? query.trim()
      : query.trim().toLowerCase();

    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        if (!value) return false;
        const strValue = options?.caseSensitive
          ? String(value)
          : String(value).toLowerCase();
        return strValue.includes(q);
      })
    );
  },

  // Filtrar por rango numérico
  filterByRange: (
    items: any[],
    field: string,
    min?: number,
    max?: number
  ): any[] => {
    return items.filter((item) => {
      const value = item[field];
      if (typeof value !== 'number') return false;
      if (min !== undefined && value < min) return false;
      if (max !== undefined && value > max) return false;
      return true;
    });
  },

  // Filtrar por múltiples valores
  filterByValues: (
    items: any[],
    field: string,
    values: any[]
  ): any[] => {
    if (values.length === 0) return items;
    return items.filter((item) => values.includes(item[field]));
  },

  // Ordenar por campo
  sortBy: (
    items: any[],
    field: string,
    order: 'asc' | 'desc' = 'asc'
  ): any[] => {
    const sorted = [...items];
    sorted.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  },

  // Agrupar por campo
  groupBy: (items: any[], field: string): Record<string, any[]> => {
    return items.reduce((grouped, item) => {
      const key = String(item[field]);
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
      return grouped;
    }, {} as Record<string, any[]>);
  },

  // Eliminar duplicados
  unique: (items: any[], field: string): any[] => {
    const seen = new Set();
    return items.filter((item) => {
      const value = item[field];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },

  // Paginar
  paginate: (
    items: any[],
    page: number,
    pageSize: number
  ): { data: any[]; total: number; pages: number } => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: items.slice(start, end),
      total: items.length,
      pages: Math.ceil(items.length / pageSize),
    };
  },
};
