/**
 * Props for the SuccessDetails component.
 * @typedef {Object} SuccessDetailsProps
 * @property {number} newBalance - The user's new bid credit balance after top-up.
 * @property {string} transactionId - The transaction ID for the successful top-up.
 * @property {number} topUpAmount - The amount that was topped up.
 */

export type SuccessDetailsProps = {
  newBalance: number
  transactionId: string
  topUpAmount: number
}


/**
 * Props for the SuccessActions component.
 * @typedef {Object} SuccessActionsProps
 * @property {() => void} onViewHistory - Callback for "View Transaction History" button.
 * @property {() => void} onBackToDashboard - Callback for "Back to Dashboard" button.
 */


export type SuccessActionsProps = {
  onViewHistory: () => void
  onBackToDashboard: () => void
}