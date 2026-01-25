import {
    CreateAnuncioFormData,
    createAnuncioSchema,
} from "@/schemas/createAnuncioSchema";
import { useForm } from "./useForm";

interface UseCreateAnuncioFormProps {
  onSubmit?: (data: CreateAnuncioFormData) => void | Promise<void>;
}

export function useCreateAnuncioForm({
  onSubmit,
}: UseCreateAnuncioFormProps = {}) {
  const form = useForm<CreateAnuncioFormData>({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "",
    },
    schema: createAnuncioSchema,
    onSubmit,
  });

  return form;
}
