import React from "react";
type props = {
  firstText: string;
  greyText: string;
};

const Header = ({ firstText, greyText }: props) => {
  return (
    <div className="mb-4 border-b border-[#18343e] pb-2">
      <h2 className="text-2xl md:text-[31px] font-semibold text-white">
        <span>{firstText}</span>{" "}
        <span className="text-[#748C8D]">{greyText}</span>
      </h2>
    </div>
  );
};

export default Header;
