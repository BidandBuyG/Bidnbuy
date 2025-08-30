import { Link } from "react-router-dom"

import { useForm } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { useRewardSettingsStore } from "@/store/rewards-settings-store"
import { rewardSettingsSchema, type RewardSettingsFormData } from "@/lib/validations/reward-settings-schema"

import { Button } from "@/components/ui/button"

import ToggleSwitch from "./components/ToggleSwitch"
import SettingsSection from "./components/SettingsSection"

/**
 * Simulates an API call to save reward settings.
 * @param {RewardSettingsFormData} data - The settings data to save.
 * @returns {Promise<{ success: boolean; message: string }>} A promise resolving with save result.
 */

const saveRewardSettings = async (data: RewardSettingsFormData) => {
    console.log("New data:", data)
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Settings saved successfully!" })
    }, 1000) // Simulate network delay
  })
}

/**
 * RewardSettingsPage component displays the reward configuration interface using React Hook Form with Zod validation.
 * @returns {JSX.Element} The rendered reward settings page.
 */
export default function RewardSettingsPage() {
 
  const storeState = useRewardSettingsStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<RewardSettingsFormData>({
    resolver: zodResolver(rewardSettingsSchema),
    defaultValues: {
      rewardsEnabled: storeState.rewardsEnabled,
      cashbackPercentage: storeState.cashbackPercentage,
      streakCaps: storeState.streakCaps,
      platformPercentage: storeState.platformPercentage,
      sellerPercentage: storeState.sellerPercentage,
      conversionRate: storeState.conversionRate,
      minimumBidCredit: storeState.minimumBidCredit,
      maximumBidCredit: storeState.maximumBidCredit,
      listingFee: storeState.listingFee,
    },
  })


  const rewardsEnabled = watch("rewardsEnabled")


  const saveSettingsMutation = useMutation({
    mutationFn: saveRewardSettings,
    onSuccess: (data, variables) => {
      
      storeState.updateSettings(variables)
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(`Failed to save settings: ${error.message}`)
    },
  })

  /**
   * Handles form submission.
   * @param {RewardSettingsFormData} data - The form data.
   */
  const onSubmit = (data: RewardSettingsFormData) => {
    saveSettingsMutation.mutate(data)
  }

  /**
   * Handles toggle switch change for rewards enabled.
   * @param {boolean} enabled - The new enabled state.
   */
  const handleRewardsToggle = (enabled: boolean) => {
    setValue("rewardsEnabled", enabled, { shouldDirty: true })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#01151C" }}>
 

      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-2xl">
          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <Link to="/wallet-ledger" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">Reward Settings</h1>
          </div>

          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">Reward Settings</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <RewardsToggleSection rewar />

            {/* Cashback Percentage */}
            <div className="mb-6">
              <label className="block text-gray-300 text-base mb-3">Cashback %</label>
              <input
                {...register("cashbackPercentage")}
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Enter percentage"
                className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
              />
              {errors.cashbackPercentage && (
                <p className="text-red-400 text-sm mt-1">{errors.cashbackPercentage.message}</p>
              )}
            </div>

            {/* Streak Caps */}
            <div className="mb-6">
              <label className="block text-gray-300 text-base mb-3">Streak Caps</label>
              <input
                {...register("streakCaps")}
                type="text"
                placeholder="Enter streak caps"
                className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent"
              />
              {errors.streakCaps && <p className="text-red-400 text-sm mt-1">{errors.streakCaps.message}</p>}
            </div>

            {/* Platform / Seller Split Section */}
            <SettingsSection title="Platform / Seller Split">
              <div className="mb-6">
                <label className="block text-gray-300 text-base mb-3">
                  <span className="md:hidden">Platform (%)</span>
                  <span className="hidden md:inline">Platform Split%</span>
                </label>
                <input
                  {...register("platformPercentage")}
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="Enter platform percentage"
                  className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
                />
                {errors.platformPercentage && (
                  <p className="text-red-400 text-sm mt-1">{errors.platformPercentage.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-base mb-3">
                  <span className="md:hidden">Seller (%)</span>
                  <span className="hidden md:inline">Seller Split%</span>
                </label>
                <input
                  {...register("sellerPercentage")}
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="Enter seller percentage"
                  className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
                />
                {errors.sellerPercentage && (
                  <p className="text-red-400 text-sm mt-1">{errors.sellerPercentage.message}</p>
                )}
              </div>
            </SettingsSection>

            {/* BidCredit Settings Section */}
            <SettingsSection title="BidCredit Settings">
              <div className="mb-6">
                <label className="block text-gray-300 text-base mb-3">Conversion Rate</label>
                <input
                  {...register("conversionRate")}
                  type="text"
                  placeholder="Enter conversion rate"
                  className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent"
                />
                {errors.conversionRate && <p className="text-red-400 text-sm mt-1">{errors.conversionRate.message}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-base mb-3">Minimum BidCredit</label>
                <input
                  {...register("minimumBidCredit")}
                  type="number"
                  min="0"
                  placeholder="Enter minimum amount"
                  className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
                />
                {errors.minimumBidCredit && (
                  <p className="text-red-400 text-sm mt-1">{errors.minimumBidCredit.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-base mb-3">Maximum BidCredit</label>
                <input
                  {...register("maximumBidCredit")}
                  type="number"
                  min="0"
                  placeholder="Enter maximum amount"
                  className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
                />
                {errors.maximumBidCredit && (
                  <p className="text-red-400 text-sm mt-1">{errors.maximumBidCredit.message}</p>
                )}
              </div>
            </SettingsSection>

            {/* Listing Fee Summary Section */}
            <SettingsSection
              title={typeof window !== "undefined" && window.innerWidth < 768 ? "Listing Fee Summary" : "Summary"}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-base">
                    <span className="md:hidden">ListingFee</span>
                    <span className="hidden md:inline">Listing Fee</span>
                  </span>
                  <span className="text-white text-base font-semibold">
                    N{watch("listingFee") || storeState.listingFee}
                  </span>
                </div>
                <div className="text-gray-300 text-sm">
                  <span className="md:hidden">Reserve</span> N250 locked | 30% to seller on default
                </div>
              </div>
            </SettingsSection>

            {/* Save Changes Button - Mobile Only */}
            <div className="md:hidden">
              <Button
                type="submit"
                disabled={saveSettingsMutation.isPending || !isDirty}
                className="w-full text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6"
                style={{ backgroundColor: "#00707B" }}
              >
                {saveSettingsMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
