import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editingCompanyProfile,
  userInfo,
} from "../../../../store/actions/authAction";
import SuccessfulPopUp from "../../../SuccessfulPopup/SuccessfulPopUp";

function EditAboutPopUp({ visible, onClose, aboutCompany }) {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      aboutCompany: aboutCompany,
    },
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      dispatch(editingCompanyProfile(values)).then((response) => {
        setIsSuccessful(true);
        dispatch(userInfo());
        setTimeout(() => {
          setSubmitting(false);
          setIsSuccessful(false);
          onClose();
        }, 500);
      });
    },
  });

  const onCloseSucessfulPopup = () => {
    setIsSuccessful(false);
  };

  const handleClose = (e) => {
    if (e.target.id === "edit-about-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="edit-about-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white w-3/6 rounded-2xl shadow-2xl p-4">
        <div className="font-semibold text-[#000000] text-[25px] ml-2 mb-6">
          Change About You
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="border-solid border-2 border-gray-400 rounded-xl w-full relative">
            <div className="px-3 py-2">
              {formik.values.aboutCompany ? (
                <textarea
                  className="w-full h-full bg-gray-100 outline-none rounded-lg px-2 py-1 font-normal text-[#000000] resize-none"
                  name="aboutCompany"
                  {...formik.getFieldProps("aboutCompany")}
                  rows="8"
                  col="65"
                  maxlength="700"
                ></textarea>
              ) : (
                <textarea
                  className="w-full h-full bg-gray-100 rounded-lg px-2 py-1 resize-none outline-none"
                  placeholder="Write something about company..."
                  name="aboutCompany"
                  {...formik.getFieldProps("aboutCompany")}
                  rows="8"
                  col="65"
                  maxlength="700"
                ></textarea>
              )}
            </div>
            <div className="absolute right-4 bottom-4">
              <span>
                {(formik.values &&
                  formik.values.aboutCompany &&
                  formik.values.aboutCompany.length) ||
                  0}
              </span>
              <span>/ 700</span>
            </div>
          </div>
          <div className="inset-x-14 bottom-5 mt-6">
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

export default EditAboutPopUp;
