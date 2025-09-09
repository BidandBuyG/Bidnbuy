import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Referrals from "../features/marketing/pages/Referrals";
import WalletOverview from "../features/wallet/pages/Overview";
import WalletTransactions from "../features/wallet/pages/Transactions";
import AdminConfig from "../features/admin/pages/Config";
import Signup from "../features/auth/pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Angela’s work */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
