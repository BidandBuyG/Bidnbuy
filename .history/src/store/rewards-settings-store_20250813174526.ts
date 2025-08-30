/**
 * @file store/reward-settings-store.ts
 * @description Defines a Zustand store for managing reward settings state.
 * Uses `zustand/middleware/persist` to store state in localStorage.
 */

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

/**
 * Types for the RewardSettings state.
 * @typedef {Object} RewardSettingsState
 * @property {boolean} rewardsEnabled - Whether rewards are enabled.
 * @property {string} cashbackPercentage - Cashback percentage value.
 * @property {string} streakCaps - Streak caps value.
 * @property {string} platformPercentage - Platform split percentage.
 * @property {string} sellerPercentage - Seller split percentage.
 * @property {string} conversionRate - BidCredit conversion rate.
 * @property {string} minimumBidCredit - Minimum BidCredit amount.
 * @property {string} maximumBidCredit - Maximum BidCredit amount.
 * @property {string} listingFee - Listing fee amount.
 */

type RewardSettingsState = {
  rewardsEnabled: boolean
  cashbackPercentage: string
  streakCaps: string
  platformPercentage: string
  sellerPercentage: string
  conversionRate: string
  minimumBidCredit: string
  maximumBidCredit: string
  listingFee: string
}

/**
 * Types for the RewardSettings actions.
 * @typedef {Object} RewardSettingsActions
 * @property {(settings: Partial<RewardSettingsState>) => void} updateSettings - Updates multiple settings at once.
 * @property {(enabled: boolean) => void} setRewardsEnabled - Sets the rewards enabled state.
 * @property {() => void} resetSettings - Resets all settings to default values.
 */
interface RewardSettingsActions {
  updateSettings: (settings: Partial<RewardSettingsState>) => void
  setRewardsEnabled: (enabled: boolean) => void
  resetSettings: () => void
}

/**
 * Combines state and actions for the RewardSettingsStore.
 * @typedef {RewardSettingsState & RewardSettingsActions} RewardSettingsStore
 */
type RewardSettingsStore = RewardSettingsState & RewardSettingsActions

/**
 * Default settings values.
 */
const defaultSettings: RewardSettingsState = {
  rewardsEnabled: true,
  cashbackPercentage: "",
  streakCaps: "",
  platformPercentage: "",
  sellerPercentage: "",
  conversionRate: "",
  minimumBidCredit: "",
  maximumBidCredit: "",
  listingFee: "500",
}

/**
 * Creates the Zustand store for reward settings management with persistence.
 * The state will be stored in `localStorage` under the name "reward-settings-storage".
 * @function useRewardSettingsStore
 * @returns {RewardSettingsStore} The Zustand store hook.
 */
export const useRewardSettingsStore = create<RewardSettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      /**
       * Updates multiple settings at once.
       * @param {Partial<RewardSettingsState>} settings - The settings to update.
       */
      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),

      /**
       * Sets the rewards enabled state.
       * @param {boolean} enabled - Whether rewards should be enabled.
       */
      setRewardsEnabled: (enabled) => set({ rewardsEnabled: enabled }),

      /**
       * Resets all settings to default values.
       */
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "reward-settings-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
