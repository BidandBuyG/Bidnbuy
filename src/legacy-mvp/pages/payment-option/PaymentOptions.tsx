import PaymentFeature from "@/features/payment-feature/PaymentFeature";

const PaymentOptions = () => {
  return (
    <div>
      <PaymentFeature name="Payment Options" showAmountInput={false} />
    </div>
  );
};

export default PaymentOptions;
