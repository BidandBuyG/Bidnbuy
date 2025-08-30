import { useQuery } from '@tanstack/react-query';
import { getWalletStatus, getWalletBalances, getWalletLedger } from '@/services/wallet';

// Wallet status (for post-profile feedback)
export const useWalletStatus = () => {
  return useQuery({ queryKey: ['wallet-status'], queryFn: getWalletStatus });
};

// Wallet balances (for wallet UI)
export const useWalletBalances = () => {
  return useQuery({ queryKey: ['wallet-balances'], queryFn: getWalletBalances });
};

// Wallet ledger/transactions
export const useWalletLedger = () => {
  return useQuery({ queryKey: ['wallet-ledger'], queryFn: getWalletLedger });
};
