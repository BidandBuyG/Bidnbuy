type HeaderLinkProps = {
  label: string;
};

export default function HeaderLink({ label }: HeaderLinkProps) {
  return (
    <div className="flex items-center justify-between group border-b border-[#d0e5e7] pb-1">
      <span className="text-white text-base">{label}</span>
      <span className="ml-2 text-white opacity-80 group-hover:opacity-100 transition">
        ↗
      </span>
    </div>
  );
}
