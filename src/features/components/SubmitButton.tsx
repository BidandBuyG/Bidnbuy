"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";

type SubmitButtonProps = {
  cta: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function SubmitButton({
  cta,
  loading = false,
  loadingText = "Logging in...",
  disabled,
  className = "",
  type = "submit",
}: SubmitButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isDisabled = useMemo(() => disabled || loading, [disabled, loading]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const translateYClass = isMounted ? "translate-y-0" : "translate-y-full";

  return (
    <Button
      type={type}
      className={`w-full bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-3 transition-transform duration-500 ease-out ${translateYClass} ${className}`}
      disabled={isDisabled}
    >
      {loading ? loadingText : cta}
    </Button>
  );
}
