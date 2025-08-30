import { Outlet } from "react-router-dom";

import { Toaster } from "sonner";

import Footer from "@/components/footer/Footer";
import NavigationHeader from "../header/NavigationHeader";




const LayoutWithNavigationHeader = () => (
  <>
    <NavigationHeader />

    <Outlet />
    <Toaster />

    <Footer />
  </>
);

export default LayoutWithNavigationHeader;
