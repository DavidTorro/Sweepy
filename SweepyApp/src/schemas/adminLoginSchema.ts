import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
