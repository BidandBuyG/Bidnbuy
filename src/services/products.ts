import { axiosInstance } from '@/lib/axios';
import type { Product } from '@/store/products';

type ProductApiResponse = {
  status: string;
  nextCursor: string;
  data: Product[];
};


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<ProductApiResponse>('/api/v1/product');
    console.log('Fetched products:', response.data);
    return response.data.data
    // return response.data.data.filter((product) => product.isApproved);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};