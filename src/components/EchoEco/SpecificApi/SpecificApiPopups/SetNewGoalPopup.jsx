import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cancel from "../../../../assets/squareCancel.svg";
import { editEchoEcoGoalById } from "../../../../store/actions/echoEcoAction";
import SuccessfulPopUp from "../../../SuccessfulPopup/SuccessfulPopUp";

const validate = (values) => {
  let error = {};
  console.log(values.goalAmount === 0, "values.goalAmount.length")
  if (!values.goalAmount) {
    error.goalAmount = "Amount can not be Zero or Empty";
  } else if((!/^\d+$/i.test(values.goalAmount))){
    error.goalAmount = "Only positive integer values"
  } else if(values.goalAmount.toString().length > 6){
    error.goalAmount = "Maximum 6 digit allowed"
  }
  if (!values.goalDays) {
    error.goalDays = "Days can not be Zero or Empty";
  } else if((!/^\d+$/i.test(values.goalDays))){
    error.goalDays = "Only positive integer values"
  } else if(values.goalDays.toString().length > 3){
    error.goalDays = "Maximum 3 digit allowed"
  }
  return error;
};

function SetNewGoalPopup({
  visible,
  onClose,
  apiId,
  getDailyEchoEcoDetail,
  isEdit,
  goalAmount,
  goalDays,
}) {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch();
  console.log(goalAmount, goalDays, "echoecodata");
  const formik = useFormik({
    initialValues: {
      goalAmount: goalAmount,
      goalDays: goalDays,
    },
    onSubmit: (values, { props, setSubmitting, setValues }) => {
      setSubmitting(true);
      dispatch(
        editEchoEcoGoalById({
          ...values,
          id: apiId,
          type: isEdit === true ? 3 : 1,
        })
      )
        .then((response) => {
          setIsSuccessful(true);
          setTimeout(() => {
            getDailyEchoEcoDetail(1);
            getDailyEchoEcoDetail(2);
            setSubmitting(false);
            // setValues(formik.initialValues);
            setIsSuccessful(false);
            onClose();
          }, 500);
        })
        .catch((error) => {setSubmitting(false);});
    },
    validate,
  });
  const onCloseSucessfulPopup = () => {
    setIsSuccessful(false);
  };
  const handleClose = (e) => {
    if (e.target.id === "setnewgoal-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="setnewgoal-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative w-1/3">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-5 h-5" src={cancel} alt="" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="api-endpoint"
            className="flex font-semibold text-xl text-[#404040] mb-2"
          >
            Set Goals{" "}
          </label>
          <div className="w-full my-4">
            <label
              htmlFor="goal-amount"
              className="flex font-semibold text-lg text-[#404040] mb-2"
            >
              Goal Amount
              {(formik.touched.goalAmount && formik.errors.goalAmount) ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.goalAmount}
              </div>
            ) : null}
            </label>
            <input
              id="goal-amount"
              type="number"
              className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium "
              placeholder="Amount"
              name="goalAmount"
              {...formik.getFieldProps("goalAmount")}
            />
          </div>
          <div className="w-full my-4">
            <label
              htmlFor="goal-days"
              className="flex font-semibold text-lg text-[#404040] mb-2"
            >
              Number of Days
              {(formik.touched.goalDays && formik.errors.goalDays) ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.goalDays}
              </div>
            ) : null}
            </label>
            <input
              id="goal-days"
              type="number"
              className="shadow-lg rounded-lg py-2 px-4 w-full text-xl font-medium"
              placeholder="Number of Days"
              name="goalDays"
              {...formik.getFieldProps("goalDays")}
            />
          </div>
          <div className="inset-x-12 bottom-5">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className=" rounded-[19px] py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-semibold text-[30px]"
            >
              Update Goal
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

export default SetNewGoalPopup;
