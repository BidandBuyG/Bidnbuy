import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePaymentFeature } from "./hooks/usePaymentFeature";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import AmountInput from "./components/AmountInput";

type PaymentFeatureProps = {
  name: string;
  showAmountInput?: boolean;
};

const PaymentFeature = ({
  showAmountInput = true,
  name,
}: PaymentFeatureProps) => {
  const {
    selectedPayment,
    setSelectedPayment,
    topUpAmount,
    setTopUpAmount,
    walletMutation,
  } = usePaymentFeature();

  const handleCompleteTransaction = () => {
    if (selectedPayment === "paystack") {
      toast.info(
        "Paystack integration is currently in progress. Please try again later."
      );
    } else if (selectedPayment === "wallet") {
      const amount = Number.parseFloat(topUpAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid positive amount.");
        return;
      }
      walletMutation.mutate(amount);
    }
  };

  return (
    <div className="min-h-screen bg-[#01151C]">
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-none md:mx-0">
          <PageHeader className='w-full' title={name} backUrl="/" />
          {/* Mobile Back Button and Title */}
          <div className="md:hidden flex items-center gap-3 mb-6 w-full">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-white text-xl font-semibold">{name}</h1>
          </div>
          {/* Desktop Title */}
          <h1 className="hidden md:block text-white text-4xl font-bold mb-8">
            {name}
          </h1>

          <PaymentMethodSelector
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
          />
          {showAmountInput && (
            <AmountInput value={topUpAmount} onChange={setTopUpAmount} />
          )}
          <div className="flex justify-center md:justify-start">
            <Button
              onClick={handleCompleteTransaction}
              disabled={walletMutation.isPending}
              className="w-full max-w-sm text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity py-6 flex items-center justify-center bg-[#00707B]"
              size="lg"
            >
              {walletMutation.isPending
                ? "Processing..."
                : "Complete Transaction"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFeature;
