import type { RewardSettingSectionProps } from "../types/reward-settings";


function StreakCapsSection({ register, errors }: RewardSettingSectionProps) {
  return (
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
  )
}