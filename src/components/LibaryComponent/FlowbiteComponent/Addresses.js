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
    <div className="bg-white  sm:py-6 sm:px-6 py-3 px-2 rounded-lg ">
    <h2 className="text-2xl font-bold text-[#1f2937] mb-6">User Information</h2>
  
    {error && (
      <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
        <p>{error}</p>
      </div>
    )}
  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('full_name')}
          defaultValue={profileData?.name}
          placeholder="Enter your full name"
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-500">{errors.full_name.message}</p>
        )}
      </div>
  
      {/* Phone Number */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register('phone_number')}
          type="tel"
          placeholder="Enter your phone number"
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
        )}
      </div>
  
      {/* Country Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          {...register('country')}
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.geonameId} value={country.countryCode}>
              {country.countryName}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>
  
      {/* City Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          City <span className="text-red-500">*</span>
        </label>
        <select
          {...register('city')}
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        >
          <option value="">Select City</option>
          {cities?.map((city) => (
            <option key={city?.geonameId} value={city?.geonameId}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>
  
      {/* Area Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          Area <span className="text-red-500">*</span>
        </label>
        <select
          {...register('area')}
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        >
          <option value="">Select Area</option>
          {areas?.map((area) => (
            <option key={area?.geonameId} value={area?.name}>
              {area.name}
            </option>
          ))}
        </select>
        {errors.area && (
          <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>
        )}
      </div>
  
      {/* Address Field */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          House Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register('address')}
          type="text"
          placeholder="Enter your house number and street"
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
  
      {/* Zip Code */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[#1f2937]">
          Zip Code <span className="text-red-500">*</span>
        </label>
        <input
          {...register('zip_code')}
          type="text"
          placeholder="Enter your zip/postal code"
          className="w-full p-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-[#047857] focus:border-[#047857] outline-none transition-all"
        />
        {errors.zip_code && (
          <p className="mt-1 text-sm text-red-500">{errors.zip_code.message}</p>
        )}
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg bg-[#047857] hover:bg-[#03644a] text-white font-medium transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <CSpinner /> 
          </span>
        ) : (
          'Save Information'
        )}
      </button>
    </form>
  </div>
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
