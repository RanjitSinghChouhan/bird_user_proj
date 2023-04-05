import React, { useState, useEffect } from "react";
import bird from "../../../assets/Subtract.svg";
import pot from "../../../assets/signupPot.svg";
import openEye from "../../../assets/openEye.svg";
import crossEye from "../../../assets/crossEye.svg";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  getIndustrySector,
  userRegistration,
} from "../../../store/actions/authAction";
import { useNavigate } from "react-router";
import { useRef } from "react";
import Loader from "../../Loader/Loader";
import SimpleCrypto from "simple-crypto-js";
import { createSearchParams } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { fetchPlace } from "../../Profile/EditPopup/EditDetails/EditDetailsPopUp";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

const initialValues = {
  companyName: "",
  companyWebsite: "",
  companyAdminName: "",
  companyAddress: "",
  companyAdminEmail: "",
  companyAdminPassword: "",
  Confirm_companyAdminPassword: "",
  industrySector: "",
};

const validate = (values) => {
  let error = {};
  if (!values.companyName) {
    error.companyName = "Required";
  } else if (!/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.companyName)) {
    error.companyName = "Invalid Text Format";
  }
  if (!values.companyWebsite) {
    error.companyWebsite = "Required";
  } else if (
    !/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i.test(
      values.companyWebsite
    )
  ) {
    error.companyWebsite = "Invalid Text Format";
  }
  if (!values.industrySector) {
    error.industrySector = "Required";
  }
  if (!values.companyAdminName) {
    error.companyAdminName = "Required";
  } else if (
    !/^[a-zA-Z]+$|^[a-zA-Z]+ [a-zA-Z]+$/i.test(values.companyAdminName)
  ) {
    error.companyAdminName = "Invalid Text Format";
  }
  if (!values.companyAddress) {
    error.companyAddress = "Required";
  }
  if (!values.companyAdminEmail) {
    error.companyAdminEmail = "Required";
  } else if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+$/i.test(values.companyAdminEmail)) {
    error.companyAdminEmail = "Incorrect email address";
  }
  if (!values.companyAdminPassword) {
    error.companyAdminPassword = "Required";
  } else if (
    !/^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.companyAdminPassword
    )
  ) {
    error.companyAdminPassword =
    "Between 8 to 16 with 1 capital, 1 numeric and 1 character (!@#$%^&*)";
  } else if (
    values.companyAdminPassword.length <= 7 ||
    values.companyAdminPassword.length > 16
  ) {
    error.companyAdminPassword = "Password should between 8 to 16 character";
  }
  if (!values.Confirm_companyAdminPassword) {
    error.companyAdminPassword_confirmation = "Required";
  } else if (
    values.Confirm_companyAdminPassword !== values.companyAdminPassword
  ) {
    error.Confirm_companyAdminPassword = "Passwords does not match";
  }
  return error;
};

function Signup() {
  const dispatch = useDispatch();
  const [getIndustrySectors, setGetIndustrySectors] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [cnfmPasswordType, setCnfmPasswordType] = useState("password");
  const navigate = useNavigate();
  const isLoading = useRef(false);
  const [locationSearch, setLocationSearch] = useState('')
  const [disableChange, setDisableChange] = useState(false)
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      isLoading.current = true;
      values.Confirm_companyAdminPassword = simpleCrypto.encrypt(
        values.Confirm_companyAdminPassword
      );
      values.companyAdminPassword = simpleCrypto.encrypt(
        values.companyAdminPassword
      );
      values.companyAdminEmail = values.companyAdminEmail.toLowerCase();
      dispatch(userRegistration(values))
        .then((response) => {
          if (response.data.status === false) {
            setErrorMsg(response.data.message);
            setSubmitting(false);
            isLoading.current = false;
          } else {
            setSubmitting(false);
            isLoading.current = false;
            navigate({
              pathname: "/registrationSuccessful",
              search: createSearchParams({
                companyAdminEmail: values.companyAdminEmail,
              }).toString(),
            });
          }
        })
        .catch((error) => {
          isLoading.current = false;
          setSubmitting(false);
          alert(error);
        });
    },
    validate,
  });

  const handleShowPassword = (info) => {
    info === 1
      ? passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password")
      : cnfmPasswordType === "password"
      ? setCnfmPasswordType("text")
      : setCnfmPasswordType("password");
  };

  const debouncedLocation = useDebounce(locationSearch, 400);

  useEffect(() => {
    dispatch(getIndustrySector()).then((response) => {
      setGetIndustrySectors(response.industrySector);
    });
    if (debouncedLocation) {
      handleAddressChange()
    }
  }, [dispatch, debouncedLocation]);


  const handleAddressChange = async () => {
    formik.values.companyAddress = locationSearch;

    const res = await fetchPlace(formik.values.companyAddress);
    !autocompleteCities.includes(locationSearch) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  return (
    <div className="flex min-h-screen relative">
      {isLoading.current ? <Loader /> : ""}
      <div className="w-2/4 pl-4 pt-2 flex items-center">
        <div>
          <div className="absolute top-2 left-1 cursor-pointer" onClick={() => navigate("/")}>
            <img src={bird} alt="" />
          </div>
          <div className="flex justify-center mb-16 mt-10">
            <img src={pot} alt="" />
          </div>
          <div className="font-bold text-4xl GreenGradient px-8 py-6">
            Build A Cleaner Future And Greener Earth
          </div>
        </div>
      </div>
      <div className="w-2/4 bg-[#6DB935] bg-opacity-60 text-white flex md:items-center">
        <div className="mx-32 my-36 md:w-full">
          <div className="font-medium text-3xl mb-9">
            Register Your Company With Byrds
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3.5 relative">
              {formik.touched.companyName && formik.errors.companyName ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">{formik.errors.companyName}</div>
              ) : null}
              <input
                type="text"
                placeholder="Company name"
                name="companyName"
                {...formik.getFieldProps("companyName")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.companyWebsite && formik.errors.companyWebsite ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.companyWebsite}
                </div>
              ) : null}
              <input
                type="text"
                placeholder="Enter Company Website"
                name="companyWebsite"
                {...formik.getFieldProps("companyWebsite")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.industrySector && formik.errors.industrySector ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.industrySector}
                </div>
              ) : null}
              <select
                name="industrySector"
                {...formik.getFieldProps("industrySector")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              >
                <option value="" disabled selected>
                  Choose Industry Sector
                </option>
                {getIndustrySectors &&
                  getIndustrySectors.map((data) => {
                    return (
                      <option
                        className="bg-[#6DB935] bg-opacity-0 text-gray-300 py-2 w-full border-0 border-b-2 focus:outline-none"
                        key={data.id}
                        value={data.id}
                      >
                        {data.sectorOfIndustry}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.companyAdminName &&
              formik.errors.companyAdminName ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.companyAdminName}
                </div>
              ) : null}
              <input
                type="text"
                name="companyAdminName"
                placeholder="Enter Admin name"
                {...formik.getFieldProps("companyAdminName")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5 relative">
                  {autocompleteErr && (
                    <span className="inputError text-red-400 font-normal text-[11px]">
                      {autocompleteErr}
                    </span>
                  )}{formik.errors.companyName ? (
                    <div style={{ color: "red" }}>{formik.errors.companyName}</div>
                  ) : null}
                <input
                  list="places"
                  type="text"
                  id="change-loc"
                  className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
                  placeholder="Select Location"
                  name="companyAddress"
                  value={locationSearch}
                  onKeyDown={(e) => {
                    if (e.key == 'Backspace') {
                      setDisableChange(true)
                    }
                    else {
                      setDisableChange(false)
                    }
                  }}
                  onChange={(e) => !disableChange ? setLocationSearch(e.target.value) : {}}
                // pattern={autocompleteCities.join("|")}
                />
                <datalist id="places">
                  {autocompleteCities.map((city, i) => (
                    <option key={i} onClick={() => console.log(city)}>{city}</option>
                  ))}
                </datalist>
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.companyAdminEmail &&
              formik.errors.companyAdminEmail ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.companyAdminEmail}
                </div>
              ) : null}
              <input
                type="email"
                name="companyAdminEmail"
                placeholder="Enter Admin Email"
                {...formik.getFieldProps("companyAdminEmail")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-3.5 relative">
              {formik.touched.companyAdminPassword &&
              formik.errors.companyAdminPassword ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.companyAdminPassword}
                </div>
              ) : null}
              <input
                type={passwordType}
                name="companyAdminPassword"
                placeholder="Enter Password"
                {...formik.getFieldProps("companyAdminPassword")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
              {passwordType === "password" ? <img
                  onClick={() => handleShowPassword(1)}
                  src={openEye}
                  alt="crossEye"
                  className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                /> : <img
                onClick={() => handleShowPassword(1)}
                src={crossEye}
                alt="crossEye"
                className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
              />}
            </div>
            <div className="relative">
              {formik.touched.Confirm_companyAdminPassword &&
              formik.errors.Confirm_companyAdminPassword ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.Confirm_companyAdminPassword}
                </div>
              ) : null}
              <input
                type={cnfmPasswordType}
                name="Confirm_companyAdminPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("Confirm_companyAdminPassword")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
              {cnfmPasswordType === "password" ? <img
                  onClick={() => handleShowPassword(2)}
                  src={openEye}
                  alt="crossEye"
                  className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                /> : <img
                onClick={() => handleShowPassword(2)}
                src={crossEye}
                alt="crossEye"
                className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
              />}
            </div>
            {errorMsg ? <div style={{ color: "red" }}>{errorMsg}</div> : null}
            <div className="mt-[60px]">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 rounded-lg"
              >
                Signup
              </button>
              <div className="ml-16 mt-2 text-normal">
                Already have an account?{" "}
                <a href="/login" className="border-0 border-b-2">
                  Login for free
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
