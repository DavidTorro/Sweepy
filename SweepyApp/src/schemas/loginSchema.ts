import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("El correo debe ser válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
