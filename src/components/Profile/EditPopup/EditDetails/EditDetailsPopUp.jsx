import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import upload from "../../../../assets/uploadImg.svg";
import { useDispatch } from "react-redux";
import {
  editingCompanyProfile,
  userInfo,
} from "../../../../store/actions/authAction";
import SuccessfulPopUp from "../../../SuccessfulPopup/SuccessfulPopUp";
import { FileUploader } from "react-drag-drop-files";
import useDebounce from "../../../../hooks/useDebounce";

function formatString(event) {
  // var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{4})$/g,
      "$1/$2" // 141 > 01/41
    )
    // .replace(
    //   /^([0]+)\/|[000]+$/g,
    //   "0" // 0/ > 0 and 00 > 0
    // )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

export const fetchPlace = async (text) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve places" };
  }
};

const uploadImage = async (image) => {
  let data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "feddUp");
  data.append("cloud_name", "feddup");
  const resp = await fetch(
    `https://api.cloudinary.com/v1_1/feddup/image/upload`,
    { method: "post", body: data }
  );
  let res = await resp.json();
  return res.secure_url;
};

const validate = (values) => {
  let error = {}
  if (!values.companyAddress) {
    error.companyAddress = "Required"
  }
  return error;
}

function EditDetailsPopUp({
  visible,
  onClose,
  companyAddress,
  companyAdminName,
  companyPhone,
  companyYearOfEstablishment,
  companyEmployeeScale,
  companyIcon,
  companyName,
}) {
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch();
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [image, setImage] = useState("");
  const [locationSearch, setLocationSearch] = useState('')
  const [disableChange, setDisableChange] = useState(false)

  const formik = useFormik({
    initialValues: {
      companyAddress: companyAddress,
      companyAdminName: companyAdminName,
      companyPhone: companyPhone,
      companyYearOfEstablishment: companyYearOfEstablishment,
      companyEmployeeScale: companyEmployeeScale || "0-10",
      companyIcon: companyIcon,
    },
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      dispatch(editingCompanyProfile(values)).then((response) => {
        setIsSuccessful(true);
        setLocationSearch('');
        dispatch(userInfo());
        setTimeout(() => {
          setSubmitting(false);
          setIsSuccessful(false);
          onClose();
        }, 500);
      });
    },
    validate
  });

  const handleChange = async (file) => {
    if (file) {
      const res = await uploadImage(file);
      if (res) {
        formik.values.companyIcon = res;
        setImage(res);
      }
    }
  };

  const onCloseSucessfulPopup = () => {
    setIsSuccessful(false);
  };

  const noOfEmployees = [
    "0-10",
    "10-50",
    "50-100",
    "100-500",
    "500-1000",
    "1000+",
  ];

  const debouncedLocation = useDebounce(locationSearch, 400);

  useEffect(() => {
    if (debouncedLocation) {
      handleAddressChange()
    }
  }, [debouncedLocation])


  const handleAddressChange = async () => {
    formik.values.companyAddress = locationSearch;

    const res = await fetchPlace(formik.values.companyAddress);
    !autocompleteCities.includes(locationSearch) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleClose = (e) => {
    if (e.target.id === "edit-details-container") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="edit-details-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white w-7/12 rounded-2xl shadow-2xl p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex mb-7">
            <div className="px-6 mr-6">
              <div className="font-semibold text-[25px] text-center ml-2">
                Change Details
              </div>
              <div className="shadow-2xl w-[190px] h-[190px] mx-auto rounded-2xl my-2">
                <div className="px-3 py-8 text-center">
                  {formik.values.companyIcon ? (
                    <div className="rounded-xl">
                      <img
                        className="rounded-xl"
                        src={image || formik.values.companyIcon}
                        alt=""
                      />
                    </div>
                  ) : (
                    <>
                      <img className="mx-auto py-5" src={upload} alt="" />
                      <div className="font-semibold text-xs text-[#000000]">
                        Upload your company logo
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="">
                <FileUploader
                  id="imgInput"
                  classes="cursor-pointer "
                  handleChange={handleChange}
                  name="companyIcon"
                  {...formik.getFieldProps("companyIcon")}
                  types={fileTypes}
                >
                  <div className="flex text-xs bg-white text-center shadow-xl rounded-lg py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403"
                        stroke="#696969"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0215 2.19057V14.2316"
                        stroke="#696969"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.10645 5.11877L12.0214 2.19077L14.9374 5.11877"
                        stroke="#696969"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="font-semibold text-lg text-[696969] w-full mr-2">
                      Upload New Logo
                    </div>
                  </div>
                </FileUploader>
              </div>
            </div>
            <div>
              <div className="w-full my-3">
                <label
                  htmlFor="company-name"
                  className="font-semibold text-xl text-[#404040]"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-[#858181] text-xl mt-4 mb-5"
                  name="companyName"
                  value={companyName}
                  disabled
                />
              </div>
              <div className="w-full my-3 relative">
                <label
                  htmlFor="change-loc"
                  className="font-semibold text-xl text-[#404040]"
                >
                  Change Location
                  {autocompleteErr && (
                    <span className="inputError text-red-400 font-normal text-[11px]">
                      {autocompleteErr}
                    </span>
                  )}{formik.errors.companyName ? (
                    <div style={{ color: "red" }}>{formik.errors.companyName}</div>
                  ) : null}
                </label>
                <br />
                <input
                  list="places"
                  type="text"
                  id="change-loc"
                  className="shadow-lg rounded-lg py-2 px-4 pr-8 w-full font-medium text-xl mt-4 mb-5 custom-list-input"
                  placeholder="Select Location"
                  name="companyAddress"
                  value={locationSearch || formik.values.companyAddress}
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
                    <option key={i}>{city}</option>
                  ))}
                </datalist>
                {formik.values.companyAddress ? (
                  <div
                    className="absolute top-14 text-red-500 right-2 cursor-pointer"
                    onClick={() => {
                      setLocationSearch('')
                      formik.setFieldValue("companyAddress", "", false)
                    }
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex w-full my-3">
                <div className="mr-2">
                  <label
                    htmlFor="change-admin-name"
                    className="font-semibold text-xl text-[#404040] mb-6"
                  >
                    Change Admin Name
                  </label>
                  <br />
                  <input
                    type="text"
                    id="change-admin-name"
                    className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-xl mt-4 mb-5 mr-5"
                    placeholder="Enter Admin Name"
                    name="companyAdminName"
                    {...formik.getFieldProps("companyAdminName")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="change-phone"
                    className="font-semibold text-xl text-[#404040] mb-6"
                  >
                    Update Phone no.
                  </label>
                  <br />
                  <input
                    type="text"
                    id="change-phone"
                    className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-xl mt-4 mb-5"
                    placeholder="Enter Phone No."
                    name="companyPhone"
                    {...formik.getFieldProps("companyPhone")}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="mr-2">
                  <label
                    htmlFor="change-establish"
                    className="font-semibold text-xl text-[#404040] mb-6"
                  >
                    Established in
                  </label>
                  <br />
                  <input
                    maxLength="7"
                    placeholder="MM/YYYY"
                    type="text"
                    id="change-establish"
                    className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-xl mt-4"
                    name="companyYearOfEstablishment"
                    {...formik.getFieldProps("companyYearOfEstablishment")}
                    onKeyUp={(e) => formatString(e)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="change-employees"
                    className="font-semibold text-xl text-[#404040] mb-6"
                  >
                    No.of employees
                  </label>
                  <br />
                  <select
                    id="change-employees"
                    className="shadow-lg rounded-lg py-2 px-4 w-56 font-medium text-xl mt-4 "
                    name="companyEmployeeScale"
                    {...formik.getFieldProps("companyEmployeeScale")}
                  >
                    {noOfEmployees.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="inset-x-12 bottom-5">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className=" rounded-lg py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-semibold text-[30px] text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <SuccessfulPopUp
        visible={isSuccessful}
        onClose={onCloseSucessfulPopup}
        message="updated"
      />
    </div>
  );
}

export default EditDetailsPopUp;
