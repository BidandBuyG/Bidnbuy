import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#00545F] rounded-t-3xl mt-8 px-4 py-6">
      <div className="text-sm text-gray-300">
        <div className="flex flex-col gap-3">
          <Link to="#" className="hover:text-white transition-colors">
            My Account
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Help
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Become a Seller
        </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Help & Contact
          </Link>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-600 text-center">
          <p className="text-xs text-gray-400">© 2024 BidnBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
