import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string("El correo es obligatorio")
    .min(1, "El correo es obligatorio"),
  password: z
    .string("La contraseña es obligatoria")
    .min(1, "La contraseña es obligatoria")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
