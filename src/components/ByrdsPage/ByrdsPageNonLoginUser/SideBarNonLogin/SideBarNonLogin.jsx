import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import bird from "../../../../assets/Subtract.svg";
import uploadImg from "../../../../assets/uploadImg.svg";
import AboutUsPopup from "./AboutUsPopup/AboutUsPopup";
import KeyMilestoneNonLogin from "./KeyMilestoneNonLogin/KeyMilestoneNonLogin";
import sprout from "../../../../assets/sprout.svg";
import { useDispatch } from "react-redux";
import { getCompanyDetailsByCompanyId } from "../../../../store/actions/leaderBoardAction";
import Loader from "../../../Loader/Loader";

function SideBarNonLogin({ companyId, byrdsPoints }) {
  const navigate = useNavigate();
  const [isAboutUs, setIsAboutUs] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  const isLoading = useRef(true);
  const dispatch = useDispatch();
  const onCloseAboutUsPopUp = () => {
    setIsAboutUs(false);
  };
  const getCompanyDetails = useCallback(() => {
    isLoading.current = true;
    dispatch(getCompanyDetailsByCompanyId({ companyId: companyId })).then(
      (response) => {
        setCompanyDetails(response.data.companyDetails);
        isLoading.current = false;
      }
    );
  }, [dispatch, companyId]);

  useEffect(() => {
    if (companyId) {
      getCompanyDetails();
    }
  }, [companyId]);

  return (
    <div className="bg-slate-50 min-h-screen overflow-y-hidden">
      {isLoading.current ? <Loader /> : ""}
      <div className="w-2/5 my-0.5 p-2 ml-6 cursor-pointer">
        <img
          className="bg-slate-50"
          src={bird}
          onClick={() => navigate("/")}
          alt=""
        />
      </div>
      <div className="flex flex-col text-center items-center justify-center">
        <div className="w-4/6 shadow-xl rounded-2xl mx-auto my-4">
          <div className="px-3 py-8 text-center">
            {companyDetails?.companyIcon ? (
              <img
                className="mx-auto py-5"
                src={companyDetails.companyIcon}
                alt=""
              />
            ) : (
              <img className="mx-auto py-5" src={uploadImg} alt="" />
            )}
          </div>
        </div>
        <div className="font-medium text-[15px] text-[#000000] mt-8 mb-2">
          {companyDetails?.companyAddress ? (
            <>{companyDetails?.companyAddress}</>
          ) : (
            <div className="font-normal text-[#aeaeae]">
              Address to be updated
            </div>
          )}
        </div>
        <div
          onClick={() => setIsAboutUs(true)}
          className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] rounded-lg cursor-pointer shadow-lg font-medium text-base px-2 py-1 text-white flex justify-center w-fit items-center"
        >
          About Us
        </div>
        <div className="my-6">
          <KeyMilestoneNonLogin companyId={companyId} />
        </div>
        <div className="font-semibold flex text-xl text-[#000000]">
          <img src={sprout} alt="" />
          <div className="ml-[5px]">Sprouts </div>
        </div>
        <div className="GreenGradient font-semibold text-lg">{byrdsPoints}</div>
      </div>
      <AboutUsPopup
        visible={isAboutUs}
        onClose={onCloseAboutUsPopUp}
        aboutCompany={companyDetails?.aboutCompany}
      />
    </div>
  );
}

export default SideBarNonLogin;
