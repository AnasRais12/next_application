import axios from 'axios';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    return res.data.rates;  // Exchange rates return karega
  } catch (error) {
    console.error("Currency API Error:", error);
    return null;
  }
};
