import type { UseFormReturn, FieldValues, Path } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CustomFormField from "../custom-form-field/CustomFormField"

type SignInFormFieldsProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (values: T) => void
  isLoading?: boolean
}

function SignInFormFields<T extends FieldValues>({ form, onSubmit, isLoading = false }: SignInFormFieldsProps<T>) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

      <CustomFormField<T>
        form={form}
        name={"email" as Path<T>}
        label="Email Address"
        placeholder="johndoe@gmail.com"
        type="email"
        icon="email"
      />

      <CustomFormField<T>
        form={form}
        name={"password" as Path<T>}
        label="Password"
        placeholder="Enter Your Password"
        showPasswordToggle
      />

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 h-12 rounded-lg text-base transition-colors shadow-lg disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </div>

      <div className="text-center pt-6">
        <p className="text-teal-100 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup/customer"
            className="text-white hover:text-teal-200 font-medium underline underline-offset-2 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignInFormFields
