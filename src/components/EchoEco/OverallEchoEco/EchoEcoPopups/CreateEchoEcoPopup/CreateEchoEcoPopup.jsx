import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cancel from "../../../../../assets/squareCancel.svg";
import {
  createEchoEco,
  getEchoEcosByCompanyId,
} from "../../../../../store/actions/echoEcoAction";
import SuccessfulPopUp from "../../../../SuccessfulPopup/SuccessfulPopUp";

const validate = (values) => {
  let error = {};
  if (!values.apiName) {
    error.apiName = "Required";
  } else if (!/^[a-zA-Z ]*$/i.test(values.apiName)) {
    error.apiName = "Invalid Text Format";
  } else if (values.apiName.length > 15) {
    error.apiName = "Api name must be upto 15 character";
  }
  if (!values.goalAmount) {
    error.goalAmount = "Both fields are required";
  } else if (!/^\d+$/i.test(values.goalAmount)) {
    error.goalAmount = "Only positive integer values";
  } else if (values.goalAmount.toString().length > 6) {
    error.goalAmount = "Maximum 6 digit allowed";
  }
  if (!values.goalDays) {
    error.goalDays = "Both fields are required";
  } else if (!/^\d+$/i.test(values.goalDays)) {
    error.goalDays = "Only positive integer values";
  } else if (values.goalDays.toString().length > 3) {
    error.goalDays = "Maximum 3 digit allowed";
  }
  if (!values.ecoType) {
    error.ecoType = "Both fields are required";
  }
  if (!values.ecoPurpose) {
    error.ecoPurpose = "Both fields are required";
  }
  return error;
};

function CreateEchoEcoPopup({ visible, onClose, ecoPurposes, ecoTypes }) {
  const [isSuccessfulPopup, setIsSuccessfulPopup] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const dispatch = useDispatch();
  const onSuccessfullyCreated = () => {
    setIsSuccessfulPopup(true);
  };
  const onCloseSucessfulPopup = () => {
    setIsSuccessfulPopup(false);
  };
  const formik = useFormik({
    initialValues: {
      companyId: userInfo && userInfo.companyId,
      apiName: "",
      goalAmount: "",
      goalDays: "",
      ecoType: "",
      ecoPurpose: "",
    },
    onSubmit: (values, { props, setSubmitting, setValues }) => {
      setSubmitting(true);
      values = { ...values, companyId: userInfo.companyId };
      dispatch(createEchoEco(values))
        .then((response) => {
          onSuccessfullyCreated();
          dispatch(getEchoEcosByCompanyId({companyId: userInfo?.companyId, offset: 0}));
          setTimeout(() => {
            setSubmitting(false);
            onCloseSucessfulPopup();
            setValues(formik.initialValues);
            onClose();
          }, 500);
        })
        .catch((error) => {
          setSubmitting(false);
        });
    },
    validate,
  });
  const handleClose = (e) => {
    if (e.target.id === "createEcho-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="createEcho-container"
      onClick={handleClose}
      className="fixed z-20 inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-5 h-5" src={cancel} alt="" />
        </div>
        <div className="flex">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full my-3">
              <label
                htmlFor="api-name"
                className="flex font-semibold text-xl text-[#404040]"
              >
                Name of API{" "}
                {formik.touched.apiName && formik.errors.apiName ? (
                  <div className="text-red-500 ml-1 text-xs mt-2">
                    {formik.errors.apiName}
                  </div>
                ) : null}
              </label>
              <input
                type="text"
                id="api-name"
                className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium mt-4 mb-5"
                placeholder="Text Field upto 15 Character"
                name="apiName"
                maxLength={15}
                {...formik.getFieldProps("apiName")}
              />
            </div>
            <label
              htmlFor="set-goal"
              className="flex font-semibold text-xl text-[#404040]"
            >
              Set Goal{" "}
              {(formik.touched.goalAmount && formik.errors.goalAmount) ||
              (formik.touched.goalDays && formik.errors.goalDays) ? (
                <div className="text-red-500 ml-1 text-xs mt-2">
                  {formik.errors.goalDays}
                </div>
              ) : null}
            </label>
            <div className="flex w-full">
              <div className="mr-3">
                <input
                  type="number"
                  id="set-goal"
                  className="shadow-lg rounded-lg py-2 px-4 w-72 text-xl font-medium mt-4 mb-5"
                  placeholder="Goal Amount"
                  name="goalAmount"
                  {...formik.getFieldProps("goalAmount")}
                />
              </div>
              <div>
                <input
                  type="number"
                  id="set-goal"
                  className="shadow-lg rounded-lg py-2 px-4 w-72 text-xl font-medium mt-4 mb-5"
                  placeholder="Number of Days"
                  name="goalDays"
                  {...formik.getFieldProps("goalDays")}
                />
              </div>
            </div>
            <label
              htmlFor="choose-type"
              className="flex font-semibold text-xl text-[#404040] mb-2"
            >
              Choose Type{" "}
              {(formik.touched.ecoType && formik.errors.ecoType) ||
              (formik.touched.ecoPurpose && formik.errors.ecoPurpose) ? (
                <div className="text-red-500 ml-1 text-xs mt-2">
                  {formik.errors.ecoPurpose}
                </div>
              ) : null}
            </label>
            <div className="flex w-full">
              <div className="mr-3">
                <select
                  className="shadow-lg rounded-lg py-2 px-4 w-72 text-xl font-medium mt-4"
                  name="ecoType"
                  {...formik.getFieldProps("ecoType")}
                >
                  <option value="" disabled selected hidden>
                    Select Type
                  </option>
                  {ecoTypes.map((type, index) => {
                    return (
                      <option key={index} value={type.id}>
                        {type.ecoType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  className="shadow-lg rounded-lg py-2 px-4 w-72 text-xl font-medium mt-4"
                  name="ecoPurpose"
                  {...formik.getFieldProps("ecoPurpose")}
                >
                  <option value="" disabled selected hidden>
                    Select Purpose
                  </option>
                  {ecoPurposes.map((purpose, index) => {
                    return (
                      <option key={index} value={purpose.id}>
                        {purpose.ecoPurpose}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="inset-x-12 bottom-5 mt-5">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className=" rounded-[19px] py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-semibold text-[30px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessfulPopUp
        visible={isSuccessfulPopup}
        onClose={onCloseSucessfulPopup}
        message="created"
      />
    </div>
  );
}

export default CreateEchoEcoPopup;
