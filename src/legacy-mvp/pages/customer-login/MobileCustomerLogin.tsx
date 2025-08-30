import CustomerSignUpMobileImage from "@/assets/customer-sign-up-mobile-img.jpg";
import BidnBuyLogo from "@/assets/bidnbuy-logo.png";
import SignInFormFields from "@/components/forms/SignInFormField";
import type { SignInProps } from "@/types/auth";

const MobileCustomerLogin = ({ form, onSubmit, isLoading }: SignInProps) => {
  return (
    <div className="lg:hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative w-full overflow-hidden aspect-[1408/768] max-h-[768px]">
          <img
            src={CustomerSignUpMobileImage}
            alt="Shopping background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 text-white">
          <div className="mb-0">
            <img
              src={BidnBuyLogo}
              alt="Bid and Buy Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          <div className="space-y-3 pb-4 text-center">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-200 text-base opacity-90">
              Login to join the marketplace and start bidding smart.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#01151C] px-6 pb-8 pt-8">
        <div className="max-w-sm mx-auto">
          <SignInFormFields
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default MobileCustomerLogin;
