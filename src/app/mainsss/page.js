"use client";
import { useState, useEffect } from "react";
import { fetchExchangeRates } from "@/helper/CurrenyConver";

export default function CurrencyConverter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [countries, setCountries] = useState([]);

  // Fetch exchange rates when the 'from' currency changes
  useEffect(() => {
    fetchExchangeRates(from).then((data) => {
      if (data) setRates(data);
    });

    // Fetch countries for flag selection
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data)
        console.log(data?.map(),"_________________Datataaa")
      });
  }, [from]);

  // Handle conversion logic
  const handleConvert = () => {
    if (rates[to]) {
      setConvertedAmount(amount * rates[to]);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto mt-24 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-3">Currency Converter</h2>

      <div className="mb-3">
        {/* From Currency Dropdown */}
        <label className="block text-sm font-medium text-gray-700">From Currency</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {countries.map((country) => (
            <option key={country.cca3} value={country.currencies ? Object.keys(country.currencies)[0] : "USD"}>
            {country?.flags.png} ({country.currencies ? Object.keys(country.currencies)[0] : "USD"})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 flex-col gap-4">
        {/* To Currency Dropdown */}
        <label className="block text-sm font-medium text-gray-700">To Currency</label>
        <div className="flex flex-col">
        {countries.map((country) => (
          <>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          
        
            <option key={country.cca3} value={country.currencies ? Object.keys(country.currencies)[0] : "USD"}>
              {country.name.common} ({country.currencies ? Object.keys(country.currencies)[0] : "USD"})
            </option>

        </select>
            <img src={country?.flags.png}/>
            </>

      ))}
            </div>



      </div>

      <div className="mb-3">
        {/* Amount Input */}
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="mt-3 p-2 bg-blue-500 text-white rounded"
      >
        Convert
      </button>

      {/* Conversion Result */}
      {convertedAmount !== null && (
        <p className="mt-3 text-lg font-semibold">
          {amount} {from} = {convertedAmount.toFixed(2)} {to}
        </p>
      )}
    </div>
  );
}
