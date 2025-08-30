type PriceRowProps = {
  label: string;
  value: string | number;
  isDimmed?: boolean;
};

export const PriceRow = ({ label, value, isDimmed = true }: PriceRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className={`${isDimmed ? "text-gray-300" : "text-white"} text-base`}>
        {label}
      </span>
      <span className="text-white text-base">{value}</span>
    </div>
  );
};
