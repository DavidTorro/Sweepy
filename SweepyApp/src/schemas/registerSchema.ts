import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string("El nombre de usuario es obligatorio")
      .min(1, "El nombre de usuario es obligatorio")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z
      .string("El correo es obligatorio")
      .email("El correo debe ser válido"),
    password: z
      .string("La contraseña es obligatoria")
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
    confirmPassword: z.string("Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
