"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/lib/supabase";
import * as yup from "yup";
import useSession from "@/utils/UserExist/GetSession";
import CSpinner from "@/components/CSpinner";

const schema = yup.object().shape({
    full_name: yup.string().required("Full name is required"),
    phone_number: yup
        .string()
        .min(10, 'Enter A Valid Phone Number')
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    zip_code: yup
        .string()
        .matches(/^\d+$/, "Zip code must be numeric")
        .required("Zip code is required"),
    country: yup.string().required("Country is required"),
});

const AddressForm = () => {
    const [loading, setloading] = useState(false)
    const session = useSession()
    console.log(session?.user?.email)
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (data) => {
        try {
            setloading(true)
            const { error } = await supabase.from('addresses').insert([
                {
                    user_id: session?.user?.id, // Isko replace karna hoga actual user ID se
                    full_name: data.full_name,
                    phone_number: data.phone_number,
                    address: data.address,
                    city: data.city,
                    zip_code: data.zip_code,
                    country: data.country,
                }
            ])
            if (error) {
                console.error("Error inserting data:", error.message);
            } else {
            }
        } catch (err) {
            alert("Something went wrong!");
        }
        finally {
            setloading(false)
        }
    };

    return (
        <div className="mt-4 pt-10 sm:pt-20 mb-10 bg-gray-50">
            <div className=" w-full sm:w-[90%] md:w-[70%] mx-auto  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-medium mt-4 mb-5">Delivery Information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 text-sm  font-normal">Full Name</label>
                        <input
                            type="text"
                            {...register("full_name")}
                            defaultValue={session?.user?.email.split("@")[0]}
                            placeholder="Enter your full name"
                            className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
                        />
                        <p className="text-red-500">{errors.full_name?.message}</p>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block mb-2 text-sm font-normal">Phone Number</label>
                        <input
                            type="text"
                            defaultValue={session?.user?.phone}
                            {...register("phone_number")}
                            placeholder="Enter your phone number"
                            className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
                        />
                        <p className="text-red-500">{errors.phone_number?.message}</p>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-2 text-sm font-normal">Address</label>
                        <input
                            type="text"
                            {...register("address")}
                            placeholder="Enter your address"
                            className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
                        />
                        <p className="text-red-500">{errors.address?.message}</p>
                    </div>
                    {/* Country */}
                    <div>
                        <label className="block text-sm mb-2 font-normal">Country</label>
                        <select {...register("country")} className="w-full focus:outline-2 focus:outline-orange-400 border-2 border-[#f1f0f0] p-2 rounded">
                            <option value="">Select Country</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                        <p className="text-red-500">{errors.country?.message}</p>
                    </div>

                    {/* City Dropdown (Dynamic based on Country) */}
                    <div>
                        <label className="block text-sm mb-2 font-normal">City</label>
                        <select {...register("city")} className="w-full border-2 border-[#f1f0f0]  p-2 rounded">
                            <option className="text-gray-100" value="">Select City</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="New York">New York</option>
                            <option value="London">London</option>
                        </select>
                        <p className="text-red-500">{errors.city?.message}</p>
                    </div>


                    {/* Zip Code */}
                    <div>
                        <label className="block mb-2 text-sm font-normal">Zip Code</label>
                        <input
                            type="text"
                            {...register("zip_code")}
                            placeholder="Enter zip code"
                            className="w-full border-2 border-[#f1f0f0] focus:outline-2 focus:outline-orange-400 p-2 rounded"
                        />
                        <p className="text-red-500">{errors.zip_code?.message}</p>
                    </div>



                    {/* Submit Button */}
                    <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded w-full">
                       {loading? <CSpinner/> : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
