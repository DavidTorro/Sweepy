import { RegisterFormData, registerSchema } from "@/schemas/registerSchema";
import { useForm } from "./useForm";

interface UseRegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void | Promise<void>;
}

export function useRegisterForm({ onSubmit }: UseRegisterFormProps = {}) {
  const form = useForm<RegisterFormData>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    schema: registerSchema,
    onSubmit,
  });

  return form;
}
