'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import CustomSpinner from '@/components/Spinner';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserRoleQuery from '@/DbQuery/RoleQuery';
import useSession from '@/utils/UserExist/GetSession';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CSpinner from '@/components/CSpinner';

const USERNAME = 'anasbaig'; // 🔹 Apna GeoNames username yahan replace karein

const schema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  phone_number: yup
    .string()
    .min(10, 'Enter A Valid Phone Number')
    .required('Phone number is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  area: yup.string(),
  address: yup.string().required('Address is required'),
  zip_code: yup
    .string()
    .matches(/^\d+$/, 'Zip code must be numeric')
    .required('Zip code is required'),
});

const AddressForm = () => {
  const router = useRouter();
  const { user } = GlobalDetails();
  const { profileData } = UserRoleQuery();
  const session = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isReloading, setIsReloading] = useState(false);
  const [selectedCityLat, setSelectedCityLat] = useState(null);
  const [selectedCityLng, setSelectedCityLng] = useState(null);
    const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [CityName, setCityName] = useState();
  const [state, setState] = useState();

  const [countryCode, setCountryCode] = useState();

  const [CountryName, setCountryName] = useState();
  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  // 🌍 Fetch Countries
  useEffect(() => {
    setCountryLoading(true);
    axios
      .get('/api/fetchCountry?type=country')
      // axios.get(CountryUrl)
      .then(
        (res) => setCountries(res.data.geonames) && setCountryLoading(false)
      )
      .catch(() => setError('Failed to load countries'))
      .finally(() => setCountryLoading(false));
  }, []);

  // 🏙 Fetch Cities
  useEffect(() => {
    if (!selectedCountry) return;
    // axios.get(CityUrl)
    console.log(selectedCountry, '__>>>>>');
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
    console.log('Fetching areas for city: neeche wala s', selectedCity);
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
          setCountryCode(selectedCityData?.countryCode);
          setState(selectedCityData?.adminName1);
        }
      })

      .catch(() => setError('Failed to load areas'));
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
      const countryData = countries.find(item => item?.countryCode === selectedCountry);
      if (countryData) {
        setSelectedCountryData(countryData); // State mein country data save kar diya
      } else {
        setSelectedCountryData(null);
      }
    }
  }, [selectedCountry, countries]);
  const onSubmit = async (data) => {
    try {
      console.log('dataaa', data);
      setLoading(true);
      const { addresData, error } = await supabase.from('addresses').insert([
        {
          user_id: session?.user?.id, // Isko replace karna hoga actual user ID se
          full_name: data.full_name,
          phone_number: data.phone_number,
          address: data?.address,
          city: CityName,
          zip_code: data?.zip_code,
          country: CountryName,
          lat: selectedCityLat,
          long: selectedCityLng,
          area: data.area,
          state: state,
          phone_code: countryCode,
          currency_code: selectedCountryData?.currencyCode
        },
      ]);
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.message,
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: 'User Address Added Successfully',
        }).then((res) => {
          if (res.isConfirmed) setIsReloading(true); // Show spinner
          window.location.reload();
        });
      }
    } catch (err) {
      console.error('Something went wrong!', err);
    } finally {
      setLoading(false);
    }
  };
console.log("selectedCountryData!!",selectedCountryData)
  if (isReloading || countryLoading) {
    return <CustomSpinner />;
  }

  return (
    <>
      <h2 className="text-xl font-medium mt-4 mb-5">User Information</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-normal">Full Name</label>
          <input
            type="text"
            {...register('full_name')}
            defaultValue={profileData?.name}
            placeholder="Enter your full name"
            className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
          />
          <p className="text-red-500">{errors.full_name?.message}</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm mb-2 font-normal">Phone Number</label>
          <input
            {...register('phone_number')}
            type="text"
            placeholder="Enter your No:"
            className="w-full border-2 p-2 rounded"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="block text-sm mb-2 font-normal">Country</label>
          <select
            {...register('country')}
            className="w-full border-2 p-2 rounded"
          >
            <option value="">Select Country</option>
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
          <select {...register('city')} className="w-full border-2 p-2 rounded">
            <option value="">Select City</option>
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
          <select {...register('area')} className="w-full border-2 p-2 rounded">
            <option value="">Select Area</option>
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
          <label className="block text-sm mb-2 font-normal">House No:</label>
          <input
            {...register('address')}
            type="text"
            placeholder="Enter Your  House no:"
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
            placeholder="Enter Zip Code"
            className="w-full border-2 p-2 rounded"
          />
          {errors.zip_code && (
            <p className="text-red-500 text-sm">{errors.zip_code.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-unique w-full text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? <CSpinner /> : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default AddressForm;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddressForm = () => {
//     const USERNAME = "anasbaig"; // 🔹 Apna GeoNames username yahan replace karein
//     const [countries, setCountries] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [areas, setAreas] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState("");
//     const [selectedCity, setSelectedCity] = useState("");
//     const [loading, setLoading] = useState({ countries: false, cities: false, areas: false });
//     const [error, setError] = useState("");

//     // 🌍 Fetch Countries
//     useEffect(() => {
//         setLoading(prev => ({ ...prev, countries: true }));
//         axios.get(`http://api.geonames.org/countryInfoJSON?username=${USERNAME}`)
//         .then((res) => {
//             setCountries(res.data.geonames)
//             console.log("Countryyyyyy!!!!!",res)
//         })
//         .catch(() => setError("Failed to load countries"))
//         .finally(() => setLoading(prev => ({ ...prev, countries: false })));
//     }, []);

//     // 🏙 Fetch Cities
//     useEffect(() => {
//         if (!selectedCountry) return;
//         setLoading(prev => ({ ...prev, cities: true }));
//         axios.get(`http://api.geonames.org/searchJSON?country=${selectedCountry}&featureClass=P&maxRows=10&username=${USERNAME}`)
//         .then((res) => setCities(res.data.geonames))
//         .catch(() => setError("Failed to load cities"))
//         .finally(() => setLoading(prev => ({ ...prev, cities: false })));
//     }, [selectedCountry]);

//     // 🏡 Fetch Areas (Based on City)
//     useEffect(() => {
//         if (!selectedCity) return;
//         setLoading(prev => ({ ...prev, areas: true }));
//         axios.get(`http://api.geonames.org/childrenJSON?geonameId=${selectedCity}&username=${USERNAME}`)
//         .then((res) => {
//             setAreas(res.data.geonames)
//             console.log("AREASSS",res?.data)
//         } )
//         .catch(() => setError("Failed to load areas"))
//         .finally(() => setLoading(prev => ({ ...prev, areas: false })));
//     }, [selectedCity]);

//     return (
//         <form className="space-y-4">
//             {error && <p className="text-red-500">{error}</p>}

//             {/* 🌍 Country Dropdown */}
//             <label>Country:</label>
//             <select onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2">
//                 <option value="">Select Country</option>
//                 {loading.countries ? <option>Loading...</option> :
//                     countries.map((c) => (
//                         <option key={c.geonameId} value={c.countryCode}>{c.countryName}</option>
//                     ))}
//             </select>

//             {/* 🏙 City Dropdown */}
//             <label>City:</label>
//             <select onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedCountry} className="border p-2">
//                 <option value="">Select City</option>
//                 {loading.cities ? <option>Loading...</option> :
//                     cities.map((city) => (
//                         <option key={city.geonameId} value={city.geonameId}>{city.name}</option>
//                     ))}
//             </select>

//             {/* 🏡 Areas Dropdown */}
//             <label>Areas:</label>
//             <select disabled={!selectedCity} className="border p-2">
//                 <option value="">Select Area</option>
//                 {loading.areas ? <option>Loading...</option> :
//                     areas.map((area) => (
//                         <option key={area.geonameId} value={area.geonameId}>{area.name}</option>
//                     ))}
//             </select>
//         </form>
//     );
// };

// export default AddressForm;
