"use client";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Mail } from "lucide-react";

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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <FormControl>
              <Input
                type="email"
                placeholder={placeholder}
                autoComplete="email"
                className="pl-9 h-12 rounded-lg bg-white/5 border-[#0a1b1d] text-white placeholder:text-white"
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
