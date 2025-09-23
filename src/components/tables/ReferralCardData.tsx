/* eslint-disable @typescript-eslint/no-explicit-any */
import { Phone, User } from "lucide-react";
import React from "react";
import MailIcon from "../../assets/email.svg";

type ReferralCardProps = {
  ref: any;
  button: React.ReactNode;
};

const ReferralCardData: React.FC<ReferralCardProps> = ({ ref, button }) => {
  return (
    <div className="bg-[#00191F] overflow-hidden border-none">
      <div className="relative h-[360px] w-full">
        <img
          src={ref.profileImg}
          alt={ref.name}
          className="object-cover h-full w-full rounded-md"
        />
        <span
          className="absolute top-4 left-4 text-[#E8FFFD] px-6 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: "rgba(125, 160, 111, 0.5)" }}
        >
          {ref.category}
        </span>
      </div>
      <div className="relative -mt-35 px-6 pb-10 pt-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-yellow-400 text-xl font-semibold">
          <User className="w-7 h-7 stroke-yellow-400" />
          {ref.firstName} {ref.lastName}
        </div>
        <div className="flex items-center gap-2 text-white">
          <img src={MailIcon} className="w-6 h-6" />
          <span className="truncate text-xs">{ref.email}</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Phone className="w-5 h-5" />
          <span className="text-xs">{ref.phone}</span>
        </div>
      </div>
      {button}
    </div>
  );
};

export default ReferralCardData;
