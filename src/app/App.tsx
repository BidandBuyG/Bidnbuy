import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Referrals from "../features/marketing/pages/Referrals";
import WalletOverview from "../features/wallet/pages/Overview";
import WalletTransactions from "../features/wallet/pages/Transactions";
import AdminConfig from "../features/admin/pages/Config";
import Signup from "../features/auth/pages/Signup";
import MarketerSignup from "../features/marketing/pages/Signup";
import SignUpRoleSelect from "../features/components/forms/SignupRoleSelect";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import ChangePassword from "../features/auth/pages/ChangePassword";
import OverviewPage from "@/features/marketing/pages/OverviewPage";
import AddUser from "@/features/marketing/pages/AddUser";
import AuctionPage from "@/features/marketing/pages/AuctionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Angela’s work */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/marketing/signup" element={<MarketerSignup />} />
        <Route path="/signup-select" element={<SignUpRoleSelect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/marketing/add-user" element={<AddUser />} />
        <Route path="/marketing/auctions" element={<AuctionPage />} />{" "}
        <Route path="/marketing/referrals" element={<Referrals />} />
        {/* Joshua’s work */}
        <Route path="/wallet/overview" element={<WalletOverview />} />
        <Route path="/wallet/transactions" element={<WalletTransactions />} />
        <Route path="/admin/config" element={<AdminConfig />} />
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
