/**
 * @file components/bid-credit-success/success-actions.tsx
 * @description Presentational component for action buttons on the top-up success page.
*/

import { Button } from "@/components/ui/button"
import type { SuccessActionsProps } from "../types/bid-credit-top-up-success";

/**
 * SuccessActions component provides navigation buttons after a successful top-up.
 * @param {SuccessActionsProps} props - The component props.
 * @returns {JSX.Element} The rendered action buttons.
 */
const SuccessActions = ({ onViewHistory, onBackToDashboard }: SuccessActionsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full md:max-w-sm mx-auto">
      <Button
        className="text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center"
        size="lg"
        style={{ backgroundColor: "#00707B" }}
        onClick={onViewHistory}
      >
        View Transaction History
      </Button>
      <Button
        className="text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center"
        size="lg"
        style={{ backgroundColor: "#00707B" }}
        onClick={onBackToDashboard}
      >
        Back to Dashboard
      </Button>
    </div>
  )

}


export default SuccessActions;