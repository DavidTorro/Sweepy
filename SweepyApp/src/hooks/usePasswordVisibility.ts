import { useState } from "react";

interface UsePasswordVisibilityReturn {
  showPassword: boolean;
  toggleShowPassword: () => void;
  rightIcon: "eye" | "eye-off";
}

export function usePasswordVisibility(): UsePasswordVisibilityReturn {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const rightIcon = showPassword ? "eye-off" : "eye";

  return {
    showPassword,
    toggleShowPassword,
    rightIcon,
  };
}
