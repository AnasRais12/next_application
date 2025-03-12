import CSpinner from '@/components/CSpinner';
import CustomSpinner from '@/components/Spinner';
import UserQuery from '@/DbQuery/UserDetailQuery';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';

function AddressUpdate({setIsEditing,userDetails}) {
       const { updateUserDetails, } = UserQuery(); 
      const [loading,setLoading] = useState(false)
       const [updatedDetails, setUpdatedDetails] = useState({
        country: userDetails?.country || '',
        city: userDetails?.city || "",
        area: userDetails?.area || "",
        address: userDetails?.address || "",
        zip_code: userDetails?.zip_code || "",
        full_name: userDetails?.full_name || "",
        phone_number: userDetails?.phone_number || ""
    });
    const handleChange = (field, value) => {
        setUpdatedDetails((prevDetails) => ({
            ...prevDetails, // ✅ Purani values retain karo
            [field]: value  // ✅ Sirf ek field update karo
        }));
    };
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
       
    };



    console.log(userDetails,"--->")
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
    <div className="max-w-lg w-[90%] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className=" text-black py-4 px-4 sm:px-6 text-left flex justify-between items-center border-b-2 text-lg font-semibold">
           <h1> Edit Your Details </h1>
        <button onClick={()=> setIsEditing(false)} className='hover:text-[red] text-black text-[20px]'><RxCross2/></button>

        </div>

        {/* Form Container */}
        <div className="p-6 bg-gray-50 h-[70vh] overflow-y-auto">
            {/* Name */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Name</label>
                <input 
                    type="text" 
                    value={updatedDetails?.full_name} 
                    name='full_name'
                    defaultValue={userDetails?.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="text-black border border-gray-300 p-2 placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Phone Number</label>
                <input 
                    type="text" 
                    name='phone_number'
                    value={updatedDetails.phone_number} 
                    onChange={(e) => handleChange("phone_number", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Country</label>
                <input 
                    type="text" 
                    name='country'
                    value={updatedDetails?.country} 
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">City</label>
                <input 
                    type="text" 
                    value={updatedDetails.city} 
                    name='city'
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Area */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Area</label>
                <input 
                    type="text" 
                    name='area'
                    value={updatedDetails.area} 
                    onChange={(e) => handleChange("area", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Street */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Street</label>
                <input 
                    type="text" 
                    name='address'
                    value={updatedDetails.address} 
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Zip Code */}
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-gray-700 font-medium">Zip Code</label>
                <input 
                    type="text" 
                    name='zip_code'
                    value={updatedDetails.zip_code} 
                    onChange={(e) => handleChange("zip_code", e.target.value)}
                    className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Save Button */}
            <button 
                onClick={handleSave} 
                className="mt-4 w-full bg-unique text-white py-2 rounded-lg font-medium shadow-md transition-all"
            >
               {loading ? <CSpinner/> : 'Save Changes'} 
            </button>
        </div>
    </div>
</div>

  )
}

export default AddressUpdate