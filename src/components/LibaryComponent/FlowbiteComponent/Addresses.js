'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserRoleQuery from '@/DbQuery/RoleQuery';
import useSession from '@/utils/UserExist/GetSession';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CSpinner from '@/components/CSpinner';
import CustomSpinner from '@/components/Spinner';

const schema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  phone_number: yup.string().min(10, 'Enter a valid phone number').required(),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  area: yup.string(),
  address: yup.string().required('Address is required'),
  zip_code: yup.string().matches(/^\d+$/, 'Zip code must be numeric').required(),
});

const AddressForm = () => {
  const router = useRouter();
  const { profileData } = UserRoleQuery();
  const session = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isValid},
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

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

  useEffect(() => {
    setCountryLoading(true);
    axios
      .get('/api/fetchCountry?type=country')
      .then((res) => setCountries(res.data.geonames))
      .catch(() => setError('Failed to load countries'))
      .finally(() => setCountryLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    axios
      .get(`/api/fetchCountry?type=city&country=${selectedCountry}`)
      .then((res) => setCities(res.data.geonames))
      .catch(() => setError('Failed to load cities'));
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCity) return;
    axios
      .get(`/api/fetchCountry?type=area&city=${selectedCity}`)
      .then((res) => {
        setAreas(res.data.geonames);
        const selectedCityData = cities.find(
          (city) => city?.geonameId == selectedCity
        );
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
      const countryData = countries.find(
        (item) => item?.countryCode === selectedCountry
      );
      setSelectedCountryData(countryData || null);
    }
  }, [selectedCountry, countries]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('addresses').insert([
        {
          user_id: session?.user?.id,
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
          currency_code: selectedCountryData?.currencyCode,
        },
      ]);
      if (error) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: error?.message });
      } else {
        Swal.fire({ icon: 'success', text: 'User Address Added Successfully' }).then((res) => {
          if (res.isConfirmed) setIsReloading(true);
          window.location.reload();
        });
      }
    } catch (err) {
      console.error('Something went wrong!', err);
    } finally {
      setLoading(false);
    }
  };

  if (isReloading || countryLoading) {
    return (
      <CustomSpinner/>
    );
  }

  return (
    <Box >
      <Typography variant="h6" mt={0} mb={3} fontWeight={500}>User Information</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Full Name"
          defaultValue={profileData?.name}
          {...register('full_name')}
          error={!!errors.full_name}
          helperText={errors.full_name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          {...register('phone_number')}
          error={!!errors.phone_number}
          helperText={errors.phone_number?.message}
          margin="normal"
        />
        <Select
          fullWidth
          displayEmpty
          {...register('country')}
          defaultValue=""
          error={!!errors.country}
        >
          <MenuItem value="">Select Country</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.geonameId} value={country.countryCode}>
              {country.countryName}
            </MenuItem>
          ))}
        </Select>
        {errors.country && <Typography color="error" variant="caption">{errors.country.message}</Typography>}

        <Select
          fullWidth
          displayEmpty
          {...register('city')}
          defaultValue=""
          error={!!errors.city}
          sx={{ mt: 2 }}
        >
          <MenuItem value="">Select City</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.geonameId} value={city.geonameId}>{city.name}</MenuItem>
          ))}
        </Select>
        {errors.city && <Typography color="error" variant="caption">{errors.city.message}</Typography>}

        <Select
          fullWidth
          displayEmpty
          {...register('area')}
          defaultValue=""
          sx={{ mt: 2 }}
        >
          <MenuItem value="">Select Area</MenuItem>
          {areas.map((area) => (
            <MenuItem key={area.geonameId} value={area.name}>{area.name}</MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="House No."
          {...register('address')}
          error={!!errors.address}
          helperText={errors.address?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Zip Code"
          {...register('zip_code')}
          error={!!errors.zip_code}
          helperText={errors.zip_code?.message}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={!isValid || loading}
        >
          {loading ? <CSpinner /> : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

export default AddressForm;
