type FormSubmitButtonProps = {
  isSubmitting: boolean;
  disabled?: boolean;
  label: string;
};

const FormSubmitButton = ({ isSubmitting, disabled, label }: FormSubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className="w-full font-medium py-3 px-6 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ backgroundColor: "#00707B" }}
    >
      {isSubmitting ? "Updating..." : label}
    </button>
  );
};

export default FormSubmitButton;
