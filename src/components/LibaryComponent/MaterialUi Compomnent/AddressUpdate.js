'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { RxCross2 } from 'react-icons/rx';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CSpinner from '@/components/CSpinner';
import useLocationFetch from '@/customHooks/useLocationFetch';
import { Button } from '@mui/material';

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
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  // 🪝 Use custom hook for country, city, area, lat/lng, etc.
  const {
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
  } = useLocationFetch(selectedCountry, selectedCity);

  const [loading, setLoading] = useState(false);

  const handleSave = async (data) => {
    const updateDetails = {
      address: data?.address,
      area: data?.area,
      city: CityName || userDetails?.city,
      country: CountryName || userDetails?.country,
      full_name: data?.full_name,
      state: SelectState || userDetails?.state,
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
      Swal.fire({ icon: 'success', text: 'Address Updated' });
      setIsEditing((prev) => ({ ...prev, isEditing: false }));
      window.location.reload();
    } catch (error) {
      console.error('Update Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="max-w-lg w-[90%] bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="text-black py-4 px-4 sm:px-6 flex justify-between items-center border-b-2 text-lg font-semibold">
          <h1>Edit Your Details</h1>
          <button
            onClick={() => setIsEditing((prev) => ({ ...prev, isEditing: false }))}
            className="hover:text-[red] text-black text-[20px]"
          >
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-3 h-[70vh] px-4 pb-4 py-3 overflow-y-auto">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-normal">Full Name</label>
            <input
              type="text"
              {...register('full_name')}
              defaultValue={userDetails?.full_name}
              className="w-full border-2 p-2 rounded focus:outline-orange-400"
            />
            <p className="text-red-500">{errors.full_name?.message}</p>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm mb-2 font-normal">Country</label>
            <select {...register('country')} className="w-full border-2 p-2 rounded">
              <option value="">{userDetails?.country}</option>
              {countries.map((country) => (
                <option key={country.geonameId} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm mb-2 font-normal">City</label>
            <select {...register('city')} className="w-full border-2 p-2 rounded">
              <option value="">{userDetails?.city}</option>
              {citiesList.map((city) => (
                <option key={city?.geonameId} value={city?.geonameId}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm mb-2 font-normal">Area</label>
            <select {...register('area')} className="w-full border-2 p-2 rounded">
              <option value="">{userDetails?.area}</option>
              {areas.map((area) => (
                <option key={area?.geonameId} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
            {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-2 font-normal">House No:</label>
            <input
              {...register('address')}
              type="text"
              defaultValue={userDetails?.address}
              className="w-full border-2 p-2 rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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
            {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm mb-2 font-normal">Phone Number</label>
            <input
              {...register('phone_number')}
              type="text"
              defaultValue={userDetails?.phone_number}
              className="w-full border-2 text-black p-2 rounded"
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
          </div>

          {/* Submit */}
          <Button type="submit" sx={{ backgroundColor: 'primary.main', color: 'white', width: '100%', padding: '6px 12px', borderRadius: '4px' }} disabled={!isValid || loading}>
            {loading ? <CSpinner /> : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddressUpdate;
