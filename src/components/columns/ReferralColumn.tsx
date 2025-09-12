/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User, MoreVertical } from "lucide-react";
import ReferralInfoSheet from "../referrals/ReferralInfoSheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface Referral {
  id: string;
  profileImg: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  category: string;
}

export const ReferralColumn: ColumnDef<Referral, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="w-[50px] capitalize overflow-hidden ">
          <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
            #{id ? id : "---"}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "profileImg",
    header: "Photo",
    cell: ({ row }) => {
      const { profileImg } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {profileImg ? (
            <img
              src={profileImg}
              alt="profile"
              className="h-[45px] w-[44px] rounded-md object-cover"
            />
          ) : (
            <User className="h-8 w-8" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => {
      const { firstName } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {firstName ? firstName : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => {
      const { lastName } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {lastName ? lastName : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const { gender } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {gender ? gender : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const { phone } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          {phone ? phone : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { email } = row.original;
      return (
        <div className="capitalize truncate max-w-[200px]">
          {email ? email : "---"}
        </div>
      );
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const { category } = row.original;
      return (
        <div className="capitalize truncate max-w-[180px]">
          <div className="bg-[#EE9F0524] text-white rounded-md text-sm text-center h-[39px] w-[75px] flex items-center justify-center px-2">
            {category ? category : "---"}
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CellAction referral={row.original} />;
    },
  },
];

const CellAction = ({ referral }: { referral: Referral }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <MoreVertical className="h-4 w-4 text-white" />
        </PopoverTrigger>
        <PopoverContent className="w-40 bg-[#007F9314] p-3">
          <ul className="w-full">
            <li className="hover:bg-[#27a6b9] rounded-md p-2 w-full cursor-pointer bg-[#007F93] text-white flex flex-col items-center">
              <ReferralInfoSheet referral={referral} />
            </li>
            <li></li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
