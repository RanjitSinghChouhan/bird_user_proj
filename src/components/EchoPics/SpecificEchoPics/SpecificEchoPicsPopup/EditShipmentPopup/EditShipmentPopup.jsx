import { useFormik } from "formik";
import React from "react";
import cancel from "../../../../../assets/squareCancel.svg";

function EditShipmentPopup({ visible, onClose }) {
  const formik = useFormik({
    initialValues: {
      echoName: "",
      cardType: "",
      quantity: "",
      freq: "",
    },
    onSubmit: (values, { props, setSubmitting, setValues }) => {
      console.log(values, "values");
      setSubmitting(false);
    },
    validate: (values) => {
      let error = {};
      if (!values.echoName) {
        error.echoName = "Required";
      } else if (!/^[a-zA-Z ]*$/i.test(values.echoName)) {
        error.echoName = "Invalid Text Format";
      }
      if (!values.cardType) {
        error.cardType = "Required";
      }
      if (!values.quantity) {
        error.quantity = "Required";
      }
      if (!values.freq) {
        error.freq = "Required";
      }
      return error;
    },
  });
  const handleClose = (e) => {
    if (e.target.id === "edit-shipment-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="edit-shipment-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl w-2/5 shadow-2xl p-4 relative">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-5 h-5" src={cancel} alt="" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full my-3">
            <label
              htmlFor="echo-name"
              className="flex font-semibold text-xl text-[#404040]"
            >
              Name{" "}
              {formik.touched.echoName && formik.errors.echoName ? (
                <div className="text-red-500 ml-1 text-xs mt-2">
                  {formik.errors.echoName}
                </div>
              ) : null}
            </label>
            <input
              type="text"
              id="echo-name"
              className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium mt-4 mb-5"
              placeholder="Echo Name"
              name="echoName"
              {...formik.getFieldProps("echoName")}
            />
          </div>
          <label
            htmlFor="card-type"
            className="flex font-semibold text-xl text-[#404040]"
          >
            Type{" "}
            {(formik.touched.cardType && formik.errors.cardType) ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.cardType}
              </div>
            ) : null}
          </label>
          <div className="flex w-full">
            <input
              type="text"
              id="card-type"
              className="shadow-lg rounded-lg  py-2 px-4 w-full text-xl font-medium mt-4 mb-5"
              placeholder="Non ADH Card"
              name="cardType"
              {...formik.getFieldProps("cardType")}
            />
          </div>
          <label
            htmlFor="frquancy"
            className="flex font-semibold text-xl text-[#404040] mb-2"
          >
            Frequency{" "}
            {(formik.touched.freq && formik.errors.freq) ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.freq}
              </div>
            ) : null}
          </label>
          <div className="w-full">
            <select
               id="frquancy"
              className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium mt-4"
              name="freq"
              {...formik.getFieldProps("freq")}
            >
              {["Weekly", "Fortnightly", "Monthly"].map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <label
            htmlFor="quant"
            className="flex font-semibold text-xl text-[#404040]"
          >
            Quantity{" "}
            {(formik.touched.quantity && formik.errors.quantity) ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.quantity}
              </div>
            ) : null}
          </label>
          <div className="flex w-full">
            <input
              type="number"
              id="quant"
              className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium mt-4 mb-5"
              placeholder="Quantity"
              name="quantity"
              {...formik.getFieldProps("quantity")}
            />
          </div>
          <div className="inset-x-12 bottom-5 mt-5">
            <button
              type="submit"
              className=" rounded-lg py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-semibold text-[30px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditShipmentPopup;
