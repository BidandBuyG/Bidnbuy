import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "#" },
  { label: "My Account", to: "#" },
  { label: "Buying", to: "#" },
  { label: "Become a Seller", to: "#" },
  { label: "Help & Contact", to: "#" },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#00545F] rounded-t-3xl mt-8 lg:mt-12 px-4 md:px-8 lg:px-6 py-6 md:py-8"
    >
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 text-sm text-gray-300 lg:flex-row lg:gap-8 lg:items-center">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-600 lg:border-[#00707B] text-center">
        <p className="text-xs text-gray-400">© 2024 BidnBuy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
