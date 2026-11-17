function CurrencyInput({
  label,
  amount,
  currency,
  onCurrencyChange,
  onAmountChange,
  readOnly = false,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <label className="block text-gray-500 mb-2">{label}</label>

      <input
        type="number"
        value={amount}
        placeholder="Enter amount"
        readOnly={readOnly}
        onChange={(e) => {
          if (!readOnly) {
            onAmountChange(e.target.value);
          }
        }}
        className="w-full border p-3 rounded-lg"
      />

      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full border p-3 rounded-lg mt-3"
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="BTC">BTC</option>
      </select>
    </div>
  );
}

export default CurrencyInput;
