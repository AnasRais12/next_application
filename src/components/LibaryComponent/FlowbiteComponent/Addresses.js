// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { supabase } from "@/lib/supabase";
// import * as yup from "yup";
// import useSession from "@/utils/UserExist/GetSession";
// import { useRouter } from "next/navigation";
// import CSpinner from "@/components/CSpinner";
// import UserRoleQuery from "@/DbQuery/RoleQuery";
// import Swal from "sweetalert2";
// import { GlobalDetails } from "@/context/globalprovider/globalProvider";
// import CustomSpinner from "@/components/Spinner";

// const schema = yup.object().shape({
//     full_name: yup.string().required("Full name is required"),
//     phone_number: yup
//         .string()
//         .min(10, 'Enter A Valid Phone Number')
//         .required("Phone number is required"),
//     address: yup.string().required("Address is required"),
//     city: yup.string().required("City is required"),
//     zip_code: yup
//         .string()
//         .matches(/^\d+$/, "Zip code must be numeric")
//         .required("Zip code is required"),
//     country: yup.string().required("Country is required"),
// });

// const AddressForm = ({ setUserAddresssExist, setIsAddressExist, isAddressExist }) => {
//     const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });
//     const [loading, setloading] = useState(false)
//     const [isReloading, setIsReloading] = useState(false);
//     const router = useRouter()
//     const { user } = GlobalDetails()
//     const { profileData } = UserRoleQuery()
//     const session = useSession()
//     console.log(profileData)
//     console.log(user)


//     const onSubmit = async (data) => {
//         try {
//             setloading(true)
//             const { addresData,error } = await supabase.from('addresses').insert([
//                 {
//                     user_id: session?.user?.id, // Isko replace karna hoga actual user ID se
//                     full_name: data.full_name,
//                     phone_number: data.phone_number,
//                     address: data.address,
//                     city: data.city,
//                     zip_code: data.zip_code,
//                     country: data.country,
//                 }
//             ])
//             if (error) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: error?.message
//                 })
//             } else {
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'User Address Added Successfully'
//                 }).then((res) => {
//                     if(res.isConfirmed)
//                         setIsReloading(true); // Show spinner
//                         window.location.reload();
                   
//                 });

//             }
//         } catch (err) {
//             console.error("Something went wrong!", err);
//         }
//         finally {
//             setloading(false)
//         }

     
//     };
//     if(isReloading){
//         return <CustomSpinner/>
//     }

//     return (
//         <>
//             <h2 className="text-xl font-medium mt-4 mb-5">User Information</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Full Name */}
//                 <div>
//                     <label className="block mb-2 text-sm  font-normal">Full Name</label>
//                     <input
//                         type="text"
//                         {...register("full_name")}
//                         value={profileData?.name}
//                         placeholder="Enter your full name"
//                         className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
//                     />
//                     <p className="text-red-500">{errors.full_name?.message}</p>
//                 </div>

//                 {/* Phone Number */}
//                 <div>
//                     <label className="block mb-2 text-sm font-normal">Phone Number</label>
//                     <input
//                         type="text"
//                         defaultValue={session?.user?.phone}
//                         {...register("phone_number")}
//                         placeholder="Enter your phone number"
//                         className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
//                     />
//                     <p className="text-red-500">{errors.phone_number?.message}</p>
//                 </div>

//                 {/* Address */}
//                 <div>
//                     <label className="block mb-2 text-sm font-normal">Address</label>
//                     <input
//                         type="text"
//                         {...register("address")}
//                         placeholder="Enter your address"
//                         className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
//                     />
//                     <p className="text-red-500">{errors.address?.message}</p>
//                 </div>
//                 {/* Country */}
//                 <div>
//                     <label className="block text-sm mb-2 font-normal">Country</label>
//                     <select {...register("country")} className="w-full focus:outline-2 focus:outline-orange-400 border-2 border-[#f1f0f0] p-2 rounded">
//                         <option value="">Select Country</option>
//                         <option value="Pakistan">Pakistan</option>
//                         <option value="India">India</option>
//                         <option value="USA">USA</option>
//                         <option value="UK">UK</option>
//                     </select>
//                     <p className="text-red-500">{errors.country?.message}</p>
//                 </div>

//                 {/* City Dropdown (Dynamic based on Country) */}
//                 <div>
//                     <label className="block text-sm mb-2 font-normal">City</label>
//                     <select {...register("city")} className="w-full border-2 border-[#f1f0f0]  p-2 rounded">
//                         <option className="text-gray-100" value="">Select City</option>
//                         <option value="Karachi">Karachi</option>
//                         <option value="Lahore">Lahore</option>
//                         <option value="New York">New York</option>
//                         <option value="London">London</option>
//                     </select>
//                     <p className="text-red-500">{errors.city?.message}</p>
//                 </div>


//                 {/* Zip Code */}
//                 <div>
//                     <label className="block mb-2 text-sm font-normal">Zip Code</label>
//                     <input
//                         type="text"
//                         {...register("zip_code")}
//                         placeholder="Enter zip code"
//                         className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
//                     />
//                     <p className="text-red-500">{errors.zip_code?.message}</p>
//                 </div>



//                 {/* Submit Button */}
//                 <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded w-full">
//                     {loading ? <CSpinner /> : 'Submit'}
//                 </button>
//             </form>
//         </>
//     );
// };

// export default AddressForm;
"use client";
import React, { useState, useEffect } from "react";

const AddressForm = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    const username = "anasbaig"; // Replace with your GeoNames username

    // ✅ Fetch countries
    const fetchCountries = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.geonames.org/countryInfoJSON?username=${username}`);
            const data = await response.json();
            setCountries(data.geonames || []);
        } catch (error) {
            console.error("Error fetching countries", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch cities based on selected country
    const fetchCities = async (countryCode) => {
        if (!countryCode) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=10&username=${username}`);
            const data = await response.json();
            setCities(data.geonames || []);
        } catch (error) {
            console.error("Error fetching cities", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch areas based on selected city
    const fetchAreas = async (geonameId) => {
        if (!geonameId) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${username}`);
            const data = await response.json();
            setAreas(data.geonames || []);
        } catch (error) {
            console.error("Error fetching areas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchCities(selectedCountry);
    }, [selectedCountry]);

    useEffect(() => {
        fetchAreas(selectedCity);
    }, [selectedCity]);

    return (
        <div>
            <h2 className="text-xl font-medium mt-4 mb-5">Select Location</h2>
            
            {/* Country Dropdown */}
            <div>
                <label className="block text-sm mb-2 font-normal">Country</label>
                <select
                    className="w-full border-2 border-gray-300 p-2 rounded"
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.geonameId} value={country.countryCode}>
                            {country.countryName}
                        </option>
                    ))}
                </select>
            </div>

            {/* City Dropdown */}
            <div className="mt-3">
                <label className="block text-sm mb-2 font-normal">City</label>
                <select
                    className="w-full border-2 border-gray-300 p-2 rounded"
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedCountry}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.geonameId} value={city.geonameId}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Area Dropdown */}
            <div className="mt-3">
                <label className="block text-sm mb-2 font-normal">Area</label>
                <select
                    className="w-full border-2 border-gray-300 p-2 rounded"
                    disabled={!selectedCity}
                >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                        <option key={area.geonameId} value={area.geonameId}>
                            {area.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p className="mt-3 text-sm text-gray-600">Loading...</p>}
        </div>
    );
};

export default AddressForm;
