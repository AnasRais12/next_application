import axios from "axios";

const ExchangeFrom= "USD"
// Exchange rates fetch karne ka function
export const fetchExchangeRates = async (baseCurrency) => {
  console.log("Fetching Exchange Rates for:", baseCurrency);
  try {
    const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    return res.data.rates; // Exchange rates return karega
  } catch (error) {
    console.error("Currency API Error:", error);
    return null;
  }
};

// Price conversion function
export const ConvertPrice = (price, rates,to,) => {
  console.log("Hello World Togetther!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("Exchange Rates Object:", rates);
  console.log("Price in", ExchangeFrom, ":", price);
  console.log("Target Currency:", to);

  if (!rates || typeof rates !== "object") {
    console.error("Invalid rates data received");
    return price; // Default to original price if rates are invalid
  }

  if (!rates[ExchangeFrom]) {
    console.error(`Base currency (${ExchangeFrom}) rate not found.`);
    return price;
  }

  if (!rates[to]) {
    console.warn(`Exchange rate for ${to} not found.`);
    return price;
  }

  // Conversion Formula: (price / fromRate) * toRate
  const convertedPrice = (price / rates[ExchangeFrom]) * rates[to];
  console.log(`Converted Price in ${to}:`, convertedPrice);

  return Math.round(convertedPrice).toLocaleString(); 
};
