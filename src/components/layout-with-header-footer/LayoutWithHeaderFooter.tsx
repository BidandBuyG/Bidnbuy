import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

import { Toaster } from "sonner";

const LayoutWithHeaderFooter = () => (
  <>
    <Header />

    <Outlet />
    <Toaster />

    <Footer />
  </>
);

export default LayoutWithHeaderFooter;
