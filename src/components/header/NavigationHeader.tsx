import DesktopNavigation from "../navigation/DesktopNavigation";
import MobileHeader from "./MobileHeader";

const NavigationHeader = () => {
  return (
    <>
      <MobileHeader />

      <div className="hidden md:block text-white">
        <DesktopNavigation />
      </div>
    </>
  );
};

export default NavigationHeader;
