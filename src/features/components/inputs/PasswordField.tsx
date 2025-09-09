"use client";
import * as React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Eye, EyeClosed, Lock } from "lucide-react";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export default function PasswordField<T extends FieldValues>({
  control,
  name,
  // label = "Password",
  placeholder = "Enter your password",
}: Props<T>) {
  const [show, setShow] = React.useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <FormControl>
              <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                autoComplete="current-password"
                className="pl-9 pr-10 h-12 rounded-lg bg-white/5 border-[#0a1b1d] text-white placeholder:text-white"
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <Eye className="h-4 w-4 text-white" />
              ) : (
                <EyeClosed className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
