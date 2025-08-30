import { useState } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return {
    showPassword,
    togglePassword,
    showConfirmPassword,
    toggleConfirmPassword,
  };
}
