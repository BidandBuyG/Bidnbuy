import { Edit2 } from "lucide-react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type EditableProfileFormFieldProps = {
  label: string;
  value: string;
  isEditing: boolean;
  toggleEdit: () => void;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  textarea?: boolean;
};

const EditableProfileFormField = ({
  label,
  value,
  isEditing,
  toggleEdit,
  register,
  error,
  type = "text",
  textarea = false,
}: EditableProfileFormFieldProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="block text-gray-300 text-sm mb-1">{label}</label>
        {isEditing && register ? (
          <div>
            {textarea ? (
              <textarea
                {...register}
                rows={2}
                style={{ backgroundColor: "#00707B4D" }}
                className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400 resize-none"
              />
            ) : (
              <input
                {...register}
                type={type}
                style={{ backgroundColor: "#00707B4D" }}
                className="w-full text-white px-3 py-2 rounded-md border border-teal-600 focus:outline-none focus:border-teal-400"
              />
            )}
            {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
          </div>
        ) : (
          <p className="text-white">{value}</p>
        )}
      </div>
      {!isEditing && (
        <button
          type="button"
          onClick={toggleEdit}
          className="ml-4 text-gray-400 hover:text-white"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default EditableProfileFormField;
