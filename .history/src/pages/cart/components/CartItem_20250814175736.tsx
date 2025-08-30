import type { CartItem } from "@/store/cart-store"

/**
 * Props for the CartItemComponent.
 * @typedef {Object} CartItemProps
 * @property {CartItem} item - The cart item data.
 * @property {(itemId: string, quantity: number) => void} [onUpdateQuantity] - Callback for quantity updates.
 * @property {(itemId: string) => void} [onRemove] - Callback for item removal.
 */

type CartItemProps = {
  item: CartItem
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  onRemove?: (itemId: string) => void
}

/**
 * CartItemComponent displays a single cart item with image, details, and price.
 * @param {CartItemProps} props - The component props.
 * @returns {JSX.Element} The rendered cart item.
 */

const CartItem = ({ item }: CartItemProps) => {
  /**
   * Formats price in Naira currency.
   * @param {number} amount - The amount to format.
   * @returns {string} Formatted price string.
   */
  const formatPrice = (amount: number): string => {
    return `N${amount.toLocaleString()}`
  }

  return (
    <div className="flex items-center gap-4 mb-6">
    
      <div className="flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-white text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-300 text-base">Quantity: {item.quantity}</p>
      </div>

      {/* Price */}
      <div className="text-white text-lg font-semibold">{formatPrice(item.price * item.quantity)}</div>
    </div>
  )
}

e