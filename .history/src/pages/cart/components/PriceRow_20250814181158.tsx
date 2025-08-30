// SummaryRow.tsx
type SummaryRowProps = {
  label: string;
  value: string | number;
  isDimmed?: boolean; // Optional style control
};

export const SummaryRow = ({ label, value, isDimmed = true }: SummaryRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className={`${isDimmed ? "text-gray-300" : "text-white"} text-base`}>
        {label}
      </span>
      <span className="text-white text-base">{value}</span>
    </div>
  );
};
