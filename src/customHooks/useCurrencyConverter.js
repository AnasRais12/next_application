import { useEffect, useState } from "react";
import { fetchExchangeRates } from "@/helper/CurrenyConver";

export default function useCurrencyConverter() {
  const [from, setFrom] = useState("PKR");
  const [rates, setRates] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const data = await fetchExchangeRates(from);
        if (data) {
          console.log(data, "Data is here");
          setRates(data);
        } else {
          console.log("Data not found");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    getExchangeRates();

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, [from]);

  return { from, setFrom, rates, countries, setRates };
}
