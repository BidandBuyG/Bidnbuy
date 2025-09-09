import toast from "react-hot-toast";

export const SuccessToast = (ToastMessage: string) => {
  toast.success(`${ToastMessage}`, {
    duration: 4500,
    style: {
      // border: "2px solid #00707B",
      padding: "16px 32px",
      color: "#00707B",
    },
    iconTheme: {
      primary: "#059669",
      secondary: "#FFFAEE",
    },
    position: "top-center",
  });
};

export const ErrorToast = (ToastMessage: string) => {
  toast.error(`${ToastMessage}`, {
    duration: 4000,
    style: {
      // border: "2px solid #00707B",
      padding: "16px 32px",
      color: "#00707B",
    },
    iconTheme: {
      primary: "#ff5555",
      secondary: "#FFFAEE",
    },
    position: "top-center",
  });
};
