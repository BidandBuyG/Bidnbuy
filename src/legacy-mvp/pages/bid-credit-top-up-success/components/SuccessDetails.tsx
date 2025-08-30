/**
 * @file components/bid-credit-success/success-details.tsx
 * @description Presentational component for displaying top-up success details.
 * Shows the new balance and transaction ID.
 */

import type { SuccessDetailsProps } from "../types/bid-credit-top-up-success";


/**
 * SuccessDetails component displays the outcome of a successful bid credit top-up.
 * @param {SuccessDetailsProps} props - The component props.
 * @returns {JSX.Element} The rendered success details.
 */

const SuccessDetails = ({ newBalance, transactionId, topUpAmount }: SuccessDetailsProps) => {
  return (
    <>
      <h2 className="text-white text-2xl font-bold mb-4">Top-up Successful</h2>
      <p className="text-gray-300 text-lg mb-8">
        You have successfully added N{topUpAmount.toLocaleString()} to your Bid Credit balance
      </p>

      {/* New Bid Credit Balance Box */}
      <div
        className="p-4 rounded-lg border border-[#00707B] mb-8 w-full md:max-w-lg"
        style={{ backgroundColor: "#013139" }}
      >
        <p className="text-gray-300 text-lg mb-2">New Bid Credit Balance</p>
        <p className="text-white text-3xl font-bold">{newBalance.toLocaleString()}</p>
      </div>

      {/* Transaction ID */}
      <div className="flex justify-between items-center mb-12 w-full md:max-w-lg">
        <span className="text-gray-300 text-lg">Transaction ID</span>
        <span className="text-white text-lg font-semibold">{transactionId}</span>
      </div>
    </>
  )
}

export default SuccessDetails;
