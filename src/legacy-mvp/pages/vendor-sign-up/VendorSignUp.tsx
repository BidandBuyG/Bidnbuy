import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Form } from "@/components/ui/form"

import { signupSchema, type SignupFormValues } from "@/lib/validations/auth"

import { authService } from "@/services/auth"
import { useAuthMutation } from "@/hooks/useAuthMutation"
import MobileVendorSignUp from "./MobileCustomerSignUp"
import DesktopVendorSignup from "./DesktopVendorSignUp"


const VendorSignup = () => {
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
      userRole: "vendor",
    } as any)
  }, {
    onSuccess: (data, variables) => {
      toast.success("Account created successfully!")
      form.reset()
      console.log("Vendor Signup response:", data)
      navigate("/vendor-account-verify", { state: { email: variables.email } })
      
    },
    onError: (error: any) => {

      const message =
    error?.response?.data?.message ||
    error?.message || // This will catch "Network Error"
    "An error occurred. Please try again.";
  toast.error(message);
    }
  })

  function onSubmit(values: SignupFormValues) {
    signupMutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-[#01151C]">
      <Form {...form}>
        <MobileVendorSignUp form={form} onSubmit={onSubmit} isLoading={signupMutation.isPending} />
        <DesktopVendorSignup form={form} onSubmit={onSubmit} isLoading={signupMutation.isPending} />
      </Form>
    </div>
  )
}

export default VendorSignup
