import PaymentFeature from "@/features/payment-feature/PaymentFeature";

const PaymentOption = () => {
  return (
    <div>
      <PaymentFeature name="Payment Options" showAmountInput={false} />
    </div>
  );
};

export default PaymentOption;
