/**
 * @file store/bid-credit-store.ts
 * @description Defines a Zustand store for managing global bid credit related state.
 * This includes the user's current balance, the top-up amount, and transaction details.
 */

import { create } from "zustand"

/**
 * Type for the BidCreditStore state.
 * @typedef {Object} BidCreditState
 * @property {number} currentBalance - The user's current bid credit balance.
 * @property {number | null} lastTopUpAmount - The amount from the last successful top-up.
 * @property {string | null} lastTransactionId - The transaction ID from the last successful top-up.
 */

type BidCreditState = {
  currentBalance: number;
  lastTopUpAmount: number | null;
  lastTransactionId: string | null;
  bidBalance: number;
  
}

/**
 * Type for the BidCreditStore actions.
 * @typedef {Object} BidCreditActions
 * @property {(amount: number) => void} topUpBalance - Action to simulate topping up the balance.
 * @property {(amount: number) => void} setLastTopUpAmount - Sets the last top-up amount.
 * @property {(id: string) => void} setLastTransactionId - Sets the last transaction ID.
 * @property {() => void} resetTransactionDetails - Resets the last top-up amount and transaction ID.
 */

type BidCreditActions = {
  topUpBalance: (amount: number) => void;
  setLastTopUpAmount: (amount: number) => void;
  setLastTransactionId: (id: string) => void;
  resetTransactionDetails: () => void;
  setBidBalance: (amount: number) => void;
  setCurrentBalance: (amount: number) => void;
}

/**
 * Combines state and actions for the BidCreditStore.
 * @typedef {BidCreditState & BidCreditActions} BidCreditStore
 */

type BidCreditStore = BidCreditState & BidCreditActions


/**
 * Creates the Zustand store for bid credit management.
 * @function useBidCreditStore
 * @returns {BidCreditStore} The Zustand store hook.
 */


export const useBidCreditStore = create<BidCreditStore>((set) => ({
  currentBalance: 500, // Initial balance as per the screenshot
  lastTopUpAmount: null,
  lastTransactionId: null,

  bidBalance: 1250,
  setBidBalance: (amount: number) => set({ bidBalance: amount }),

  /**
   * Simulates topping up the user's balance.
   * @param {number} amount - The amount to add to the balance.
   */

  topUpBalance: (amount) => set((state) => ({ currentBalance: state.currentBalance + amount })),


  /**
   * Sets the user's current balance directly (e.g., after withdrawal).
   * @param {number} amount - The new balance.
   */
  setCurrentBalance: (amount: number) => set({ currentBalance: amount }),


  /**
   * Sets the amount of the last successful top-up.
   * @param {number} amount - The amount.
   */

  setLastTopUpAmount: (amount) => set({ lastTopUpAmount: amount }),

  /**
   * Sets the transaction ID of the last successful top-up.
   * @param {string} id - The transaction ID.
   */

  setLastTransactionId: (id) => set({ lastTransactionId: id }),

  /**
   * Resets the details of the last transaction.
   */

  resetTransactionDetails: () => set({ lastTopUpAmount: null, lastTransactionId: null }),
  
}))
