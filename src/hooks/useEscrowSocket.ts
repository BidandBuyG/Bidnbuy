import { useEffect, useState } from "react"
import type { EscrowState } from "@/types/escrow"

export function useEscrowSocket(orderId: string, initialState: EscrowState) {
  const [escrowState, setEscrowState] = useState<EscrowState>(initialState)
  const [isConnected, setIsConnected] = useState(false)
  const [currentCycle, setCurrentCycle] = useState(0)

  useEffect(() => {
    console.log("Starting escrow flow simulation...")
    setIsConnected(true)

    
    const simulateFlow = (cycleNumber: number) => {
      console.log(`Starting cycle ${cycleNumber + 1}`)

      
      setEscrowState(initialState)

      // Step 1: Change to "In Transit" after 6 seconds
      setTimeout(() => {
        console.log("Status changing to: In Transit")
        setEscrowState((prevState) => ({
          ...prevState,
          orderStatus: "In Transit",
          activeStep: 0,
        }))
      }, 6000)

      // Step 2: Change to "Delivered" (Item Received) after 12 seconds
      setTimeout(() => {
        console.log("Status changing to: Delivered (Item Received)")
        setEscrowState((prevState) => ({
          ...prevState,
          orderStatus: "Delivered",
          escrowStatus: "Item Received",
          activeStep: 1,
          isItemReceived: true,
        }))
      }, 12000)

      // Step 3: Progress to "Funds Released" after 17 seconds
      setTimeout(() => {
        console.log("Status progressing to: Funds Released")
        setEscrowState((prevState) => ({
          ...prevState,
          orderStatus: "Delivered",
          escrowStatus: "Funds Released",
          activeStep: 2,
          isItemReceived: true,
        }))
      }, 17000)

      
      setTimeout(() => {
        const nextCycle = cycleNumber + 1
        setCurrentCycle(nextCycle)
        simulateFlow(nextCycle)
      }, 22000)
    }

    
    simulateFlow(currentCycle)

    return () => {
      setIsConnected(false)
    }
  }, [orderId]) 

  return { escrowState, isConnected, currentCycle }
}
