import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useLocationFetch(selectedCountry, selectedCity) {
  const [countries, setCountries] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [areas, setAreas] = useState([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [selectedCityLat, setSelectedCityLat] = useState(null);
  const [selectedCityLng, setSelectedCityLng] = useState(null);
  const [CityName, setCityName] = useState('');
  const [CountryName, setCountryName] = useState('');
  const [SelectState, setSelectState] = useState('');
  const [error, setError] = useState(null);

  // 📍 Load Countries
  useEffect(() => {
    setCountryLoading(true);
    axios
      .get('/api/fetchCountry?type=country')
      .then((res) => {
        setCountries(res.data.geonames);
        setCountryLoading(false);
      })
      .catch(() => {
        setError('Failed to load countries');
        setCountryLoading(false);
      });
  }, []);

  // 🏙️ Load Cities based on selectedCountry
  useEffect(() => {
    if (!selectedCountry) return;

    axios
      .get(`/api/fetchCountry?type=city&country=${selectedCountry}`)
      .then((res) => {
        setCitiesList(res.data.geonames);
        const foundCountry = countries.find((c) => c.geonameId == selectedCountry);
        setSelectedCountryData(foundCountry || null);
      })
      .catch(() => {
        setError('Failed to load cities');
      });
  }, [selectedCountry, countries]);

  // 📍 Load Areas based on selectedCity
  useEffect(() => {
    if (!selectedCity) return;

    axios
      .get(`/api/fetchCountry?type=area&city=${selectedCity}`)
      .then((res) => {
        setAreas(res.data.geonames);

        const selectedCityData = citiesList?.find((city) => city?.geonameId == selectedCity);

        if (selectedCityData) {
          setSelectedCityLat(selectedCityData?.lat);
          setSelectedCityLng(selectedCityData?.lng);
          setCityName(selectedCityData?.name);
          setCountryName(selectedCityData?.countryName);
          setSelectState(selectedCityData?.adminName1);
        }
      })
      .catch(() => {
        setError('Failed to load areas');
      });
  }, [selectedCity, citiesList]);

  // 🧠 Return All Data
  return {
    countries,
    citiesList,
    areas,
    countryLoading,
    selectedCountryData,
    selectedCityLat,
    selectedCityLng,
    CityName,
    CountryName,
    SelectState,
    error,
  };
}
