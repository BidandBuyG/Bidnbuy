/**
 * @file components/wallet-ledger/rewards-section.tsx
 * @description Placeholder component for displaying user rewards.
 */

/**
 * RewardsSection component displays a placeholder for user rewards.
 * This section can be expanded to show various types of rewards.
 * @returns {JSX.Element} The rendered rewards section.
 */

const RewardsSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">Rewards</h2>
      <div
        className="p-4 rounded-lg border border-[#00707B] text-gray-300 text-center"
        style={{ backgroundColor: "#013139" }}
      >
        <p>No new rewards at the moment. Check back later!</p>
      </div>
    </div>
  )
}


export default RewardsSection;
