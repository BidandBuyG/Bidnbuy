import EscrowProductCard from "@/components/escrow-product-card/EscrowProductCard";
import EscrowActionButton from "../../components/escrow-action-buttons/EscrowActionButtons";
import type { EscrowItemsReceivedProps } from "./types/escrow";


export function EscrowItemReceivedMobile({
  escrowData,
  orderId,
  steps,
  isConfirming,
  isReporting,
  onConfirmSatisfaction,
  onReportProblem,
}: EscrowItemsReceivedProps) {
  return (
    <div className="lg:hidden">
      
      <EscrowProductCard image={escrowData?.image} escrowHeight="197px" />
      <div
        className="rounded-lg p-4 mb-6 border w-full"
        style={{
          backgroundColor: "#01212E",
          borderColor: "#00707B",
          height: "197px",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/hermes-bag.png"
            alt="Hermes Birkin Bag"
            width={183}
            height={183}
            className="object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Hermes Birkin Bag</h2>
        <p className="text-xl font-semibold text-green-400 mb-4">₦200,000</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Order #{orderId}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">Order Status:</span>
            <div
              className="px-3 py-1 text-white text-sm font-medium"
              style={{
                backgroundColor: "#00707B",
                width: "100px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
              }}
            >
              Received
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm">Escrow Status:</span>
          <div
            className="px-3 py-1 text-white text-sm font-medium bg-blue-600"
            style={{
              width: "100px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            In Escrow
          </div>
        </div>
      </div>

    
      <div className="space-y-0 mb-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-3"
            style={{ marginBottom: index < steps.length - 1 ? "31px" : "0" }}
          >
            <div
              className={`rounded-full flex items-center justify-center ${
                step.active
                  ? "bg-blue-600"
                  : step.completed
                  ? "bg-green-600"
                  : "bg-gray-600"
              }`}
              style={{ width: "12px", height: "12px" }}
            ></div>

            <div className="relative flex items-center">
              <div className="w-4 h-4 flex items-center justify-center">
                <img
                  src={step.icon || "/placeholder.svg"}
                  alt={step.title}
                  width={16}
                  height={16}
                  className={`object-contain ${
                    step.active ? "opacity-100" : "opacity-60"
                  }`}
                />
              </div>
              {index < steps.length - 1 && (
                <div
                  className="absolute bg-gray-600"
                  style={{
                    top: "16px",
                    left: "8px",
                    width: "1px",
                    height: "31px",
                    transform: "translateX(-0.5px)",
                  }}
                ></div>
              )}
            </div>

         
            <span
              className={`text-sm ${
                step.active ? "text-white font-medium" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      
      <div className="space-y-4 mt-8">
        <EscrowActionButton
          onClick={onConfirmSatisfaction}
          disabled={isConfirming}
          loading={isConfirming}
          style={{ backgroundColor: "#00707B" }}
        >
          I am satisfied with my order
        </EscrowActionButton>
        

        <EscrowActionButton
          onClick={onReportProblem}
          disabled={isReporting}
          loading={isReporting}
          className="border border-gray-600"
          style={{ backgroundColor: "transparent" }}
        >
          Report a problem
        </EscrowActionButton>
        
      </div>
    </div>
  );
}
