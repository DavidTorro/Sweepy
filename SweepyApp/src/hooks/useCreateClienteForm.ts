import {
    CreateClienteFormData,
    createClienteSchema,
} from "@/schemas/createClienteSchema";
import { useForm } from "./useForm";

interface UseCreateClienteFormProps {
  onSubmit?: (data: CreateClienteFormData) => void | Promise<void>;
}

export function useCreateClienteForm({
  onSubmit,
}: UseCreateClienteFormProps = {}) {
  const form = useForm<CreateClienteFormData>({
    initialValues: {
      nombre: "",
      nifCif: "",
      telefono: "",
      email: "",
      notas: "",
    },
    schema: createClienteSchema,
    onSubmit,
  });

  return form;
}
