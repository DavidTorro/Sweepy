import { useState } from "react";
import { ZodError, ZodSchema } from "zod";

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
  validateField: (field: keyof T) => Promise<boolean>;
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

  const normalizeValues = (currentValues: T): T => {
    const normalized: Record<string, any> = {};
    Object.entries(currentValues).forEach(([key, value]) => {
      normalized[key] = typeof value === "string" ? value.trim() : value;
    });
    return normalized as T;
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

  const validateField = async (field: keyof T) => {
    if (!schema) return true;

    const normalized = normalizeValues(values);
    const result = await schema.safeParseAsync(normalized);

    if (result.success) {
      setFieldError(field, "");
      return true;
    }

    const fieldIssue = result.error.issues.find((issue) => issue.path[0] === field);
    setFieldError(field, fieldIssue ? fieldIssue.message : "");
    return !fieldIssue;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const normalizedValues = normalizeValues(values);
      setValues(normalizedValues);

      // Validar con Zod si existe schema
      if (schema) {
        try {
          await schema.parseAsync(normalizedValues);
          clearErrors();
        } catch (error) {
          if (error instanceof ZodError) {
            const fieldErrors: Record<keyof T, string> = {} as Record<
              keyof T,
              string
            >;
            error.issues.forEach((issue) => {
              const field = issue.path[0] as keyof T;
              fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
          }
          setIsSubmitting(false);
          return;
        }
      }

      // Ejecutar submit si existe
      if (onSubmit) {
        await onSubmit(normalizedValues);
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
    validateField,
    clearErrors,
    clearTouched,
    reset,
    handleSubmit,
  };
}
