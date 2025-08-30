import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { forwardRef } from "react"

type UploadProductFormFieldProps = {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function UploadProductFormField({ label, error, required, children }: UploadProductFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-white text-sm font-normal">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

interface UploadProductFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const UploadProductFormInput = forwardRef<HTMLInputElement, UploadProductFormInputProps>(({ error, className = "", ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={`bg-[#01151C] border-[#00707B] text-white placeholder:text-gray-500 focus:border-[#00707B] focus:ring-0 h-12 rounded-md ${
        error ? "border-red-400" : ""
      } ${className}`}
      {...props}
    />
  )
})
UploadProductFormInput.displayName = "UploadProductFormInput"

type UploadProductFormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean
}

export const UploadProductFormTextarea = forwardRef<HTMLTextAreaElement, UploadProductFormTextareaProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={`bg-[#01151C] border-[#00707B] text-white placeholder:text-gray-500 focus:border-[#00707B] focus:ring-0 min-h-[120px] md:min-h-[150px] resize-none rounded-md ${
          error ? "border-red-400" : ""
        } ${className}`}
        {...props}
      />
    )
  },
)
UploadProductFormTextarea.displayName = "UploadProductFormTextarea"

type UploadProductFormSelectProps = {
  placeholder: string
  options: { value: string; label: string }[]
  onValueChange: (value: string) => void
  error?: boolean
}

export function UploadProductFormSelect({ placeholder, options, onValueChange, error }: UploadProductFormSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger
        className={`bg-[#01151C] border-[#00707B] text-white h-12 rounded-md focus:ring-0 focus:border-[#00707B] ${
          error ? "border-red-400" : ""
        }`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#01151C] border-[#00707B] text-white">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type PriceInputProps = {
  placeholder?: string
  error?: boolean
  onChange: (value: string) => void
  value: string
}

export function PriceInput({ placeholder, error, onChange, value }: PriceInputProps) {
  return (
    <div className="flex">
      <div className="bg-[#01151C] border-[#00707B] border px-3 py-3 text-gray-500 text-sm rounded-l-md flex items-center">
        ₦
      </div>
      <div className="w-px bg-[#00707B]"></div>
      <Input
        type="number"
        min="0"
        step="0.01"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-[#01151C] border-[#00707B] border-l-0 text-white focus:border-[#00707B] focus:ring-0 h-12 rounded-l-none rounded-r-md ${
          error ? "border-red-400" : ""
        }`}
      />
    </div>
  )
}
