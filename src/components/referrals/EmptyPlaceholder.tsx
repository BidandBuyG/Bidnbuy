import { Plus, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import EmptyStateImage from "../../features/assets/emptyImg.png";
import TableIcon from "../../features/assets/table-tab-icon.svg";
import CardIcon from "../../features/assets/card-tab-icon.svg";

interface ReferralEmptyStateProps {
  setOpenAddUser: (open: boolean) => void;
  view: "table" | "card";
  setView: (view: "table" | "card") => void;
}

export const ReferralEmptyState: React.FC<ReferralEmptyStateProps> = ({
  setOpenAddUser,
  view,
  setView,
}) => {
  return (
    <div>
      <div className="mx-auto mb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white font-header">
              My Referrals
            </h1>
            <div>
              <Tabs
                value={view}
                onValueChange={(val) => setView(val as "table" | "card")}
              >
                <TabsList className="mt-3 bg-transparent gap-3">
                  <TabsTrigger value="table">
                    <div className="flex items-center gap-2">
                      <img
                        src={TableIcon}
                        alt="Table View"
                        className="h4 w-4"
                      />{" "}
                      Table View
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <div className="flex items-center gap-2">
                      <img src={CardIcon} alt="Card View" className="h4 w-4" />{" "}
                      Card View
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="ml-auto flex items-center gap-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-white" />
                <Input
                  placeholder="Search"
                  className="placeholder:text-white placeholder-opacity-100 max-w-lg w-lg pl-9 h-10 focus-visible:border-none border-[#002129] bg-[#002129] text-white"
                />
              </div>

              <Button
                className="bg-[#007F93] hover:bg-[#1892a5] text-white flex items-center gap-2"
                onClick={() => setOpenAddUser(true)}
                disabled
              >
                <Plus />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] flex flex-col items-center justify-center gap-6 mt-[3em]">
        <div>
          <img
            src={EmptyStateImage}
            alt="No Referrals"
            className="w-[200px] h-[200px]"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-medium text-white">
            You haven’t referred anyone yet. Share
            <br />
            your referral link and watch your rewards grow
            <br />
            rewards grow
          </h2>

          <Button
            type="submit"
            className="w-1/2 bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-7"
          >
            Share Referral Link
          </Button>
        </div>
      </div>
    </div>
  );
};
