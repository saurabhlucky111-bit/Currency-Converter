import { useState, useEffect } from "react";
import CurrencyInput from "./Components/CurrencyInput";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConverted, setIsConverted] = useState(false);
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setExchangeRate(0);
    setConvertedAmount(0);
    setIsConverted(false);

    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        setError("");
        if (fromCurrency === toCurrency) {
          setExchangeRate(1);
          return;
        }
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`,
          {
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }
        const data = await response.json();

        setExchangeRate(data.rate);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError("Failed to fetch exchange rate");
        setExchangeRate(0);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchExchangeRate();
    return () => {
      controller.abort();
    };
  }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (Number(amount) <= 0) {
      setAmountError("Please Entere an amount greater than 0...");
    }

    if (exchangeRate === 0) {
      return;
    }

    setAmountError("");
    setConvertedAmount(Number(amount) * exchangeRate);
    setIsConverted(true);
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(0);
    setIsConverted(false);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    setConvertedAmount(0);
    setIsConverted(false);
    setAmountError("");
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center px-4 py-6">
      <div className=" bg-white rounded-2xl shadow-xl w-full max-w-md p-5">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 mb-6">
          Currency Converter
        </h1>
        <p>
          {loading
            ? "Loading.."
            : error
              ? error
              : `Exchange Rate:${exchangeRate}`}
        </p>

        <div className="space-y-4">
          <CurrencyInput
            label="From"
            amount={amount}
            currency={fromCurrency}
            onCurrencyChange={setFromCurrency}
            onAmountChange={handleAmountChange}
            readOnly={false}
          />

          {amountError && (
            <p className="text-red-500 mt-2 text-sm">{amountError}</p>
          )}

          <CurrencyInput
            label="To"
            amount={convertedAmount.toFixed(2)}
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
            readOnly={true}
          />
        </div>
        <div className="flex justify-center w-full max-w-md p-5">
          <button
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-300"
            onClick={swapCurrency}
          >
            Swap
          </button>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white ml-1 p-3 rounded-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={
            loading ||
            Boolean(error) ||
            exchangeRate === 0 ||
            Number(amount) <= 0
          }
          onClick={convertCurrency}
        >
          {loading ? "Loading" : "Convert Currency"}
        </button>

        {isConverted && (
          <p className="text-center mt-4 text-xl font-semibold text-green-600">
            Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
