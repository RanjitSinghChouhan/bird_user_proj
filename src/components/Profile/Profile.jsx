import React, { useState } from "react";
import location from "../../assets/Location.svg";
import email from "../../assets/email.svg";
import call from "../../assets/Calling.svg";
import edit from "../../assets/Edit.svg";
import path from "../../assets/path.svg";
import EditDetailsPopUp from "./EditPopup/EditDetails/EditDetailsPopUp";
import EditAboutPopUp from "./EditPopup/EditAbout/EditAboutPopUp";
import uploadImg from "../../assets/uploadImg.svg";
import { useSelector } from "react-redux";
import KeyMilestone from "./KeyMilestone/KeyMilestone";
import sprout from "../../assets/sprout.svg";
import Loader from "../Loader/Loader";
import moment from "moment-timezone";
import ResetPasswordWarning from "./ChangePassword/ResetPasswordWarningPopup/ResetPasswordWarning";

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-US", { month: "short" });
}

function Profile() {
  const [isEditDetails, setIsEditDetails] = useState(false);
  const [isEditAbout, setIsAboutDetails] = useState(false);
  const [isResetWarning, setIsResetWarning] = useState(false);
  const userInfoData = useSelector((state) => state.auth.userInfo[0]);
  const onEditDetails = () => {
    setIsEditDetails(true);
  };
  const onCloseDetailsPopUp = () => {
    setIsEditDetails(false);
  };
  const onEditAbout = () => {
    setIsAboutDetails(true);
  };
  const onCloseAboutPopUp = () => {
    setIsAboutDetails(false);
  };
  const onCloseResetWarningPopUp = () => {
    setIsResetWarning(false);
  };

  const handleChangePassword = () => {
    setIsResetWarning(true);
  };
  return (
    <>
      {!userInfoData ? <Loader /> : ""}
      <div className="px-8">
        <div className="font-semibold text-4xl tracking-tighter">
          Company Profile
        </div>
        <div className="flex justify-around py-4 gap-6">
          <div className="w-full max-w-xs shadow-xl rounded-2xl relative flex flex-col">
            <div
              onClick={onEditDetails}
              className="absolute top-1 right-1 cursor-pointer"
            >
              <img className="w-5 h-5" src={edit} alt="" />
            </div>
            <div className="w-4/6 shadow-xl rounded-2xl mx-auto my-4">
              <div className="px-3 py-8 text-center">
                {userInfoData?.companyIcon ? (
                  <img
                    className="mx-auto py-5"
                    src={userInfoData.companyIcon}
                    alt=""
                  />
                ) : (
                  <>
                    <img className="mx-auto py-5" src={uploadImg} alt="" />
                    <div className="font-semibold text-xs text-[#000000]">
                      Upload your company logo
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="font-semibold text-center w-4/6 text-xl mx-auto">
              {userInfoData && userInfoData.companyName}
            </div>
            <div className="w-4/6 items-center justify-center mx-auto mt-[10px]">
              <div className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] rounded-lg font-medium text-base px-2 py-1 text-white flex justify-center w-full items-center">
                <div>
                  <img src={sprout} alt="" />
                </div>
                <div className="ml-[5px]">
                  Sprouts:{" "}
                  {(userInfoData && userInfoData.updatedByrdsPoints) || 0}
                </div>
              </div>
            </div>
            <div className="text-sm my-12 w-/6 mx-auto max-w-max text-gray-500 flex-grow">
              <div className="flex items-center py-1">
                <img className="w-5 h-5" src={location} alt="" />
                {userInfoData && userInfoData.companyAddress ? (
                  <div className="px-2">{userInfoData.companyAddress}</div>
                ) : (
                  <div className="px-2">Address does not exist</div>
                )}
              </div>
              <div className="flex items-center py-1">
                <img className="w-5 h-5" src={email} alt="" />
                {userInfoData && userInfoData.companyAdminEmail ? (
                  <div className="px-2 overflow-x-hidden">
                    {userInfoData.companyAdminEmail}
                  </div>
                ) : (
                  <div className="px-2">Email does not exist</div>
                )}
              </div>
              <div className="flex items-center py-1">
                <img className="w-5 h-5" src={call} alt="" />
                {userInfoData && userInfoData.companyPhone ? (
                  <div className="px-2">{userInfoData.companyPhone}</div>
                ) : (
                  <div className="px-2">Phone no. to be updated</div>
                )}
              </div>
            </div>
            <div
              onClick={handleChangePassword}
              className="underline cursor-pointer hover:text-green-500 p-4 text-center text-lg"
            >
              Change Password
            </div>
          </div>
          <div className="w-full flex-grow">
            <div className=" px-8 py-4 shadow-xl rounded-2xl relative">
              <div
                onClick={onEditAbout}
                className="absolute top-3 right-1 cursor-pointer"
              >
                <img className="w-5 h-5" src={edit} alt="" />
              </div>
              <div className="font-semibold text-xl mb-3">About Company</div>
              {userInfoData && userInfoData.aboutCompany ? (
                <div className="font-normal text-sm text-[#979797] h-60 break-words">
                  {userInfoData.aboutCompany}
                </div>
              ) : (
                <div className="font-normal text-sm text-[#979797] h-60">
                  Write something about your company...
                </div>
              )}
            </div>
            <div className=" px-8 py-4 shadow-xl rounded-2xl relative mt-6">
              <div
                onClick={onEditDetails}
                className="absolute top-1 right-1 cursor-pointer"
              >
                <img className="w-5 h-5" src={edit} alt="" />
              </div>
              <div className="font-semibold text-xl">Details</div>
              <div className="pt-6 font-normal text-sm">
                <div className="flex justify-between py-2">
                  <div className="text-[#808080]">Number of Employees</div>
                  {userInfoData && userInfoData.companyEmployeeScale ? (
                    <div className="GreenGradient">
                      {userInfoData.companyEmployeeScale}
                    </div>
                  ) : (
                    <div className="GreenGradient">to be updated</div>
                  )}
                </div>
                <div className="flex justify-between py-2">
                  <div className="text-[#808080]">Establish Date</div>
                  {userInfoData && userInfoData.companyYearOfEstablishment ? (
                    <div className="GreenGradient">
                      {getMonthName(
                        userInfoData.companyYearOfEstablishment.slice(0, 2)
                      )}
                      &nbsp;
                      {userInfoData.companyYearOfEstablishment.slice(3, 7)}
                    </div>
                  ) : (
                    <div className="GreenGradient">to be updated</div>
                  )}
                </div>
                <div className="flex justify-between py-2">
                  <div className="text-[#808080]">Byrds Member Since</div>
                  <div className="GreenGradient">
                    {moment(userInfoData?.createdAt).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
              <div className="h-40">
                <img className="h-full w-full" src={path} alt="" />
              </div>
            </div>
          </div>
          <div className="w-full max-w-xs">
            <KeyMilestone companyId={userInfoData && userInfoData.companyId} />
          </div>
        </div>
      </div>
      {userInfoData && (
        <EditDetailsPopUp
          visible={isEditDetails}
          onClose={onCloseDetailsPopUp}
          companyAddress={userInfoData.companyAddress}
          companyAdminName={userInfoData.companyAdminName}
          companyPhone={userInfoData.companyPhone}
          companyYearOfEstablishment={userInfoData.companyYearOfEstablishment}
          companyEmployeeScale={userInfoData.companyEmployeeScale}
          companyIcon={userInfoData.companyIcon}
          companyName={userInfoData.companyName}
        />
      )}
      {userInfoData && (
        <EditAboutPopUp
          visible={isEditAbout}
          onClose={onCloseAboutPopUp}
          aboutCompany={userInfoData.aboutCompany}
        />
      )}
      <ResetPasswordWarning
        visible={isResetWarning}
        onClose={onCloseResetWarningPopUp}
      />
    </>
  );
}

export default Profile;
