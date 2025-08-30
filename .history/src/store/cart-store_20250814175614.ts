/**
 * @file store/cart-store.ts
 * @description Defines a Zustand store for managing shopping cart state.
 * Uses `zustand/middleware/persist` to store state in localStorage with proper SSR handling.
 */

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

/**
 * Type for a cart item.
 */
export type CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

/**
 * Interface for order fees and charges.
 */
interface OrderFees {
  shipping: number
  vat: number
  buyerFee: number
  escrowFee: number
  insuranceSelected: boolean
  insuranceFee: number
}

/**
 * Interface for the Cart state.
 */
interface CartState {
  items: CartItem[]
  fees: OrderFees
  _hasHydrated: boolean
}

/**
 * Interface for the Cart actions.
 */
type CartActions = {
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  setInsurance: (selected: boolean) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotal: () => number
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines state and actions for the CartStore.
 */
type CartStore = CartState & CartActions

/**
 * Default fees configuration.
 */
const defaultFees: OrderFees = {
  shipping: 3000,
  vat: 3500,
  buyerFee: 3500,
  escrowFee: 2500,
  insuranceSelected: false,
  insuranceFee: 1000,
}

/**
 * Default cart items.
 */
const defaultItems: CartItem[] = [
  {
    id: "1",
    name: "Vintage Leather Jacket",
    image: "/vintage-leather-jacket.png",
    price: 10000,
    quantity: 1,
  },
  {
    id: "2",
    name: "Ceramic Vase",
    image: "/ceramic-vase-flowers.png",
    price: 50000,
    quantity: 2,
  },
]

/**
 * Creates the Zustand store for cart management with persistence.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: defaultItems,
      fees: defaultFees,
      _hasHydrated: false,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })),

      setInsurance: (selected) =>
        set((state) => ({
          fees: { ...state.fees, insuranceSelected: selected },
        })),

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotal: () => {
        const { fees } = get()
        const subtotal = get().getSubtotal()
        const insuranceCost = fees.insuranceSelected ? fees.insuranceFee : 0
        return subtotal + fees.shipping + fees.vat + fees.buyerFee + fees.escrowFee + insuranceCost
      },

      setHasHydrated: (hasHydrated) => {
        set({
          _hasHydrated: hasHydrated,
        })
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
