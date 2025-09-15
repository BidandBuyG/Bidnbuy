/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import EmailIcon from "../../assets/email.svg";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
};

export default function EmailField<T extends FieldValues>({
  control,
  name,
  // label = "Email",
  placeholder = "Enter your email",
}: Props<T>) {
  const { clearErrors } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <img
              src={EmailIcon}
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-4 text-white"
            />
            <FormControl>
              <Input
                type="email"
                placeholder={placeholder}
                autoComplete="email"
                className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors(field.name as any);
                }}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
