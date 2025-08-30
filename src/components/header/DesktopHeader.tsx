import MainNav from "@/components/navigation/MainNav";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";

const DesktopHeader = () => {
  return (
    <header className="hidden md:block text-white">
      <DesktopNavigation />
      <MainNav />
    </header>
  )
}

export default DesktopHeader;
