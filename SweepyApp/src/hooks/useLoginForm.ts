import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { useForm } from "./useForm";

interface UseLoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
}

export function useLoginForm({ onSubmit }: UseLoginFormProps = {}) {
  const form = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    schema: loginSchema,
    onSubmit,
  });

  return form;
}
