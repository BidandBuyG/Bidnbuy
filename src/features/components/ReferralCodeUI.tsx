/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReferralImg from "../assets/referral.png";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ReferralCodeUI({ result }: { result?: any }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Illustration */}
      <img
        src={ReferralImg}
        alt="Welcome illustration"
        className="w-[240px] h-[220px] mb-8"
      />

      {/* Welcome Message */}
      <p className="text-white text-center text-[20px] mb-8 font-medium">
        Welcome onboard! You’re ready to <br />
        earn. Here’s your referral code
      </p>

      {/* Referral Code Box */}
      <div className="flex items-center justify-center mb-10">
        <div className="border-t-2 border-l-2 border-[#fff] border-opacity-30 w-8 h-8 rounded-tl-lg"></div>
        <div className="bg-transparent px-6 py-3 flex items-center">
          <span className="text-[56px] font-bold text-[#FAAA1E] leading-none tracking-wide">
            {result?.referralCode?.slice(0, 3) || "BAB"}
          </span>
          <span className="text-[56px] font-bold text-white leading-none tracking-wide">
            {result?.referralCode?.slice(3) || "345BH"}
          </span>
        </div>
        <div className="border-t-2 border-r-2 border-[#fff] border-opacity-30 w-8 h-8 rounded-tr-lg"></div>
      </div>
      <div className="flex items-center justify-center -mt-16 mb-14">
        <div className="border-b-2 border-l-2 border-[#fff] border-opacity-30 w-8 h-8 rounded-bl-lg"></div>
        <div className="w-[312px]" />
        <div className="border-b-2 border-r-2 border-[#fff] border-opacity-30 w-8 h-8 rounded-br-lg"></div>
      </div>

      {/* Button */}
      {/* <Button
        type="button"
        onClick={() => {
          // let users copy link to clipboard
          if (result?.referralLink) {
            navigator.clipboard.writeText(result.referralLink);
          }
        }}
        className="flex-1 bg-[#EE9F05] hover:bg-[#b89e6a] h-12"
      >
        Open Referral Link
      </Button> */}
      <Button
        type="button"
        onClick={() => {
          // navigate to dashboard/referrals
          navigate("/marketing/referrals");
        }}
        className="flex-1 bg-[#EE9F05] hover:bg-[#b89e6a] h-[60px] py-4 w-full"
      >
        Proceed to Dashboard
      </Button>
    </div>
  );
}
