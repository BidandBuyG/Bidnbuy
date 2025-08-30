import React from "react";

type EscrowActionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const EscrowActionButton = ({
  onClick,
  disabled,
  loading,
  children,
  className = "",
  style = {},
}: EscrowActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 cursor-pointer rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 ${className}`}
    style={style}
  >
    {loading ? (
      <>
        <div className="w-5 h-5 cursor-pointer border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Processing...
      </>
    ) : (
      children
    )}
  </button>
);

export default EscrowActionButton;