import { toast } from "sonner";
// import { Check, X } from "lucide-react";

export const SuccessToast = (ToastMessage: string) => {
  // Use plain text message to make assertions in tests reliable
  toast.success(String(ToastMessage), {
    duration: 4500,
    position: "top-center",
    style: {
      background: "#059669",
      padding: "12px 16px",
      borderRadius: "8px",
    },
  });
};

export const ErrorToast = (ToastMessage: string) => {
  // Use plain text message to make assertions in tests reliable
  toast.error(String(ToastMessage), {
    duration: 4000,
    position: "top-center",
    style: {
      background: "#dc2626",
      padding: "12px 16px",
      borderRadius: "8px",
    },
  });
};
