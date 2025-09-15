"use client";
import { useEffect } from "react";
import { useHealthCheck } from "../hooks/useHealthCheck";
import { ErrorToast, SuccessToast } from "./Toasts";

export function HealthBadge() {
  const {
    data,
    // isLoading,
    error,
  } = useHealthCheck();

  useEffect(() => {
    if (data) {
      SuccessToast(`Health: ${JSON.stringify(data)}`);
    }
    if (error) {
      ErrorToast("Health check failed");
    }
  }, [data, error]);

  // if (isLoading)
  //   return (
  //     <div className="fixed bottom-4 right-4 bg-gray-200 p-2 rounded">
  //       Loading...
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="fixed bottom-4 right-4 bg-red-200 p-2 rounded">Error</div>
  //   );
  // return (
  //   <div className="fixed top-2 right-2 bg-green-200 text-white px-3 py-1 rounded">
  //     {isLoading ? "..." : JSON.stringify(data)}
  //   </div>
  // );
  return null; // no UI, just toasts
}
