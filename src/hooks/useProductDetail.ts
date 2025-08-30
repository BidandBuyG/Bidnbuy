import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

export function useProductDetail(slug: string) {
  return useQuery({
  queryKey: ['product', slug],
  queryFn: async () => {
    const { data } = await axiosInstance.get(`/api/v1/product/${slug}`);
    console.log("Product Data:", data.product);
    return data.product;
  },
  enabled: !!slug,
});
}


