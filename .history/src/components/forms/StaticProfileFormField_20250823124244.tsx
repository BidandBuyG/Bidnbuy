import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type StaticFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  maxLength?: number;
};

const StaticField = ({
  label,
  register,
  error,
  type = "text",
  placeholder,
  maxLength,
}: StaticFieldProps) => {
  return (
    <div>
      <label className="block text-gray-300 text-sm mb-1">{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ backgroundColor: "#00707B4D" }}
        className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
      />
      {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
    </div>
  );
};

export default StaticField;
