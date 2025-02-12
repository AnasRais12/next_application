import CSpinner from "@/components/CSpinner";
import React, { useState } from "react"
import axios from "axios";



const PhoneNumberModal = ({
  setChangeNameModal,
  handlePhoneNumber,
  label,
  setNewPhoneNumber,
  handleNameChange,
  setPhone,
  changeNameModal,
  loading,
  PhoneNumber,
  heading,
  type,
  placeholder, // Fixed the typo here
  setNewName
}) => {

  const CloseButton = () => {
    // Handle phone number update here
    if (changeNameModal) {
      setChangeNameModal(false)
    }
    else {
      setPhone(false)
    }
  };





  const handleInputChange = (e) => {
    if (changeNameModal) {
      setNewName(e.target.value)
    }
    else {
      setNewPhoneNumber(e.target.value)
    }
  };




  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center `}
    >
      <div className="bg-white rounded-lg  w-[95%] max-w-md p-3 md:p-6">
        <h2 className="sm:text-2xl text-1xl font-normal mb-3 sm:mb-4">{heading}</h2>
        <label className="text-[15px]">{label}:</label>
        <input
          type={type}
          // value={changeNameModal? }
          onChange={handleInputChange}
          className="w-full p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-2 sm:mb-4"
          placeholder={placeholder}
        />
        <div className="flex sm:flex-row sm:gap-2 gap-2 flex-col justify-end">
          <button onClick={CloseButton} className=" bg-orange-600 px-3 text-white sm:py-2 py-1 rounded-lg  hover:text-gray-700">Cancel</button>

          <button onClick={changeNameModal ? handleNameChange : handlePhoneNumber} className="bg-blue-500 text-white sm:py-2 py-1 px-4 rounded-lg">{loading ? <CSpinner /> : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;