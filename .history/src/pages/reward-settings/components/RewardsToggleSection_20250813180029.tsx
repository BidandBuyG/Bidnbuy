const RewardsToggleSection = ({ rewardsEnabled, handleRewardsToggle }: { rewardsEnabled: boolean, handleRewardsToggle: (enabled: boolean) => void }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-white text-lg font-semibold">
          <span className="md:hidden">Rewards: ON/OFF</span>
          <span className="hidden md:inline">Enable rewards</span>
        </h2>
      </div>
      <ToggleSwitch enabled={rewardsEnabled} onToggle={handleRewardsToggle} />
    </div>
  )
}

export default RewardsToggleSection ;
