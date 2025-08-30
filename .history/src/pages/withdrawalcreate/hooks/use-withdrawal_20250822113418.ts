import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useWithdrawalStore } from "@/store/withdrawal-store"

import type { WithdrawalTransaction } from "@/store/withdrawal-store"
import type { WithdrawalFormData } from "../lib/withdrawal-schema"

// Mock API function
const processWithdrawal = async (data: WithdrawalFormData): Promise<WithdrawalTransaction> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate transaction
  const transaction: WithdrawalTransaction = {
    id: Math.random().toString(36).substr(2, 9),
    amount: Number(data.amount),
    bank: data.bank,
    accountNumber: data.accountNumber,
    status: "completed",
    transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    createdAt: new Date(),
    newBalance: 1250 - Number(data.amount), // Mock calculation
  }

  return transaction
}

export const useWithdrawal = () => {
  const queryClient = useQueryClient()
  const { addTransaction, setProcessing, setLastTransaction } = useWithdrawalStore()

  return useMutation({
    mutationFn: processWithdrawal,
    onMutate: () => {
      setProcessing(true)
    },
    onSuccess: (transaction) => {
      addTransaction(transaction)
      setLastTransaction(transaction)
      setProcessing(false)

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (error) => {
      setProcessing(false)
      console.error("Withdrawal failed:", error)
    },
  })
}
