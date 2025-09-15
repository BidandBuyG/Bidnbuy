"use client";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UserRound } from "lucide-react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  // name: keyof T & string;
  name: Path<T>;
  label?: string;
  placeholder?: string;
};

export default function NameField<T extends FieldValues>({
  control,
  name,
  // label = "Name",
  placeholder = "Enter your name",
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {/* <FormLabel className="text-white/80">{label}</FormLabel> */}
          <div className="relative">
            <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                autoComplete="name"
                className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
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
