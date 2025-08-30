import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

// App Layout
import Layout from "@/components/layout/Layout";
import LayoutWithHeaderFooter from "@/components/layout-with-header-footer/LayoutWithHeaderFooter";
import LayoutWithNavigationHeader from "./components/layout-with-navigation-header/LayoutWithNavigationHeader";

import Home from "@/pages/home/Home";
import CustomerSignUp from "@/pages/customer-sign-up/CustomerSignUp";
import AccountTypeSelection from "@/pages/account-type-selection/AccountTypeSelection";
import CustomerLogin from "@/pages/customer-login/CustomerLogin";
import VendorLogin from "@/pages/vendor-login/VendorLogin";
import VendorSignup from "@/pages/vendor-sign-up/VendorSignUp";
import CompleteProfile from "./pages/complete-profile/CompleteProfile";

import ProductHome from "@/pages/product-home/ProductHome";
import Marketplace from "./pages/marketplace/Marketplace";
import BidsAndAuction from "./pages/bids-and-auction/BidsAndAuction";

import CustomerAccountVerification from "@/pages/customer-account-verification/CustomerAccountVerification";
import VendorAccountVerification from "@/pages/vendor-account-verification/VendorAccountVerification";
import VendorUploadProductForm from "@/pages/vendor-upload-product/VendorUploadProduct";
import AuctionProductDetail from "@/pages/auction-product-detail/AuctionProductDetail";


// Escrow
import EscrowReportProblemForm from "@/pages/escrow-report-problem-form/EscrowReportProblemForm";
import EscrowPaymentReleased from "@/pages/escrow-payment-released/EscrowPaymentReleased";
import EscrowItemReceived from "@/pages/escrow-items-received/EscrowItemsReceived";
import EscrowStatus from "@/pages/escrow-status/EscrowStatus";


// Bid Credit and Ledger
import BidCreditTopUp from "./pages/bidcredit-top-up/BidCreditTopUp";
import AddBidCredit from "./pages/add-bid-credit/AddBidCredit";
import BidCreditTopUpSuccess from "./pages/bid-credit-top-up-success/BidCreditTopUpSuccess";
import WalletLedger from "./pages/wallet-ledger/WalletLedger";
import BidCreditLedgerPage from "./pages/bid-credit-ledger/BidCreditLedger";
import NewCompleteProfile from "./features/complete-profile/NewCompleteProfile";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Auth */}

        <Route path="account-type" element={<AccountTypeSelection />} />

        <Route path="signup/customer" element={<CustomerSignUp />} />
        <Route path="login/customer" element={<CustomerLogin />} />

        <Route path="signup/vendor" element={<VendorSignup />} />
        <Route path="login/vendor" element={<VendorLogin />} />

        <Route
          path="complete-profile"
          element={<CompleteProfile />}
        />

        <Route
          path="new-complete-profile"
          element={<NewCompleteProfile />}
        />

        <Route
          path="customer-account-verify"
          element={<CustomerAccountVerification />}
        />
        <Route
          path="vendor-account-verify"
          element={<VendorAccountVerification />}
        />
      </Route>

      <Route element={<LayoutWithNavigationHeader />}>
        {/* Vendor Upload */}

        <Route
          path="vendor-upload-product"
          element={<VendorUploadProductForm />}
        />

        {/* Escrow */}

        <Route path="escrow" element={<Navigate to="/escrow/1" replace />} />
        <Route path="escrow/:orderId" element={<EscrowStatus />} />
        <Route
          path="escrow/:orderId/received"
          element={<EscrowItemReceived />}
        />
        <Route
          path="escrow/:orderId/payment-released"
          element={<EscrowPaymentReleased />}
        />
        <Route
          path="escrow/:orderId/report-problem"
          element={<EscrowReportProblemForm />}
        />

        {/* Bid Credit and Ledger */}

        <Route path="bid-credit-top-up" element={<BidCreditTopUp />} />
        <Route path="add-bid-credit" element={<AddBidCredit />} />
        <Route path="bid-credit-top-up-success" element={<BidCreditTopUpSuccess />} />

        <Route path="wallet-ledger" element={<WalletLedger />} />
        <Route path="bid-credit-ledger" element={<BidCreditLedgerPage />} />
      </Route>

      <Route element={<LayoutWithHeaderFooter />}>
        {/* Products */}
        <Route path="product-home" element={<ProductHome />} />

        <Route path="marketplace" element={<Marketplace />} />

        <Route path="bids-and-auction" element={<BidsAndAuction />} />

        <Route
          path="auction-product-detail"
          element={<AuctionProductDetail />}
        />
      </Route>
    </Routes>
  );
};

export default App;
