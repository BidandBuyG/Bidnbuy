import { useState } from "react"
import type { UseFormReturn, FieldValues, Path } from "react-hook-form"
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

type CustomFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder: string
  type?: string
  icon?: "user" | "email" | "phone"
  showPasswordToggle?: boolean
  readOnly?: boolean
  textarea?: boolean
  datePicker?: boolean
  date?: Date | undefined
  setDate?: (date: Date | undefined) => void
  disabled?: boolean
}

function CustomFormField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  showPasswordToggle = false,
  textarea = false,
  datePicker = false,
  date,
  setDate,
  disabled = false,
}: CustomFormFieldProps<T>) {
  
  const [showPassword, setShowPassword] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case "user":
        return <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-300" />
      case "email":
        return <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-300" />
      case "phone":
        return <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-300" />
      default:
        return null
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <Label htmlFor={name} className="text-white text-sm font-medium">
            {label}
          </Label>
          <FormControl>
            <div className="relative">
              {getIcon()}
              <Input
                {...field}
                id={name}
                type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className={`
                  bg-[#00707B]/30 border-teal-500/50 h-12 text-white placeholder:text-teal-200/80 
                  focus:border-teal-400 focus:ring-0 focus:ring-offset-0 rounded-lg
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  ${icon ? "pl-10" : ""} 
                  ${showPasswordToggle ? "pr-10" : ""}
                `}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-300 hover:text-teal-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-400 text-xs" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField