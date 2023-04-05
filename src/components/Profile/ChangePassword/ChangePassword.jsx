import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import bird from "../../../assets/Subtract.svg";
import closeEye from "../../../assets/closeEye.svg";
import { useSearchParams } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../store/actions/authAction";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

const initialValues = {
  oldPassword: "",
  newPassword: "",
  Confirm_newPassword: "",
};

const validate = (values) => {
  let error = {};
  if (!values.oldPassword) {
    error.oldPassword = "Required";
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.oldPassword
    )
  ) {
    error.oldPassword =
      "Between 8 to 16 with 1 capital, 1 numeric and 1 character (!@#$%^&*)";
  } else if (values.oldPassword.length <= 7 || values.oldPassword.length > 16) {
    error.oldPassword = "Password should between 8 to 16 character";
  }
  if (!values.newPassword) {
    error.newPassword = "Required";
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(
      values.newPassword
    )
  ) {
    error.newPassword =
      "Between 8 to 16 with 1 capital, 1 numeric and 1 character (!@#$%^&*)";
  } else if (values.newPassword.length <= 7 || values.newPassword.length > 16) {
    error.newPassword = "Password should between 8 to 16 character";
  }
  if (!values.Confirm_newPassword) {
    error.Confirm_newPassword = "Required";
  } else if (values.Confirm_newPassword !== values.newPassword) {
    error.Confirm_newPassword = "Passwords does not match";
  }
  return error;
};

function ChangePassword() {
  const navigate = useNavigate();
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [passwordType, setPasswordType] = useState("password");
  const [confmPasswordType, setConfmPasswordType] = useState("password");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      values.oldPassword = simpleCrypto.encrypt(values.oldPassword);
      values.newPassword = simpleCrypto.encrypt(values.newPassword);
      dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      )
        .then((response) => {
          if (response.data.status === false) {
            setErrorMsg(response.data.message);
          } else {
            localStorage.setItem('token', '')
            navigate("/resetSuccessful");
          }
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          setErrorMsg(error);
        });
    },
    validate,
  });
  const handleShowPassword = (info) => {
    info === 1
      ? oldPasswordType === "password"
        ? setOldPasswordType("text")
        : setOldPasswordType("password")
      : info === 2
      ? passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password")
      : confmPasswordType === "password"
      ? setConfmPasswordType("text")
      : setConfmPasswordType("password");
  };
  return (
    <div>
      <div>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Change Password
          </div>
          <div className="font-normal text-[#000000] text-2xl mb-20">
            Your new password must be different from <br /> previous used
            password
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-7 flex relative">
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <div
                    className="text-left absolute bottom-10 text-xs"
                    style={{ color: "red" }}
                  >
                    {formik.errors.oldPassword}
                  </div>
                ) : null}
                <input
                  type={oldPasswordType}
                  name="oldPassword"
                  placeholder="Old Password"
                  {...formik.getFieldProps("oldPassword")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm "
                />
                <img
                  onClick={() => handleShowPassword(1)}
                  src={closeEye}
                  alt="closeEye"
                  className="absolute cursor-pointer right-4 top-2 bg-white pl-2"
                />
              </div>
              <div className="mb-7 flex relative">
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div
                    className="text-left absolute bottom-10 text-xs"
                    style={{ color: "red" }}
                  >
                    {formik.errors.newPassword}
                  </div>
                ) : null}
                <input
                  type={passwordType}
                  name="newPassword"
                  placeholder="New Password"
                  {...formik.getFieldProps("newPassword")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm "
                />
                <img
                  onClick={() => handleShowPassword(2)}
                  src={closeEye}
                  alt="closeEye"
                  className="absolute cursor-pointer right-4 top-2 bg-white pl-2"
                />
              </div>
              <div className="relative">
                {formik.touched.Confirm_newPassword &&
                formik.errors.Confirm_newPassword ? (
                  <div
                    className="text-left absolute bottom-10 text-xs"
                    style={{ color: "red" }}
                  >
                    {formik.errors.Confirm_newPassword}
                  </div>
                ) : null}
                <input
                  type={confmPasswordType}
                  name="Confirm_newPassword"
                  placeholder="Re-enter New Password"
                  {...formik.getFieldProps("Confirm_newPassword")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm"
                />
                <img
                  onClick={() => handleShowPassword(3)}
                  src={closeEye}
                  alt="closeEye"
                  className="absolute cursor-pointer right-4 top-2 bg-white pl-2"
                />
              </div>
              {errorMsg ? (
                <div className="text-left" style={{ color: "red" }}>
                  {errorMsg}
                </div>
              ) : null}
              <div className="mt-16">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-bold text-[22px] text-white py-[14px] rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div
            onClick={() => navigate("/login")}
            className="hover:underline cursor-pointer font-medium text-[#FFC145] text-2xl mt-12"
          >
            Login Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
