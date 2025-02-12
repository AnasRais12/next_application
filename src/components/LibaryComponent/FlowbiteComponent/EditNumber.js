import CSpinner from "@/components/CSpinner";
import React, { useState } from "react"
import axios from "axios";



const PhoneNumberModal = ({
  setChangeNameModal,
  label,
  handleNameChange,
  setPhoneNumber,
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
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetching countries and their phone codes
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2, // Using cca2 for country code
          phoneCode: country.idd ? `+${country.idd.root}${country.idd.suffixes[0]}` : "+1", // Defaulting to +1 if not found
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle country code change
  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  // Handle phone number change
  // const handlePhoneNumberChange = (e) => {
  //   // setPhoneNumber(e.target.value);
  // };




  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center `}
    >
      <div className="bg-white rounded-lg  w-[95%] max-w-md p-3 md:p-6">
        <h2 className="sm:text-2xl text-1xl font-normal mb-3 sm:mb-4">{heading}</h2>
        <label className="text-[15px]">{label}:</label>
        {/* <input
          type={type}
          // value={phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-2 sm:mb-4"
          placeholder={plaecholder}
        /> */}
        <div className="flex flex-col sm:flex-row items-center space-x-2">
      {/* Country Code Selector */}
      <select
        value={selectedCountryCode}
        onChange={handleCountryCodeChange}
        className="w-full sm:w-auto p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-2 sm:mb-4"
      >
        {countries.map((country, index) => (
          <option key={index} value={country.phoneCode}>
            {country.name} ({country.phoneCode})
          </option>
        ))}
      </select>

      {/* Phone Number Input */}
      <input
        type="text"
        value={phoneNumber}
        // onChange={handlePhoneNumberChange}
        className="w-full p-2 border-2 focus:border-orange-600 border-[#ccc] rounded-md mb-2 sm:mb-4"
        placeholder={`Enter phone number`}
      />
    </div>
        <div className="flex sm:flex-row sm:gap-2 gap-2 flex-col justify-end">
          <button onClick={CloseButton} className=" bg-orange-600 px-3 text-white sm:py-2 py-1 rounded-lg  hover:text-gray-700">Cancel</button>
          <button onClick={handleNameChange} className="bg-blue-500 text-white sm:py-2 py-1 px-4 rounded-lg">{loading ? <CSpinner /> : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;