import HermesBagImage from "@/assets/products/hermes-bag.png"
import type { EscrowOrder } from "@/types/escrow"

export const exploreEscrows: EscrowOrder[] = [
  {
    id: "1",
    productName: "Hermes Birkin Bag",
    buyer: "John Doe",
    status: "In Escrow",
    amount: "200,000",
    image: HermesBagImage,
    details: "Order for Hermes Birkin Bag, awaiting delivery."
  },
  {
    id: "2",
    productName: "Smart Watch",
    buyer: "Jane Smith",
    status: "Funds Released",
    amount: "149.99",
    image: HermesBagImage,
    details: "Order for smart watch, payment released to vendor."
  },
  {
    id: "3",
    productName: "Bluetooth Speaker",
    buyer: "Alice Brown",
    status: "Item Received",
    amount: "5999",
    image: HermesBagImage,
    details: "Order for bluetooth speaker, item received by buyer."
  },
  {
    id: "4",
    productName: "Gaming Mouse",
    buyer: "Bob Lee",
    status: "Pending",
    amount: "39.99",
    image: HermesBagImage,
    details: "Order for gaming mouse, pending vendor confirmation."
  }
]
