import React, { useRef, useState } from "react";
import bird from "../../../assets/Subtract.svg";
import leftImg from "../../../assets/loginImg.svg";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/actions/authAction";
import { useNavigate } from "react-router";
import Loader from "../../Loader/Loader";
import SimpleCrypto from "simple-crypto-js";
import openEye from "../../../assets/openEye.svg";
import crossEye from "../../../assets/crossEye.svg";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

const initialValues = {
  companyAdminEmail: "",
  companyAdminPassword: "",
  // rememberMe: false,
};

const validate = (values) => {
  let error = {};
  if (!values.companyAdminEmail) {
    error.companyAdminEmail = "Required";
  } else if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+$/i.test(values.companyAdminEmail)) {
    error.companyAdminEmail = "Incorrect email address";
  }
  if (!values.companyAdminPassword) {
    error.companyAdminPassword = "Required";
  } else if (!/.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/i.test(values.companyAdminPassword)) {
    error.companyAdminPassword = "Between 8 to 16 with 1 capital, 1 numeric and 1 character (!@#$%^&*)";
    } else if (
      values.companyAdminPassword.length <= 7 ||
      values.companyAdminPassword.length > 16
    ) {
      error.companyAdminPassword = "Password should between 8 to 16 character";
  }
  return error;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      setIsLoading(true)
      values.companyAdminPassword = simpleCrypto.encrypt(
        values.companyAdminPassword
      );
      values.companyAdminEmail = values.companyAdminEmail.toLowerCase();
      dispatch(loginUser(values))
        .then((response) => {
          if (response.status === false) {
            setErrorMsg(response.message);
            setSubmitting(false);
            setIsLoading(false)
          } else {
            localStorage.setItem("token", response.accessToken);
            setSubmitting(false);
            setIsLoading(false)
            window.location.pathname = "/dashboard"
            // navigate("/dashboard");
          }
        })
        .catch((error) => {
          setIsLoading(false)
          setSubmitting(false);
          alert(error);
        });
      
    },
    validate,
  });

  const handleShowPassword = () => {
      passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password")
  };

  return (
    <div className="flex min-h-screen relative">
      {isLoading ? <Loader /> : ""}
      <div className="w-2/4 pl-4 pt-2 flex md:items-center">
        <div>
          <div className="mb-10 absolute top-2 left-1 cursor-pointer" onClick={() => navigate("/")}>
            <img src={bird} alt="" />
          </div>
          <div className="flex justify-center mb-14 mt-28">
            <img src={leftImg} alt="" />
          </div>
          <div className="font-bold text-4xl GreenGradient px-8">
            Helping Build A Cleaner And Greener Earth
          </div>
        </div>
      </div>
      <div className="w-2/4 bg-[#6DB935] bg-opacity-60 text-white flex md:items-center">
        <div className="mx-32 my-36 md:w-full">
          <div className="font-medium text-3xl mb-2.5">
            Login To Byrds Portal
          </div>
          <div className="mb-9">Welcome back! Please enter your details.</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 relative">
              {formik.touched.companyAdminEmail &&
              formik.errors.companyAdminEmail ? (
                <div style={{ color: "red" }} className="text-left text-xs absolute bottom-8">
                  {formik.errors.companyAdminEmail}
                </div>
              ) : null}
              <input
                type="email"
                name="companyAdminEmail"
                placeholder="Enter Your Email"
                {...formik.getFieldProps("companyAdminEmail")}
                className="bg-[#6DB935] bg-opacity-0 placeholder-white py-2 w-full border-0 border-b-2 focus:outline-none"
              />
            </div>
            <div className="mb-4 relative">
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
                  onClick={handleShowPassword}
                  src={openEye}
                  alt="crossEye"
                  className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                /> : <img
                onClick={handleShowPassword}
                src={crossEye}
                alt="crossEye"
                className="absolute cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
              />}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <div className="flex">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  {...formik.getFieldProps("rememberMe")}
                  className="bg-[#6DB935] bg-opacity-0 mr-1 focus:outline-none cursor-pointer"
                />{" "}
                <label htmlFor="remember">Remember for 30 days</label>
              </div>
              <a href="/forgotPassword" className="border-0 border-b-2">
                Forgot Password
              </a>
            </div>
            {errorMsg ? <div style={{ color: "red" }} className="text-left text-xs bottom-8">{errorMsg}</div> : null}
            <div className="mt-16">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-2xl text-white py-[14px] rounded-lg"
              >
                Login
              </button>
              <div className="ml-16 mt-3.5 text-normal">
                Don't have an account?{" "}
                <a href="/signup" className="border-0 border-b-2">
                  Signup Now
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
