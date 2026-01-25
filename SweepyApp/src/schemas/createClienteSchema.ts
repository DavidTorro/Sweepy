import { z } from "zod";

const NIF_REGEX = /^[0-9]{8}[A-Z]$/;
const NIE_REGEX = /^[XYZ][0-9]{7}[A-Z]$/;
const CIF_REGEX = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/;
const PHONE_REGEX = /^[6789]\d{8}$/;

export const createClienteSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  nifCif: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const normalized = val.replace(/[\s-]/g, "").toUpperCase();
        return (
          NIF_REGEX.test(normalized) ||
          NIE_REGEX.test(normalized) ||
          CIF_REGEX.test(normalized)
        );
      },
      "NIF/CIF inválido",
    ),
  telefono: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const normalized = val.replace(/[\s-]/g, "");
        return PHONE_REGEX.test(normalized);
      },
      "Teléfono inválido",
    ),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .email("Email inválido"),
  notas: z.string().optional(),
});

export type CreateClienteFormData = z.infer<typeof createClienteSchema>;
