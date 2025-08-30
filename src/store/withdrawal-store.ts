import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WithdrawalTransaction = {
  id: string
  amount: number
  bank: string
  accountNumber: string
  status: "pending" | "completed" | "failed"
  transactionId: string
  createdAt: Date
  newBalance: number
}

type WithdrawalStore = {
  currentBalance: number
  isProcessing: boolean
  transactions: WithdrawalTransaction[]
  lastTransaction: WithdrawalTransaction | null

  // Actions
  setBalance: (balance: number) => void
  setProcessing: (processing: boolean) => void
  addTransaction: (transaction: WithdrawalTransaction) => void
  updateTransactionStatus: (id: string, status: WithdrawalTransaction["status"]) => void
  setLastTransaction: (transaction: WithdrawalTransaction) => void
}

export const useWithdrawalStore = create<WithdrawalStore>()(
  persist(
    (set) => ({
      currentBalance: 1250,
      isProcessing: false,
      transactions: [],
      lastTransaction: null,

      setBalance: (balance) => set({ currentBalance: balance }),

      setProcessing: (processing) => set({ isProcessing: processing }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
          currentBalance: transaction.newBalance,
        })),

      updateTransactionStatus: (id, status) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      setLastTransaction: (transaction) => set({ lastTransaction: transaction }),
    }),
    {
      name: "withdrawal-store",
    },
  ),
)
