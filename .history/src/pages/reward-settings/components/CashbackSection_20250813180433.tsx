const CashbackSection = ({ register, errors }: any) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-300 text-base mb-3">Cashback %</label>
      <input
        {...register("cashbackPercentage")}
        type="number"
        step="0.01"
        min="0"
        max="100"
        placeholder="Enter percentage"
        className="w-full p-4 rounded-lg border border-[#00707B] text-white text-base bg-[#013139] focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:border-transparent no-spinner"
      />
      {errors.cashbackPercentage && (
        <p className="text-red-400 text-sm mt-1">{errors.cashbackPercentage.message}</p>
      )}
    </div>
  )
}

export default CashbackSection;