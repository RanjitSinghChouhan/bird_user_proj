import { lazy } from "react";
const paymentHistory = lazy(() =>
  import("../components/Transactions/PaymentHistory/PaymentHistory")
);
const signup = lazy(() => import("../components/Auth/Signup/Signup"));
const profile = lazy(() => import("../components/Profile/Profile"));
const leaderBoard = lazy(() => import("../components/LeaderBoard/LeaderBoard"));
const login = lazy(() => import("../components/Auth/Login/Login"));
const specificApi = lazy(() =>
  import("../components/EchoEco/SpecificApi/SpecificApi")
);
const landingPage = lazy(() => import("../components/LandingPage/LandingPage"));
const overallEchoEco = lazy(() =>
  import("../components/EchoEco/OverallEchoEco/OverallEchoEco")
);
const billingScreen = lazy(() =>
  import("../components/Transactions/BillingScreen/BillingScreen")
);
const dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const registrationSuccessful = lazy(() => import("../components/Auth/Signup/RegistrationSuccessful/RegistrationSuccessful"))
const enterOtp = lazy(() => import("../components/Auth/Signup/RegistrationSuccessful/EnterOtp/EnterOtp"))
const resentEmail = lazy(() => import("../components/Auth/Signup/RegistrationSuccessful/ResentEmail/ResentEmail"))
const resetPassword = lazy(() => import("../components/Auth/Login/ResetPassword/ResetPassword"))
const resetSuccessful = lazy(() => import("../components/Auth/Login/ResetPassword/ResetSuccessful/ResetSuccessful"))
const echoPics = lazy(() => import("../components/EchoPics/EchoPics"))
const forgotPassword = lazy(() => import("../components/Auth/Login/ForgotPassword/ForgotPassword"))
const otpVerified = lazy(() => import("../components/Auth/Signup/RegistrationSuccessful/EnterOtp/OtpVerifiedSuccessfully/OtpVerifiedSucccessfully"))
const changePassword = lazy(() => import("../components/Profile/ChangePassword/ChangePassword"))
const specificEchoPic = lazy(() => import("../components/EchoPics/SpecificEchoPics/SpecificEchoPic"))
const byrdsPage = lazy(() => import("../components/ByrdsPage/ByrdsPage"))
const byrdsPageNonLogin = lazy(() => import("../components/ByrdsPage/ByrdsPageNonLoginUser/ByrdsPageNonLogin"));
const leaderBoardNonLogIn = lazy(() => import("../components/LeaderBoard/LeaderBoardNonLogIn/LeaderBoardNonLogIn"))
const latestUpdates = lazy(() => import("../components/LatestUpdates/LatestUpdates"))
const pageNotFound = lazy(() => import("../components/PageNotFound/PageNotFound"))
// const subscription = lazy(() => import("../components/Auth/Signup/Subscription/Subscription"))
const sharedPost = lazy(() => import("../components/ByrdsPage/ByrdsPagePopup/SharePost/SharePost"))

export const routes = [
  {
    path: "signup",
    element: signup,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "login",
    element: login,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "dashboard",
    element: dashboard,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "profile",
    element: profile,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "leaderboard",
    element: leaderBoard,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "paymenthistory",
    element: paymentHistory,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "billingscreen",
    element: billingScreen,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "/",
    element: landingPage,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "overallEchoEco",
    element: overallEchoEco,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "overallEchoEco/specificApi",
    element: specificApi,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "registrationSuccessful",
    element: registrationSuccessful,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "enterOtp",
    element: enterOtp,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resentEmail",
    element: resentEmail,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resetPassword",
    element: resetPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resetSuccessful",
    element: resetSuccessful,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "echoPics",
    element: echoPics,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "forgotPassword",
    element: forgotPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "otpVerified",
    element: otpVerified,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "changePassword",
    element: changePassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "echoPics/specificEchoPic",
    element: specificEchoPic,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "byrdsPage",
    element: byrdsPage,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "company/:companyName",
    element: byrdsPageNonLogin,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "leader-board",
    element: leaderBoardNonLogIn,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "latestUpdates",
    element: latestUpdates,
    isPrivate: true,
    isLayout: true,
  },
  // {
  //   path: "subscription",
  //   element: subscription,
  //   isPrivate: false,
  //   isLayout: false,
  // },
  {
    path: "company/:companyName/:postId",
    element: sharedPost,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "*",
    element: pageNotFound,
    isPrivate: false,
    isLayout: false,
  }
];
