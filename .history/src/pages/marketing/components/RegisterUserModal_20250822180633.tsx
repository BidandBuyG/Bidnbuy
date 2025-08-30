import { useState } from "react"
import { useForm } from "react-hook-form"
import { X, User, Phone, Mail, Check } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"

// import { type RegisterUserFormData, registerUserSchema } from "@/lib/validation/marketing-schema"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRegisterUser } from "../hooks/useMarketing"
import { registerUserSchema, type RegisterUserFormData } from "../lib/marketing-schema"



type RegisterUserModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegisterUserModal({ open, onOpenChange }: RegisterUserModalProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const registerMutation = useRegisterUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
  })

  const category = watch("category")

  const onSubmit = async (data: RegisterUserFormData) => {
    try {
      await registerMutation.mutateAsync(data)
      setShowSuccess(true)

      // Hide success message and close modal after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        reset()
      }, 2000)
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  const handleClose = () => {
    if (!registerMutation.isPending) {
      onOpenChange(false)
      reset()
      setShowSuccess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-teal-900 border-teal-600 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-white">
            Register New User
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={registerMutation.isPending}
              className="text-white hover:bg-teal-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-white">Successful</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300" />
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className="pl-10 bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300" />
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="+2347067480476"
                  className="pl-10 bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress" className="text-white">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-300" />
                <Input
                  id="emailAddress"
                  type="email"
                  {...register("emailAddress")}
                  placeholder="johndoe@gmail.com"
                  className="pl-10 bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300"
                />
              </div>
              {errors.emailAddress && <p className="text-red-400 text-sm">{errors.emailAddress.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Category</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={category === "buyer" ? "default" : "outline"}
                  onClick={() => setValue("category", "buyer")}
                  className={
                    category === "buyer"
                      ? "bg-teal-600 hover:bg-teal-500 text-white"
                      : "border-teal-600 text-teal-300 hover:bg-teal-800"
                  }
                >
                  Buyer
                </Button>
                <Button
                  type="button"
                  variant={category === "vendor" ? "default" : "outline"}
                  onClick={() => setValue("category", "vendor")}
                  className={
                    category === "vendor"
                      ? "bg-teal-600 hover:bg-teal-500 text-white"
                      : "border-teal-600 text-teal-300 hover:bg-teal-800"
                  }
                >
                  Vendor
                </Button>
              </div>
              {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white"
            >
              {registerMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
