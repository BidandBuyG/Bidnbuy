export type OrderStatus = "Pending" | "In Transit" | "Delivered" | "Received"

export type EscrowStatus = "In Escrow" | "Item Received" | "Funds Released" | "Funds Refunded"

export type EscrowState = {
  orderStatus: OrderStatus
  escrowStatus: EscrowStatus
  activeStep: number
  isItemReceived: boolean
}

export type EscrowUpdateEvent = {
  orderId: string
  orderStatus: OrderStatus
  escrowStatus: EscrowStatus
  timestamp: string
}

export type PaymentReceivedEvent = {
  orderId: string
  amount: number
  currency: string
  timestamp: string
}

export type Step = {
  id: number
  title: string
  completed: boolean
  active: boolean
  icon?: string
}


export type EscrowOrder = { 
  id: string;
  productName: string;
  buyer: string;
  status: string;
  amount: string;
  image: string;
  details: string;
}