import { create } from 'zustand';

export type Product = {
  itemName: string;
  slug: string;
  basePrice: number;
  discountPrice: number;
  details: string;
  files: string[];
  category: string;
  offers: string[];
  itemsInStock: number;
  isApproved: boolean;
  variants: {
    attributes: Record<string, string>;
    price: number;
    itemsInStock: number;
  }[];
};

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));