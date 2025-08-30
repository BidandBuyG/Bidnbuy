import { useForm } from "react-hook-form"
import { ChevronDown } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { withdrawalSchema, type WithdrawalFormData } from "@/lib/validation/withdrawal-schema"
import { useWithdrawalStore } from "@/store/withdrawal-store"

type WithdrawalFormProps = {
  onSubmit: (data: WithdrawalFormData) => void
  isLoading?: boolean
}

const banks = [
  "United Bank for Africa (UBA)",
  "First Bank of Nigeria",
  "Guaranty Trust Bank (GTB)",
  "Access Bank",
  "Zenith Bank",
  "Fidelity Bank",
  "Sterling Bank",
  "Union Bank",
  "Wema Bank",
  "Polaris Bank",
]

export function WithdrawalForm({ onSubmit, isLoading = false }: WithdrawalFormProps) {
  const { currentBalance } = useWithdrawalStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
      bank: "",
      accountNumber: "",
    },
  })

  const watchedBank = watch("bank")

  const handleFormSubmit = (data: WithdrawalFormData) => {
    // Additional validation: check if amount exceeds balance
    const withdrawalAmount = Number.parseFloat(data.amount)
    if (withdrawalAmount > currentBalance) {
      setError("amount", {
        message: "Insufficient balance",
      })
      return
    }

    onSubmit(data)
  }

  return (
    <div className="w-full max-w-md mx-auto md:max-w-lg">
      {/* Balance Display */}
      <div className="mb-8">
        <p className="text-gray-300 text-lg mb-2">Your Balance</p>
        <p className="text-white text-2xl md:text-3xl font-bold">₦{currentBalance.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-white text-lg mb-3">Enter Withdrawal Amount</label>
          <Input
            type="number"
            placeholder="Required"
            className="w-full h-14 bg-transparent border border-[#00707B] rounded-lg px-4 text-white placeholder-gray-500 text-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            disabled={isLoading}
            {...register("amount")}
          />
          {errors.amount && <p className="text-red-400 text-sm mt-2">{errors.amount.message}</p>}
        </div>

        {/* Bank Selection */}
        <div>
          <label className="block text-white text-lg mb-3">Select Destination Bank</label>
          <Select value={watchedBank} onValueChange={(value) => setValue("bank", value)} disabled={isLoading}>
            <SelectTrigger className="w-full h-14 bg-transparent border border-[#00707B] rounded-lg px-4 text-white text-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400">
              <SelectValue placeholder="Bank Name" className="text-gray-500" />
              <ChevronDown className="w-5 h-5 text-white" />
            </SelectTrigger>
            <SelectContent className="bg-[#013139] border border-[#00707B]">
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank} className="text-white hover:bg-[#00707B] focus:bg-[#00707B]">
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bank && <p className="text-red-400 text-sm mt-2">{errors.bank.message}</p>}
        </div>

        {/* Account Number Input */}
        <div>
          <label className="block text-white text-lg mb-3">Enter Account Number</label>
          <Input
            type="text"
            placeholder="Required"
            className="w-full h-14 bg-transparent border border-[#00707B] rounded-lg px-4 text-white placeholder-gray-500 text-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            disabled={isLoading}
            {...register("accountNumber")}
          />
          {errors.accountNumber && <p className="text-red-400 text-sm mt-2">{errors.accountNumber.message}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg mt-8 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Withdraw"}
        </Button>
      </form>
    </div>
  )
}
