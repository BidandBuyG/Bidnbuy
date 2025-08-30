import { useQuery } from '@tanstack/react-query';
import { getWalletStatus, getWalletLedger } from '@/services/wallet';

export const useWalletStatus = () => {
  return useQuery(['wallet-status'], queryfgetWalletStatus);
};



export const useWalletLedger = () => {
  return useQuery(['wallet-ledger'], getWalletLedger);
};
