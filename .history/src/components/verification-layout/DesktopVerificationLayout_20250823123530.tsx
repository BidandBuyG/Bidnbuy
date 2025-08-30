import BidnBuyLogo from "@/assets/bidnbuy-logo.png";
import { VerificationForm } from "../forms/VerificationForm";

type DesktopVerificationLayoutProps = {
  onSubmit: (code: string) => Promise<void>;
  isSubmitting: boolean;
  error?: string;
};

export function DesktopVerificationLayout({
  onSubmit,
  isSubmitting,
}: DesktopVerificationLayoutProps) {
  return (
    <div
      className="min-h-screen hidden md:flex flex-col bg-[#01151C]"
    >
      <div className="absolute top-8 left-8">
        <img
          src={BidnBuyLogo}
          alt="Bid and Buy Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8">
          <h1
            className="text-[40px] font-medium text-white mb-6 text-center whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Account Verification Requirements
          </h1>

          <p
            className="text-gray-300 mb-12 text-[20px] text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Verify your email with the code sent to you.
          </p>

          <VerificationForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
}
