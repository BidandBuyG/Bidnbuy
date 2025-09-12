/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ReferralColumn } from "../../../components/columns/ReferralColumn";
import { ReferralTable } from "../../../components/tables/ReferralTable";
import User1 from "../../assets/addUser.png";
import User2 from "../../assets/photo.png";

const dummyReferrals = [
  {
    id: "4534",
    profileImg: User1,
    firstName: "Angela",
    lastName: "Balogun",
    gender: "Female",
    phone: "+23456787545",
    email: "Sarahbalogun@gmail.com",
    category: "Vendor",
  },
  {
    id: "4534",
    profileImg: User2,
    firstName: "David",
    lastName: "Balogun",
    gender: "Male",
    phone: "+23456787545",
    email: "Davidbalogun@gmail.com",
    category: "Vendor",
  },
];

export default function Referrals() {
  const [isLoading, setLoading] = useState(false);
  return (
    <div
      style={{ padding: 24 }}
      className="bg-[#00191F] text-white min-h-screen "
    >
      <h1>Referrals (Engine)</h1>
      <p>Server pagination + loading/empty/error states will be added here.</p>

      <div className="mt-[5em]">
        <ReferralTable
          data={dummyReferrals}
          referralColumns={ReferralColumn}
          isLoading={isLoading}
          onRetry={() => setLoading(false)}
          isError={false}
          errorMessage="Unable to fetch referrals"
        />
      </div>
    </div>
  );
}
