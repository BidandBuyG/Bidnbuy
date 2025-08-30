import { useState } from "react";

import { toast } from "sonner";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";


type PromoteAuctionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auctionId: string;
  auctionTitle: string;
}

const PromoteAuctionModal = ({
  open,
  onOpenChange,
  auctionId,
  auctionTitle,
}: PromoteAuctionModalProps) => {
  const [linkCopied, setLinkCopied] = useState(false);
  const referralLink = `bidnbuyglobal.com/ref/${auctionId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setLinkCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: "🟢",
      color: "bg-green-500",
      action: () => {
        const message = `Check out this auction: ${auctionTitle} - ${referralLink}`;
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      },
    },
    {
      name: "TikTok",
      icon: "⚫",
      color: "bg-black",
      action: () => {
        // TikTok doesn't support direct sharing, so copy to clipboard
        navigator.clipboard.writeText(`${auctionTitle} - ${referralLink}`);
        toast.success("Content copied! Paste it in TikTok");
      },
    },
    {
      name: "Facebook",
      icon: "🔵",
      color: "bg-blue-600",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            referralLink
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Instagram",
      icon: "🟠",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      action: () => {
        // Instagram doesn't support direct sharing, so copy to clipboard
        navigator.clipboard.writeText(`${auctionTitle} - ${referralLink}`);
        toast.success("Content copied! Paste it in Instagram");
      },
    },
    {
      name: "X",
      icon: "⚫",
      color: "bg-black",
      action: () => {
        const tweet = `Check out this auction: ${auctionTitle} ${referralLink}`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
          "_blank"
        );
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#00222E] border-[#00707B]/50 text-white max-w-sm mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-medium">
            Promote Auction
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white hover:bg-slate-700 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="space-y-6">

          {/* Referral Link */}


          <Card className="space-y-2 p-4 bg-[#00222E] border-[#00707B]/50 max-w-md mx-auto">
            <div className="flex items-center justify-between gap-2">
              
              <span className="text-teal-200 text-sm truncate mr-3">{referralLink}</span>
              <Button
                onClick={handleCopyLink}
                size="sm"
                className={`px-3 py-2 text-xs ${
                  linkCopied
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-teal-600 hover:bg-teal-500"
                }`}
              >
                {linkCopied ? (
                  "Link copied"
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy link
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Quick Share */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-300">Quick Share</h3>
            <div className="flex justify-center gap-4">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={platform.action}
                  className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center text-white text-lg hover:scale-110 transition-transform`}
                  title={platform.name}
                >
                  {platform.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PromoteAuctionModal;
