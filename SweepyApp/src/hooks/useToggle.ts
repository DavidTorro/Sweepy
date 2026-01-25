import { useState } from "react";

interface UseToggleReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  reset: () => void;
}

export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [isVisible, setIsVisible] = useState(initialValue);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible((prev) => !prev);
  const reset = () => setIsVisible(initialValue);

  return {
    isVisible,
    show,
    hide,
    toggle,
    reset,
  };
}
