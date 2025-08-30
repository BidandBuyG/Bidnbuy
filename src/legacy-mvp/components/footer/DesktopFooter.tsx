import { Link } from "react-router-dom";

export function DesktopFooter() {
  return (
    <footer className="bg-[#00545F] rounded-t-3xl mt-12 px-6 py-8">
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <Link to="#" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            My Account
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Buying
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Become a Seller
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Help & Contact
          </Link>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-[#00707B] text-center">
        <p className="text-xs text-gray-400">© 2024 BidnBuy. All rights reserved.</p>
      </div>
    </footer>
  )
}
