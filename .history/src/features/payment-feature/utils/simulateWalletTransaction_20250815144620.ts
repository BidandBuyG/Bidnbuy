export const simulateWalletTransaction = async (amount: number) => {
  return new Promise<{ success: boolean; transactionId: string; message?: string }>((resolve) => {
    setTimeout(() => {
      if (amount > 0) {
        resolve({ success: true, transactionId: `TXN${Date.now()}`, message: "Wallet top-up successful!" })
      } else {
        resolve({ success: false, transactionId: "", message: "Invalid amount." })
      }
    }, 1000)
  })
}