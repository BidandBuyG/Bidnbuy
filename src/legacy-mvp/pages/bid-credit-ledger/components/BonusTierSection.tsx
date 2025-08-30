/**
 * Interface for a single bonus tier item.
 * @typedef {Object} BonusTierItem
 * @property {string} label - The display label for the top-up amount (e.g., "N10k").
 * @property {string} bonus - The bonus bid credit amount (e.g., "112 B.C").
 * @property {string} bonusPercentage - The bonus percentage (e.g., "+12% Bonus").
 */

type BonusTierItem = {
  amount: string;
  bonus: string;
};

/**
 * BonusTiersSection component displays a list of available bonus tiers.
 * It now displays the tiers in a simplified format without buttons.
 * @returns {JSX.Element} The rendered bonus tiers section.
 */

const BonusTiersSection = () => {
  const bonusInfo: BonusTierItem[] = [
    { amount: "200 BC", bonus: "+10% Bonus" },
    { amount: "500 BC", bonus: "+15% Bonus" },
    { amount: "1000 BC", bonus: "+20% Bonus" },
  ];

  return (
    <div className="w-full md:max-w-lg mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">
        Bonus Tiers
      </h2>

      <div className="space-y-4 px-2">
        {bonusInfo.map((info, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-300 text-lg">{info.amount}</span>
            <span className="text-gray-300 text-lg">{info.bonus}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusTiersSection;
