import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Form } from "@/components/ui/form"
import { useAuthMutation } from "@/hooks/useAuthMutation"
import { authService } from "@/services/auth"

import { signupSchema, type SignupFormValues } from "@/lib/validations/auth"

import DesktopCustomerSignUp from "./DesktopCustomerSignUp"
import MobileCustomerSignUp from "./MobileCustomerSignUp"


const CustomerSignup = () => {
  const navigate = useNavigate()
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  
  const signupMutation = useAuthMutation<SignupFormValues, import("@/services/auth").AuthResponse>(async (values) => {
   
    return await authService.signup({
      name: values.name,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      userRole: "customer",
    } as any)
  }, {
    onSuccess: (data, variables) => {
      toast.success("Account created successfully! Verification code sent to your email.")
      form.reset()
      console.log("Customer Signup response:", data)
      navigate("/customer-account-verify", { state: { email: variables.email } })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "An error occurred. Please try again."
      toast.error(message)
    }
  })

  function onSubmit(values: SignupFormValues) {
    console.log("Form values:", values);
    signupMutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-[#01151C]">
      <Form {...form}>
        <MobileCustomerSignUp form={form} onSubmit={onSubmit} isLoading={signupMutation.isPending} />
        <DesktopCustomerSignUp form={form} onSubmit={onSubmit} isLoading={signupMutation.isPending} />
      </Form>
    </div>
  )
}

export default CustomerSignup
