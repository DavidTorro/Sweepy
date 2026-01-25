import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z
    .string("El nombre es obligatorio")
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  nifCif: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, "NIF/CIF inválido"),
  telefono: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{9,}$/.test(val), "Teléfono inválido"),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "Email inválido",
    ),
  notas: z.string().optional(),
});

export type CreateClienteFormData = z.infer<typeof createClienteSchema>;
