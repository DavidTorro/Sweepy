import { z } from "zod";

export const createAnuncioSchema = z.object({
  title: z
    .string("El título es obligatorio")
    .min(1, "El título es obligatorio")
    .max(50, "El título debe tener máximo 50 caracteres"),
  description: z
    .string("La descripción es obligatoria")
    .min(1, "La descripción es obligatoria")
    .max(500, "La descripción debe tener máximo 500 caracteres"),
  price: z
    .string("El precio es obligatorio")
    .min(1, "El precio es obligatorio")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "El precio debe ser mayor a 0",
    ),
  category: z
    .string("La categoría es obligatoria")
    .min(1, "Selecciona una categoría"),
  condition: z
    .string("El estado es obligatorio")
    .min(1, "Selecciona un estado"),
});

export type CreateAnuncioFormData = z.infer<typeof createAnuncioSchema>;
