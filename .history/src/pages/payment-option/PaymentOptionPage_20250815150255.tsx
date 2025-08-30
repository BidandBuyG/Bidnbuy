import PaymentFeature from "@/features/payment-feature/PaymentFeature";

const PaymentOptionPage = () => {
  return (
    <div className="min-h-screen bg-[#01151C]">
      <main className="px-4 py-6 md:px-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-none md:mx-0">
          <h1 className="text-white text-2xl font-bold mb-8">Payment Options</h1>
          <PaymentFeature showAmountInput={false} />
        </div>
      </main>
    </div>
  );
};

export default PaymentOptionPage;
