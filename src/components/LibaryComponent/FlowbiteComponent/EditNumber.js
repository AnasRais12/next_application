import CSpinner from "@/components/CSpinner";
import React, { useState } from "react";
const PhoneNumberModal = ({ setChangeNameModal, handleNameChange, setPhoneNumber, changeNameModal, loading, PhoneNumber, heading, type, plaecholder, setNewName }) => {

  const CloseButton = () => {
    // Handle phone number update here
    if (changeNameModal) {
      setChangeNameModal(false)
    }
    else {
      setPhoneNumber(false)
    }
  };

  const handleInputChange = (e) => {
    if (changeNameModal) {
      setNewName(e.target.value);
    } else {
      setPhoneNumber(e.target.value);
    }
  };



  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center `}
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-normal mb-4">{heading}</h2>
        <input
          type={type}
          // value={phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-4"
          placeholder={plaecholder}
        />
        <div className="flex justify-end">
          <button onClick={CloseButton} className="mr-4  bg-orange-600 px-3 text-white py-2 rounded-lg  hover:text-gray-700">Cancel</button>
          <button onClick={handleNameChange} className="bg-blue-500 text-white py-2 px-4 rounded-lg">{loading ? <CSpinner /> : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;