import { useQuery } from '@tanstack/react-query';
import { getWalletStatus, getWalletLedger } from '@/services/wallet';

export const useWalletStatus = () => {
  return useQuery({ queryKey: ['wallet-status'], queryFn: getWalletStatus });
};



export const useWalletLedger = () => {
  return useQuery({ queryKey: ['wallet-ledger'], getWalletLedger });
};
