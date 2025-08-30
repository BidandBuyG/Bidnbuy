import type { UseFormReturn } from "react-hook-form"
import type { LoginFormValues, SignupFormValues } from "../lib/validations/auth"

export type SignupProps = {
  form: UseFormReturn<SignupFormValues>
  onSubmit: (values: SignupFormValues) => void
  isLoading?: boolean
}

export type SignInProps = {
  form: UseFormReturn<LoginFormValues>
  onSubmit: (values: LoginFormValues) => void
  isLoading?: boolean
}