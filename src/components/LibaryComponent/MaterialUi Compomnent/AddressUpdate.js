'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { RxCross2 } from 'react-icons/rx';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CSpinner from '@/components/CSpinner';

const schema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  phone_number: yup
    .string()
    .min(10, 'Enter A Valid Phone Number')
    .required('Phone number is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  area: yup.string().required('Area is required'),
  address: yup.string().required('Address is required'),
  zip_code: yup
    .string()
    .matches(/^\d+$/, 'Zip code must be numeric')
    .required('Zip code is required'),
});

const AddressUpdate = ({ setIsEditing, userDetails }) => {
  const { updateUserDetails } = UserQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [selectedCityLat, setSelectedCityLat] = useState(null);
  const [selectedCityLng, setSelectedCityLng] = useState(null);
  const [countryLoading, setCountryLoading] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [CityName, setCityName] = useState();
  const [selectstate, setSelectState] = useState();
  const [CountryName, setCountryName] = useState();

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  // 🌍 Fetch Countries
  useEffect(() => {
    setCountryLoading(true);
    axios
      .get(`/api/fetchCountry?type=country`)
      .then((res) => {
        setCountries(res.data.geonames);
        setCountryLoading(false);
      })
      .catch(() => setError('Failed to load countries'))
      .finally(() => setCountryLoading(false));
  }, []);

  // 🏙 Fetch Cities
  useEffect(() => {
    if (!selectedCountry) return;
    axios
      .get(`/api/fetchCountry?type=city&country=${selectedCountry}`)
      .then((res) => {
        setCities(res.data.geonames);
      })
      .catch(() => setError('Failed to load cities'));
  }, [selectedCountry]);

  // 🏡 Fetch Areas (Based on City)
  useEffect(() => {
    console.log('Fetching areas for city:', selectedCity);
    if (!selectedCity) return;
    axios
      .get(`/api/fetchCountry?type=area&city=${selectedCity}`)
      .then((res) => {
        setAreas(res.data.geonames);
        const selectedCityData = cities?.find(
          (city) => city?.geonameId == selectedCity
        );
        // database ke liyay name alag se nikal rahah u

        if (selectedCityData) {
          setSelectedCityLat(selectedCityData?.lat);
          setSelectedCityLng(selectedCityData?.lng);
          setCityName(selectedCityData?.name);
          setCountryName(selectedCityData?.countryName);
          setSelectState(selectedCityData?.adminName1);
        }
      })

      .catch(() => setError('Failed to load areas'));
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
      const countryData = countries.find(
        (item) => item?.countryCode === selectedCountry
      );
      if (countryData) {
        setSelectedCountryData(countryData); // State mein country data save kar diya
      } else {
        setSelectedCountryData(null);
      }
    }
  }, [selectedCountry, countries]);

  const handleSave = async (data) => {
    let updateDetails = {
      address: data?.address,
      area: data?.area,
      city: CityName || userDetails?.city,
      country: CountryName || userDetails?.country,
      full_name: data?.full_name,
      state: selectstate || userDetails?.state,
      lat: selectedCityLat || userDetails?.lat,
      long: selectedCityLng || userDetails?.long,
      phone_number: data?.phone_number,
      zip_code: data?.zip_code,
      phone_code: selectedCountryData?.countryCode,
      currency_code: selectedCountryData?.currencyCode,
    };

    try {
      setLoading(true);
      await updateUserDetails(updateDetails);
      Swal.fire({
        icon: 'success',
        text: 'Address Updated',
      });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(`Error updating `, error);
    } finally {
      setLoading(false);
    }
  };
  console.log(selectedCountryData?.currencyCode, 'countryData');

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
        <div className="max-w-lg w-[90%] bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className=" text-black py-4 px-4 sm:px-6 text-left flex justify-between items-center border-b-2 text-lg font-semibold">
            <h1> Edit Your Details </h1>
            <button
              onClick={() => setIsEditing(false)}
              className="hover:text-[red] text-black text-[20px]"
            >
              <RxCross2 />
            </button>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit(handleSave)}
            className="space-y-3 h-[70vh]  px-4 pb-4 py-3 overflow-y-auto"
          >
            <div>
              <label className="block mb-2 text-sm font-normal">
                Full Name
              </label>
              <input
                type="text"
                {...register('full_name')}
                defaultValue={userDetails?.full_name}
                placeholder="Enter your full name"
                className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
              />
              <p className="text-red-500">{errors.full_name?.message}</p>
            </div>

            {/* Country Dropdown */}
            <div>
              <label className="block text-sm mb-2 font-normal">Country</label>
              <select
                {...register('country')}
                className="w-full border-2 p-2 rounded"
              >
                <option value="">{userDetails?.country}</option>
                {countries.map((country) => (
                  <option key={country.geonameId} value={country.countryCode}>
                    {country.countryName}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-sm mb-2 font-normal">City</label>
              <select
                {...register('city')}
                className="w-full border-2 p-2 rounded"
              >
                <option value="">{userDetails?.city}</option>
                {cities?.map((city) => (
                  <option key={city?.geonameId} value={city?.geonameId}>
                    {' '}
                    {/* 🔹 Name store ho raha hai */}
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* Area Dropdown */}
            <div>
              <label className="block text-sm mb-2 font-normal">Area</label>
              <select
                {...register('area')}
                className="w-full border-2 p-2 rounded"
              >
                <option value="">{userDetails?.area}</option>
                {areas?.map((area) => (
                  <option key={area?.geonameId} value={area?.name}>
                    {' '}
                    {/* 🔹 Name store ho raha hai */}
                    {area.name}
                  </option>
                ))}
              </select>
              {errors.area && (
                <p className="text-red-500 text-sm">{errors.area.message}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm mb-2 font-normal">
                House No:
              </label>
              <input
                {...register('address')}
                type="text"
                defaultValue={userDetails?.address}
                className="w-full border-2 p-2 rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm mb-2 font-normal">Zip Code</label>
              <input
                {...register('zip_code')}
                type="text"
                defaultValue={userDetails?.zip_code}
                className="w-full border-2 p-2 rounded"
              />
              {errors.zip_code && (
                <p className="text-red-500 text-sm">
                  {errors.zip_code.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm mb-2 font-normal">
                Phone Number
              </label>
              <input
                {...register('phone_number')}
                type="text"
                defaultValue={userDetails?.phone_number}
                className="w-full border-2 text-black p-2 rounded"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-unique w-full   text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? <CSpinner /> : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressUpdate;

/* 
const handleSave = async () => {
    try {
        setLoading(true)
        await updateUserDetails(updatedDetails);
        setIsEditing(false)
    } catch (error) {
        console.error(`Error updating `, error);

    }
    finally {
        setLoading(false)
    }

}; */
