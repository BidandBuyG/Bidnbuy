import type { EscrowOrder, EscrowState, Step } from "@/types/escrow"

import EscrowProductCard from "../../components/escrow-product-card/EscrowProductCard"

type EscrowStatusDesktopProps = {
  escrowState: EscrowState
  escrowData: EscrowOrder
  steps: Step[]
  showActionButtons: boolean
  isConfirming: boolean
  isReporting: boolean
  onConfirmSatisfaction: () => void
  onReportProblem: () => void
  getLightIndicatorColor: (index: number) => string
  getStatusColor: () => string
  getEscrowStatusButton: () => { text: string; color: string }
}

export function EscrowStatusDesktop({
  escrowState,
  escrowData,
  steps,
  showActionButtons,
  isConfirming,
  isReporting,
  onConfirmSatisfaction,
  onReportProblem,
  getLightIndicatorColor,
  getStatusColor,
  getEscrowStatusButton
}: EscrowStatusDesktopProps) {
  const escrowButton = getEscrowStatusButton()

  return (
    <>

      <div className="hidden lg:flex lg:gap-8">
        <div className="lg:w-[723px]">

          <EscrowProductCard image={escrowData?.image} escrowHeight="360px" />


          
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
               
                <div
                  className="rounded-full mb-2"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: getLightIndicatorColor(index),
                  }}
                ></div>

                <div className="w-4 h-4 flex items-center justify-center mb-2 relative">
                  <img
                    src={step.icon || "/placeholder.svg"}
                    alt={step.title}
                    width={16}
                    height={16}
                    className={`object-contain ${step.active ? "opacity-100" : "opacity-60"}`}
                  />
                  {/* Horizontal connecting line */}
                  {index < steps.length - 1 && (
                    <div
                      className="absolute bg-gray-600"
                      style={{
                        top: "8px",
                        left: "16px",
                        width: "120px",
                        height: "1px",
                      }}
                    ></div>
                  )}
                </div>

                
                <span className={`text-sm text-center ${step.active ? "text-white font-medium" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

         
          {!showActionButtons && (
            <p className="text-sm text-gray-400 leading-relaxed">
              Your funds will be held in escrow until you confirm the receipt of the item. Once confirmed, funds will
              be released to the vendor.
            </p>
          )}
        </div>

     
        <div className="lg:flex-1">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{escrowData?.productName}</h2>
            <p className="text-xl font-semibold text-green-400 mb-4">{escrowData?.amount}</p>

            <div className="mb-4">
              <span className="text-sm block mb-4">Order {escrowData?.id}</span>

              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm w-28">Order Status:</span>
                  <div
                    className="px-3 py-1 text-white text-sm font-medium ml-2"
                    style={{
                      backgroundColor: getStatusColor(),
                      width: "100px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    {escrowState.orderStatus}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-sm w-28">Escrow Status:</span>
                  <div
                    className="px-4 py-1 text-white text-sm font-medium ml-2"
                    style={{
                      backgroundColor: escrowButton.color,
                      minWidth: "120px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    {escrowButton.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {showActionButtons && (
        <div className="hidden lg:block mt-8 space-y-4">
          <button
            onClick={onConfirmSatisfaction}
            disabled={isConfirming}
            className="w-full py-4 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "#00707B" }}
          >
            {isConfirming ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "I am satisfied with my order"
            )}
          </button>

          <button
            onClick={onReportProblem}
            disabled={isConfirming || isReporting}
            className="w-full py-4 rounded-lg text-white font-medium border border-gray-600 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "transparent" }}
          >
            {isReporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Report a problem"
            )}
          </button>
        </div>
      )}
    </>
  )
}