import { useState } from "react";
import { ZodSchema } from "zod";

interface UseFormProps<T> {
  initialValues: T;
  schema?: ZodSchema;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  clearErrors: () => void;
  clearTouched: () => void;
  reset: () => void;
  handleSubmit: () => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.keys(initialValues).reduce(
      (acc, key) => ({
        ...acc,
        [key]: "",
      }),
      {} as Record<keyof T, string>,
    ),
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {} as Record<keyof T, boolean>,
    ),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpiar error al cambiar el valor
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const setFieldError = (field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const setFieldTouched = (field: keyof T, touched: boolean) => {
    setTouched((prev) => ({
      ...prev,
      [field]: touched,
    }));
  };

  const clearErrors = () => {
    setErrors(
      Object.keys(initialValues).reduce(
        (acc, key) => ({
          ...acc,
          [key]: "",
        }),
        {} as Record<keyof T, string>,
      ),
    );
  };

  const clearTouched = () => {
    setTouched(
      Object.keys(initialValues).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {} as Record<keyof T, boolean>,
      ),
    );
  };

  const reset = () => {
    setValues(initialValues);
    clearErrors();
    clearTouched();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validar con Zod si existe schema
      if (schema) {
        try {
          await schema.parseAsync(values);
          clearErrors();
        } catch (error: any) {
          const fieldErrors: Record<keyof T, string> = {} as Record<
            keyof T,
            string
          >;
          if (error.errors) {
            error.errors.forEach((err: any) => {
              const field = err.path[0] as keyof T;
              fieldErrors[field] = err.message;
            });
          }
          setErrors(fieldErrors);
          setIsSubmitting(false);
          return;
        }
      }

      // Ejecutar submit si existe
      if (onSubmit) {
        await onSubmit(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    clearErrors,
    clearTouched,
    reset,
    handleSubmit,
  };
}
