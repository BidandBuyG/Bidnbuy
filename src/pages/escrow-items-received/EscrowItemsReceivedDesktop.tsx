import EscrowProductCard from "@/components/escrow-product-card/EscrowProductCard";
import type { EscrowItemsReceivedProps } from "./types/escrow";
import EscrowActionButton from "../../components/escrow-action-buttons/EscrowActionButtons";

const EscrowItemReceivedDesktop = ({
  escrowData,
  orderId,
  steps,
  isConfirming,
  isReporting,
  onConfirmSatisfaction,
  onReportProblem,
}: EscrowItemsReceivedProps) => {
  return (
    <div className="hidden lg:block">
      <div className="flex gap-8">
        <div className="w-[723px]">
          <EscrowProductCard image={escrowData?.image} escrowHeight="360px" />
          

          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`rounded-full mb-2 ${
                    step.active
                      ? "bg-blue-600"
                      : step.completed
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                  style={{ width: "12px", height: "12px" }}
                ></div>

                <div className="w-4 h-4 flex items-center justify-center mb-2 relative">
                  <img
                    src={step.icon || "/placeholder.svg"}
                    alt={step.title}
                    width={16}
                    height={16}
                    className={`object-contain ${
                      step.active ? "opacity-100" : "opacity-60"
                    }`}
                  />

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

                <span
                  className={`text-sm text-center ${
                    step.active ? "text-white font-medium" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Hermes Birkin Bag</h2>
            <p className="text-xl font-semibold text-green-400 mb-4">
              ₦200,000
            </p>

            <div className="mb-4">
              <span className="text-sm block mb-4">Order #{orderId}</span>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm w-28">Order Status:</span>
                  <div
                    className="px-3 py-1 text-white text-sm font-medium ml-2"
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

                <div className="flex items-center">
                  <span className="text-sm w-28">Escrow Status:</span>
                  <div
                    className="px-3 py-1 text-white text-sm font-medium bg-blue-600 ml-2"
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
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
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
};

export default EscrowItemReceivedDesktop;
