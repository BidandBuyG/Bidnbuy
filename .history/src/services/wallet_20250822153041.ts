import axiosInstance from '@/lib/axios';

export const getWalletStatus = async () => {
  const response = await axiosInstance.get('/api/v1/wallet', { withCredentials: true });
  return response.data;
};

export const getWalletLedger = async () => {
  const response = await axiosInstance.get('/api/v1/ledger', { withCredentials: true });
  return response.data;
};
