import { useState } from "react";

import countries from "../config/countries";

const usePhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
  const [error, setError] = useState("Select Country");

  const handleChange = (number) => {
    if (!/^[0-9]*$/.test(number)) return setError("Invalid Number");

    setError(false);
    setPhoneNumber(number);
  };

  const handleCode = (code) => {
    if (!/^[0-9]*$/.test(code) || code.length > 3) return;
    const newCountryInfo = { ...countryInfo };
    newCountryInfo.code = code;
    const country = countries.filter((c) => c.code === code);
    if (country.length > 0) {
      newCountryInfo.country = country[0].country;
      setError(false);
    } else newCountryInfo.country = setError("Invalid Number");
    setCountryInfo(newCountryInfo);
  };

  const handleCodeChange = (code) => {
    if (!/^[0-9]*$/.test(code) || code.length > 6) return;

    setCode(code);
  };

  return {
    handleChange,
    handleCode,
    handleCodeChange,
    error,
    setError,
    setCountryInfo,
    setPhoneNumber,
    setCode,
    countryInfo,
    phoneNumber,
    code,
  };
};

export default usePhoneVerification;
