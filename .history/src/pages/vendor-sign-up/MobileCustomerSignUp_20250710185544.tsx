import type { SignupProps } from "@/types/auth";

import { SignupFormFields } from "@/components/sign-up-form-field/SignUpFormField"

import VendorSignUpMobile from "@/assets/vendor-sign-up-mobile.jpg";
import BidnBuyLogo from "@/assets/bidnbuy-logo.png"


const MobileVendorSignUp = ({ form, onSubmit, isLoading }: SignupProps) => {
  return (
    <div className="lg:hidden">

        <div className="relative w-full">
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative w-full overflow-hidden aspect-[1408/768] max-h-[768px]">
       
  
         <img src={VendorSignUpMobile} alt="Shopping background" className="w-full h-full object-cover" />
        
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 text-white">

        <div className="mb-0">
              <img src={BidnBuyLogo} alt="Bid and Buy Logo" width={100} height={100} className="mx-auto" />
            </div>
        <div className="space-y-3 pb-4 text-center">
              <h1 className="text-3xl font-bold text-white leading-tight">Create your personal account</h1>
              <p className="text-gray-200 text-base opacity-90">You are one step away from smarter shopping.</p>
            </div>
       
      </div>
    </div>

      

   
      <div className="bg-[#01151C] px-6 pb-8 pt-8">
        <div className="max-w-sm mx-auto">
          <SignupFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
export default MobileVendorSignUp