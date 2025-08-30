import axiosInstance from '@/lib/axios';

// Get wallet status (after profile completion)
export const getWalletStatus = async () => {
  const response = await axiosInstance.get('/api/v1/wallet', { withCredentials: true });
  return response.data;
};

// Get wallet balances and details
export const getWalletBalances = async () => {
  const response = await axiosInstance.get('/api/v1/wallet', { withCredentials: true });
  return response.data;
};

// Get wallet ledger/transactions
export const getWalletLedger = async () => {
  const response = await axiosInstance.get('/api/v1/ledger', { withCredentials: true });
  return response.data;
};
