import type { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import type { SignupFormValues } from "@/lib/validations/auth"
import { Link } from "react-router-dom"
import CustomFormField from "../forms/CustomFormField"

type SignupFormFieldsProps = {
  form: UseFormReturn<SignupFormValues>
  onSubmit: (values: SignupFormValues) => void
  isLoading?: boolean
}

export function SignupFormFields({ form, onSubmit, isLoading = false }: SignupFormFieldsProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <CustomFormField form={form} name="name" label="Name" placeholder="johndoe" icon="user" />

      <CustomFormField
        form={form}
        name="email"
        label="Email Address"
        placeholder="johndoe@gmail.com"
        type="email"
        icon="email"
      />

      <CustomFormField
        form={form}
        name="phoneNumber"
        label="Phone Number"
        placeholder="+234706748047G"
        type="tel"
        icon="phone"
      />

      <CustomFormField
        form={form}
        name="password"
        label="Password"
        placeholder="Enter Your Password"
        showPasswordToggle
      />

      <CustomFormField
        form={form}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Your Password"
        showPasswordToggle
      />

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 h-12 rounded-lg text-base transition-colors shadow-lg disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Proceed →"}
        </Button>
      </div>

      <div className="text-center pt-6">
        <p className="text-teal-100 text-sm">
          Already have an account?{" "}
          <Link
            to="/login/customer"
            className="text-white hover:text-teal-200 font-medium underline underline-offset-2 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  )
}
