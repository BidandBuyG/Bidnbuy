import { Link } from "react-router-dom";

type HeaderLinkProps = {
  label: string;
  href: string;
};

export default function HeaderLink({ label, href }: HeaderLinkProps) {
  return (
    <div className="flex items-center justify-between group border-b border-[#d0e5e7] pb-1">
      <span className="text-white text-base">{label}</span>
      <Link
        to={href}
        className="flex items-center text-white opacity-80 group-hover:opacity-100 transition"
      >
        <span className="ml-2 text-white opacity-80 group-hover:opacity-100 transition">
          ↗
        </span>
      </Link>
    </div>
  );
}
