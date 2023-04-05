import React, { useEffect, useState } from "react";
import tree from "../../../assets/treeSpecificApi.svg";
import triangle from "../../../assets/triangleSpecificApi.svg";
import EchoEcoEndpointPopup from "./SpecificApiPopups/EchoEcoEndpointPopup";
import SetNewGoalPopup from "./SpecificApiPopups/SetNewGoalPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createEchoEcoReport,
  editEchoEcoGoalById,
  getDailyEchoEcoCallApiKeyAndUrl,
  getDailyEchoEcoDetails,
} from "../../../store/actions/echoEcoAction";
import moment from "moment-timezone";
import { useRef } from "react";
import Loader from "../../Loader/Loader";
import { useCallback } from "react";
import edit from "../../../assets/Edit.svg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SuccessfulPopUp from "../../SuccessfulPopup/SuccessfulPopUp";

function SpecificApi() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isEchoEcoEndpointPopup, setIsEchoEcoEndpointPopu] = useState(false);
  const [isSetNewGoalPopup, setIsSetNewGoalPopup] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const apiId = searchParams.get("id");
  const companyId = searchParams.get("companyId");
  const apiName = searchParams.get("apiName");
  const [isActive, setIsActive] = useState(searchParams.get("isActive"));
  const ecoType = searchParams.get("ecoType");
  let [apiKey, setApiKey] = useState("");
  let [url, setUrl] = useState("");
  let [viewUrl, setViewUrl] = useState("");
  const [dailyDetails, setDailyDetails] = useState([]);
  const [monthlyDetails, setMonthlyDetails] = useState([]);
  const [yearlyDetails, setYearlyDetails] = useState([]);
  const [dailyEchoEcoCalls, setDailyEchoEcoCalls] = useState([]);
  const [echoEcoData, setEchoEcoData] = useState([]);
  const [echoEcoTotalApiCall, setEchoEcoTotalApiCall] = useState([]);
  const isLoading = useRef(true);
  const isEdit = useRef(false);

  const onCloseSucessfulPopup = () => {
    setIsSuccessful(false);
  };

  const onEchoEcoEndpointPopup = useCallback(() => {
    dispatch(
      getDailyEchoEcoCallApiKeyAndUrl({ id: apiId, companyId: companyId })
    ).then((response) => {
      setApiKey(response.data.apiKey);
      setUrl(response.data.url);
      setViewUrl(response.data.viewUrl);
    });
  }, [dispatch, apiId, companyId]);

  const onCloseEchoEcoEndpointPopup = () => {
    setIsEchoEcoEndpointPopu(false);
  };
  const onSetNewGoalPopup = (type) => {
    if (type === "edit") isEdit.current = true;
    else if (type === "reset") isEdit.current = false;
    setIsSetNewGoalPopup(true);
  };
  const onCloseSetNewGoalPopup = () => {
    setIsSetNewGoalPopup(false);
  };
  const handleActiveButton = () => {
    dispatch(editEchoEcoGoalById({ isActive: 2, id: apiId, type: 2 }));
    setIsActive(2);
  };
  const handleDeactivateButton = () => {
    dispatch(editEchoEcoGoalById({ isActive: 1, id: apiId, type: 2 }));
    setIsActive(1);
  };

  const getDailyEchoEcoDetail = useCallback(
    (type) => {
      if (type === 1) {
        dispatch(getDailyEchoEcoDetails({ apiId: apiId, type: type })).then(
          (response) => {
            setDailyDetails(response.data.getCurrentMonthEchoEco);
            setMonthlyDetails(response.data.echoEcoAllDetails);
            setDailyEchoEcoCalls(response.data.dailyEchoEcoCall);
            setEchoEcoTotalApiCall(response.data.echoEcoTotalApiCall);
            setEchoEcoData(response.data.echoEcoData);
            isLoading.current = false;
          }
        );
      } else {
        dispatch(getDailyEchoEcoDetails({ apiId: apiId, type: type })).then(
          (response) => {
            setDailyDetails(response.data.getCurrentMonthEchoEco);
            setYearlyDetails(response.data.echoEcoAllDetails);
            setDailyEchoEcoCalls(response.data.dailyEchoEcoCall);
            setEchoEcoTotalApiCall(response.data.echoEcoTotalApiCall);
            setEchoEcoData(response.data.echoEcoData);
            isLoading.current = false;
          }
        );
      }
    },
    [dispatch, apiId]
  );

  const handleMonthly = () => {
    // getDailyEchoEcoDetail(1);
    setIsMonthly(true);
  };

  const handleYearly = () => {
    // getDailyEchoEcoDetail(2);
    setIsMonthly(false);
  };

  const handleRequest = (yearlyId, isRequested) => {
    if (!isRequested) {
      dispatch(
        createEchoEcoReport({
          companyId: companyId,
          apiId: apiId,
          yearlyId: yearlyId,
        })
      ).then((response) => {
        getDailyEchoEcoDetail(2);
        setIsSuccessful(true);
        setTimeout(() => {
          setIsSuccessful(false);
        }, 500);
      });
    }
  };

  useEffect(() => {
    onEchoEcoEndpointPopup();
  }, []);

  useEffect(() => {
    isLoading.current = true;
    getDailyEchoEcoDetail(1);
    getDailyEchoEcoDetail(2);
  }, []);

  return (
    <div>
      {isLoading.current ? <Loader /> : ""}
      <div className="px-8 flex flex-col gap-4">
        <div className="flex items-center gap-6 2xl:gap-8">
          <div className="flex items-center gap-2">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2743L19.25 12.2743"
                  stroke="#6DB935"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.2497"
                  stroke="#6DB935"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="shadow-xl rounded-xl font-medium text-2xl GreenGradient px-4 py-1">
              {apiName}
            </div>
          </div>
          {parseInt(isActive) === 2 ? (
            <div
              className="flex items-center gap-2"
              onClick={handleDeactivateButton}
            >
              <div className="cursor-pointer">
                <svg
                  width="42"
                  height="23"
                  viewBox="0 0 42 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 22.5C8.125 22.5 5.46875 21.4062 3.28125 19.2188C1.09375 17.0312 0 14.375 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0H30C33.125 0 35.7812 1.09375 37.9688 3.28125C40.1562 5.46875 41.25 8.125 41.25 11.25C41.25 14.375 40.1562 17.0312 37.9688 19.2188C35.7812 21.4062 33.125 22.5 30 22.5H11.25ZM11.25 18.75H30C32.0625 18.75 33.8281 18.0156 35.2969 16.5469C36.7656 15.0781 37.5 13.3125 37.5 11.25C37.5 9.1875 36.7656 7.42188 35.2969 5.95313C33.8281 4.48438 32.0625 3.75 30 3.75H11.25C9.1875 3.75 7.42188 4.48438 5.95313 5.95313C4.48438 7.42188 3.75 9.1875 3.75 11.25C3.75 13.3125 4.48438 15.0781 5.95313 16.5469C7.42188 18.0156 9.1875 18.75 11.25 18.75ZM11.25 16.875C12.8125 16.875 14.1406 16.3281 15.2344 15.2344C16.3281 14.1406 16.875 12.8125 16.875 11.25C16.875 9.6875 16.3281 8.35938 15.2344 7.26562C14.1406 6.17188 12.8125 5.625 11.25 5.625C9.6875 5.625 8.35938 6.17188 7.26562 7.26562C6.17188 8.35938 5.625 9.6875 5.625 11.25C5.625 12.8125 6.17188 14.1406 7.26562 15.2344C8.35938 16.3281 9.6875 16.875 11.25 16.875Z"
                    fill="#BB4430"
                  />
                </svg>
              </div>
              <div className="GreenGradient font-medium text-lg">Activate</div>
            </div>
          ) : (
            <div
              className="flex items-center gap-2"
              onClick={handleActiveButton}
            >
              <div className="cursor-pointer">
                <svg
                  width="42"
                  height="23"
                  viewBox="0 0 42 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 0C33.125 0 35.7812 1.09375 37.9688 3.28125C40.1562 5.46875 41.25 8.125 41.25 11.25C41.25 14.375 40.1562 17.0312 37.9688 19.2188C35.7812 21.4062 33.125 22.5 30 22.5L11.25 22.5C8.125 22.5 5.46875 21.4062 3.28125 19.2187C1.09375 17.0312 0 14.375 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0L30 0ZM30 3.75L11.25 3.75C9.1875 3.75 7.42188 4.48437 5.95312 5.95312C4.48438 7.42187 3.75 9.1875 3.75 11.25C3.75 13.3125 4.48438 15.0781 5.95312 16.5469C7.42188 18.0156 9.1875 18.75 11.25 18.75L30 18.75C32.0625 18.75 33.8281 18.0156 35.2969 16.5469C36.7656 15.0781 37.5 13.3125 37.5 11.25C37.5 9.1875 36.7656 7.42188 35.2969 5.95312C33.8281 4.48438 32.0625 3.75 30 3.75ZM30 5.625C28.4375 5.625 27.1094 6.17188 26.0156 7.26562C24.9219 8.35937 24.375 9.6875 24.375 11.25C24.375 12.8125 24.9219 14.1406 26.0156 15.2344C27.1094 16.3281 28.4375 16.875 30 16.875C31.5625 16.875 32.8906 16.3281 33.9844 15.2344C35.0781 14.1406 35.625 12.8125 35.625 11.25C35.625 9.6875 35.0781 8.35938 33.9844 7.26562C32.8906 6.17188 31.5625 5.625 30 5.625Z"
                    fill="url(#paint0_linear_94_1132)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_94_1132"
                      x1="20.625"
                      y1="22.5"
                      x2="20.625"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6DB935" />
                      <stop offset="1" stopColor="#4DAA09" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="GreenGradient font-medium text-lg">
                Currently Active
              </div>
            </div>
          )}
        </div>
        <div className="block p-4 2xl:p-6 w-full overflow-x-hidden rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between mb-3 px-6">
            <div className="font-semibold text-xl">Echo eco's call history</div>
            <label
              htmlFor="Toggle"
              className="inline-flex items-center rounded-full cursor-pointer bg-[#F4F4F4]"
            >
              <input id="Toggle" type="checkbox" className="hidden peer" />
              <span
                onClick={handleMonthly}
                className={
                  isMonthly
                    ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-2 rounded-full`
                }
              >
                Monthly
              </span>
              <span
                onClick={handleYearly}
                className={
                  !isMonthly
                    ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-2 rounded-full`
                }
              >
                Annually
              </span>
            </label>
          </div>
          <div className="mt-4 h-72" id="style-1">
            <table className="ml-1 w-full table-auto">
              <thead className="border-b border-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="pl-4 py-2 text-sm font-normal text-[#AEAEAE] text-left"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                  >
                    Quantity
                    <span className="text-[#6DB935] font-normal text-[11px] ml-[1px]">
                      {ecoType.toLowerCase()}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                  >
                    Rate
                  </th>
                  {!isMonthly ? (
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Report
                    </th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              {isMonthly ? (
                monthlyDetails && monthlyDetails.length !== 0 ? (
                  <tbody className="border-gray-100 relative">
                    {monthlyDetails &&
                      monthlyDetails.map((item, index) => {
                        return item.monthlyId ? (
                          <tr
                            key={item.monthlyId}
                            className="border-b last:border-none border-gray-100"
                          >
                            <td className="pl-4 py-2 w-auto text-sm font-normal text-[#404040] truncate">
                              {item.monthlyId}
                            </td>
                            <td className="text-sm text-[#000000] font-normal py-2">
                              {moment(item.createdAt).format("YYYY-MM-DD")}
                            </td>
                            <td className="text-sm text-[#000000] font-normal py-2">
                              {item.siteAssigned || "not assigned"}
                            </td>
                            <td className="text-sm text-[#6DB935] font-normal py-2">
                              {item.monthlyApiCallCount}
                            </td>
                            <td className="text-sm text-[#22A447] font-normal py-2">
                              {item.monthlyPlanted === item.monthlyApiCallCount
                                ? "All Planted"
                                : Math.round(
                                    (item.monthlyPlanted /
                                      item.monthlyApiCallCount) *
                                      100
                                  ) < 1
                                ? "<1%"
                                : `${Math.round(
                                    (item.monthlyPlanted /
                                      item.monthlyApiCallCount) *
                                      100
                                  )}%` || "to be updated"}
                            </td>
                            <td className="text-sm text-[#404040] font-normal py-2">
                              {item.monthlyPlanted !== 0
                                ? Math.round(
                                    (item.monthlyPlantAlive /
                                      item.monthlyPlanted) *
                                      100
                                  ) < 1
                                  ? "<1%"
                                  : `${Math.round(
                                      (item.monthlyPlantAlive /
                                        item.monthlyPlanted) *
                                        100
                                    )}%`
                                : "to be updated"}
                            </td>
                            {!isMonthly ? (
                              <td className="text-sm text-white font-semibold rounded-2xl text-left">
                                <span className="text-sm text-white bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-semibold rounded-xl w-auto px-3 my-1 pb-1 pt-0.5 text-center cursor-pointer">
                                  Request
                                </span>
                              </td>
                            ) : (
                              <></>
                            )}
                          </tr>
                        ) : (
                          <></>
                        );
                      })}
                  </tbody>
                ) : (
                  <tbody className="absolute flex justify-center items-center ml-96 mt-20 text-center">
                    <div>
                      <span className="">No Data Available</span>
                    </div>
                  </tbody>
                )
              ) : yearlyDetails && yearlyDetails.length !== 0 ? (
                <tbody className="border-gray-100 relative">
                  {yearlyDetails &&
                    yearlyDetails.map((item, index) => {
                      return item.yearlyId ? (
                        <tr
                          key={item.yearlyId}
                          className="border-b last:border-none border-gray-100"
                        >
                          <td className="pl-4 py-2 w-auto text-sm font-normal text-[#404040] truncate">
                            {item.yearlyId}
                          </td>
                          <td className="text-sm text-[#000000] font-normal py-2">
                            {moment(item.createdAt).format("YYYY-MM-DD")}
                          </td>
                          <td className="text-sm text-[#000000] font-normal py-2">
                            {item.locationCount +
                              ` location${
                                item.locationCount.length == 1 ? "" : "s"
                              }`}
                          </td>
                          <td className="text-sm text-[#6DB935] font-normal py-2">
                            {item.quantity}
                          </td>
                          <td className="text-sm text-[#22A447] font-normal py-2">
                            {Number(item.yearlyPlanted) ===
                            Number(item.quantity)
                              ? "All Planted"
                              : Math.round(
                                  (Number(item.yearlyPlanted) /
                                    Number(item.quantity)) *
                                    100
                                ) < 1
                              ? "<1%"
                              : `${Math.round(
                                  (Number(item.yearlyPlanted) /
                                    Number(item.quantity)) *
                                    100
                                )}%` || "to be updated"}
                          </td>
                          <td className="text-sm text-[#404040] font-normal py-2">
                            {Number(item.yearlyPlanted) !== 0
                              ? Math.round(
                                  (Number(item.yearlyPlantAlive) /
                                    Number(item.yearlyPlanted)) *
                                    100
                                ) < 1
                                ? "<1%"
                                : `${Math.round(
                                    (Number(item.yearlyPlantAlive) /
                                      Number(item.yearlyPlanted)) *
                                      100
                                  )}%`
                              : "to be updated"}
                          </td>
                          {!isMonthly ? (
                            <td
                              className="text-sm text-white font-semibold rounded-2xl text-left"
                              onClick={() =>
                                handleRequest(item.yearlyId, item.isRequested)
                              }
                            >
                              <span
                                className={`text-sm text-white ${
                                  item.isRequested
                                    ? "bg-gray-400"
                                    : "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] cursor-pointer"
                                } font-semibold rounded-xl w-auto px-3 my-1 pb-1 pt-0.5 text-center`}
                              >
                                {item.isRequested ? "Requested" : "Request"}
                              </span>
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      ) : (
                        <></>
                      );
                    })}
                </tbody>
              ) : (
                <tbody className="absolute flex justify-center items-center ml-96 mt-20 text-center">
                  <div>
                    <span className="">No Data Available</span>
                  </div>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="shadow-xl rounded-2xl w-1/2 px-4 pt-4">
            <div className="font-semibold text-xl mb-2">
              Daily Echo eco Calls
            </div>
            <div className="h-28">
              <table>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] pr-10 py-2 text-left"
                    >
                      Sl No.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] pl-10 py-2 text-left"
                    >
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="relative">
                  {(dailyEchoEcoCalls[1] &&
                    parseInt(dailyEchoEcoCalls[1].dailyApiCallCount) === 0 &&
                    dailyEchoEcoCalls[0] &&
                    parseInt(dailyEchoEcoCalls[0].dailyApiCallCount) === 0) ||
                  dailyEchoEcoCalls.length === 0 ? (
                    <span className="absolute w-full flex justify-center mt-4 ">
                      No Data Available
                    </span>
                  ) : (
                    <>
                      <tr>
                        <td className="text-sm text-[#404040] font-normal pr-10 py-2 whitespace-nowrap">
                          {dailyEchoEcoCalls[1] &&
                            parseInt(dailyEchoEcoCalls[1].dailyApiCallCount) !==
                              0 &&
                            dailyEchoEcoCalls[1].dailyApiCallCount}
                        </td>
                        <td className="text-sm text-[#000000] font-normal pl-10 py-2 whitespace-nowrap">
                          {dailyEchoEcoCalls[1] &&
                            parseInt(dailyEchoEcoCalls[1].dailyApiCallCount) !==
                              0 &&
                            dailyEchoEcoCalls[1].createdAt}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm text-[#404040] font-normal pr-10 py-2 whitespace-nowrap">
                          {dailyEchoEcoCalls[0] &&
                            dailyEchoEcoCalls[0].dailyApiCallCount}
                        </td>
                        <td className="text-sm text-[#000000] font-normal pl-10 py-2 whitespace-nowrap">
                          {dailyEchoEcoCalls[0] &&
                            dailyEchoEcoCalls[0].createdAt}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="h-20">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Month ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Quantity
                      <span className="text-[#6DB935] font-normal text-[11px] ml-[1px]">
                        {ecoType.toLowerCase()}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] py-2 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="relative">
                  {dailyDetails[0] && dailyDetails[0].monthlyId ? (
                    <tr>
                      <td
                        className="text-sm text-[#404040] font-normal py-2 truncate"
                        title={dailyDetails[0] && dailyDetails[0].monthlyId}
                      >
                        {dailyDetails[0] && dailyDetails[0].monthlyId}
                      </td>
                      <td className="text-sm text-[#000000] font-normal py-2">
                        {dailyDetails[0] &&
                          moment(dailyDetails[0].createdAt).format(
                            "YYYY-MM-DD"
                          )}
                      </td>
                      <td className="text-sm text-[#000000] font-normal py-2">
                        {(dailyDetails[0] && dailyDetails[0]?.siteAssigned) ||
                          "not assigned"}
                      </td>
                      <td className="text-sm text-[#22A447] font-normal py-2 text-center">
                        {dailyDetails[0] && dailyDetails[0].monthlyApiCallCount}
                      </td>
                      <td className="text-sm text-[#22A447] font-normal py-2">
                        {dailyDetails[0]?.monthlyPlanted ===
                        dailyDetails[0]?.monthlyApiCallCount
                          ? "All Planted"
                          : Math.round(
                              (dailyDetails[0]?.monthlyPlanted /
                                dailyDetails[0]?.monthlyApiCallCount) *
                                100
                            ) < 1
                          ? "<1%"
                          : `${Math.round(
                              (dailyDetails[0]?.monthlyPlanted /
                                dailyDetails[0]?.monthlyApiCallCount) *
                                100
                            )}%` || "to be updated"}
                      </td>
                    </tr>
                  ) : (
                    <span className="absolute w-full flex justify-center mt-4 ">
                      No Data Available
                    </span>
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="font-semibold text-xs text-[#404040] flex justify-end">
              *Refreshes everyday resolved next day
            </div>
          </div>
          <div className="w-1/2 ml-4 flex">
            <div className="w-2/3">
              <div className="shadow-xl rounded-2xl flex justify-between items-center">
                <div className="px-4 py-2">
                  <div className="font-medium text-lg text-[#000000]">
                    Total Times Called
                  </div>
                  <div className="font-medium text-2xl GreenGradient">
                    {echoEcoTotalApiCall[0] && echoEcoTotalApiCall[0].totalCall}
                  </div>
                </div>
                <div>
                  <img src={tree} alt="" />
                </div>
              </div>
              <div className="shadow-xl rounded-2xl px-4 py-2 mt-4 relative">
                <div
                  onClick={() => onSetNewGoalPopup("edit")}
                  className="absolute top-1 right-1 cursor-pointer"
                >
                  <img className="w-5 h-5" src={edit} alt="" />
                </div>
                <div className="font-medium text-lg text-[#000000]">Goal</div>
                <div
                  className="progress-bar rounded bg-gray-200 h-2 my-2"
                  style={{ width: `100%` }}
                >
                  <div
                    className="progrees-bar-indicator rounded-3xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] h-2 text-gray-400"
                    style={{
                      width: `${
                        echoEcoData[0]?.goalReached <=
                        echoEcoData[0]?.goalAmount
                          ? ((echoEcoData[0] && echoEcoData[0].goalReached) /
                              (echoEcoData[0] && echoEcoData[0].goalAmount)) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-[#000000] font-bold text-2xl">
                  {echoEcoData[0]?.goalReached <= echoEcoData[0]?.goalAmount
                    ? echoEcoData[0] && echoEcoData[0].goalReached
                    : 0}
                  /
                  {echoEcoData[0]?.goalReached <= echoEcoData[0]?.goalAmount
                    ? echoEcoData[0] && echoEcoData[0].goalAmount
                    : 0}
                </div>
                <div className="flex justify-between">
                  {echoEcoData[0]?.goalReached <= echoEcoData[0]?.goalAmount ? (
                    echoEcoData[0]?.goalReached ===
                    echoEcoData[0]?.goalAmount ? (
                      <div className="font-medium text-[#6DB935] text-[15px] w-2/3">
                        Goal Reached. Start new plantation goal!
                      </div>
                    ) : echoEcoData[0]?.goalReached <
                        echoEcoData[0]?.goalAmount &&
                      (parseInt(echoEcoData[0]?.days) === 0 ||
                        !echoEcoData[0]?.days) ? (
                      <div className="font-medium w-2/3 text-[#BB4430] text-[15px]">
                        You did not reach your goal . Set a new goal and try
                        again!
                      </div>
                    ) : (
                      <div className="font-medium text-[#BB4430] text-[15px]">
                        No. of days left -{" "}
                        {echoEcoData[0] && echoEcoData[0].days} days
                      </div>
                    )
                  ) : (
                    <div className="font-medium text-[#BB4430] text-[15px]">
                      This goal has ended. Set a new goal
                    </div>
                  )}

                  <div
                    id="set-goal"
                    onClick={() => onSetNewGoalPopup("reset")}
                    className="text-sm rounded-2xl text-center cursor-pointer"
                  >
                    <span className="text-sm text-white bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-medium rounded-xl w-auto px-2 my-1 pb-1 pt-0.5 text-center">
                      Set new goal
                    </span>
                  </div>
                </div>
              </div>
              <ReactTooltip
                anchorId="set-goal"
                place="bottom"
                content="Old Data will not be considered"
                variant="white"
                className="shadow-xl rounded-xl bg-white"
              />
            </div>
            <div
              onClick={() => setIsEchoEcoEndpointPopu(true)}
              className="w-1/3 shadow-xl rounded-2xl px-4 py-4 ml-4 cursor-pointer"
            >
              <div className="font-medium text-lg text-[#000000]">
                Echo eco key & Endpoint
              </div>
              <div className="mt-6">
                <img src={triangle} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <EchoEcoEndpointPopup
        visible={isEchoEcoEndpointPopup}
        onClose={onCloseEchoEcoEndpointPopup}
        apiKey={apiKey}
        url={url}
        viewUrl={viewUrl}
      />
      {echoEcoData[0] && (
        <SetNewGoalPopup
          visible={isSetNewGoalPopup}
          onClose={onCloseSetNewGoalPopup}
          apiId={apiId}
          getDailyEchoEcoDetail={getDailyEchoEcoDetail}
          isEdit={isEdit.current}
          goalAmount={echoEcoData[0].goalAmount}
          goalDays={echoEcoData[0].goalDays}
        />
      )}
      <SuccessfulPopUp
        visible={isSuccessful}
        onClose={onCloseSucessfulPopup}
        message="Request Raised"
      />
    </div>
  );
}

export default SpecificApi;
