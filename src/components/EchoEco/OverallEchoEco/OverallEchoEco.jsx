import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import upArrow from "../../../assets/upArrow.svg";
import downArrow from "../../../assets/downArrow.svg";
import CreateEchoEcoPopup from "./EchoEcoPopups/CreateEchoEcoPopup/CreateEchoEcoPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  getEchoEcosByCompanyId,
  getEcoPurpose,
  getEcoType,
  getMonthlyTotalEchoPlanted,
} from "../../../store/actions/echoEcoAction";
import { useNavigate, createSearchParams } from "react-router-dom";
import CounterEndpointPopup from "./EchoEcoPopups/CounterEndpointPopup/CounterEndpointPopup";
import { useRef } from "react";
import Loader from "../../Loader/Loader";
import { useCallback } from "react";
import EchoBarChart from "./EchoBarChart";
import { dummyData } from "../../Dashboard/Dashboard";

function OverallEchoEco() {
  const [isTree, setIsTree] = useState(true);
  const [isCreateEchoEcoPopup, setIsCreateEchoEcoPopup] = useState(false);
  const [isCounterEndpointPopup, setIsCounterEndpointPopup] = useState(false);
  const [ecoPurposes, setEcoPurposes] = useState([]);
  const [ecoTypes, setEcoTypes] = useState([]);
  // const [monthlyTreeAlgaeData, setMonthlyTreeAlgaeData] = useState();
  const [monthlyTreeData, setMonthlyTreeData] = useState();
  const [monthlyAlgaeData, setMonthlyAlgaeData] = useState();
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const createdEchoEcoList = useSelector((state) => state.echoEco.allEchoEcos);
  const url = useSelector((state) => state.echoEco.counterUrl);
  const [upcomingGoal, setUpcomingGoal] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useRef(false);
  const hasActiveEco = useRef(false);
  const [countAlgaeCall, setCountAlgaeCall] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const countEco = useRef(0);

  const handleMonthlyTotalEchoPlanted = useCallback(
    (companyId, type) => {
      dispatch(
        getMonthlyTotalEchoPlanted({ companyId: companyId, type: type })
      ).then((response) => {
        if (type == 1) {
          setMonthlyTreeData(response.data);
        } else if (type == 2) {
          setMonthlyAlgaeData(response.data);
        }
      });
    },
    [dispatch]
  );

  const handleAlgae = () => {
    setIsTree(false);
    if (countAlgaeCall < 1) {
      handleMonthlyTotalEchoPlanted(userInfo?.companyId, 2);
      setCountAlgaeCall((count) => count + 1);
    }
  };

  const handleTree = () => {
    setIsTree(true);
  };

  for (let i = 0; i < createdEchoEcoList?.length; i++) {
    if (createdEchoEcoList[i]?.isActive === 1) {
      hasActiveEco.current = true;
      break;
    }
  }

  const getEchoEco = useCallback(
    (count = 0) => {
      dispatch(
        getEchoEcosByCompanyId({
          companyId: userInfo?.companyId,
          offset: count,
        })
      ).then((response) => {
        countEco.current = countEco.current + 10
        setUpcomingGoal(response.data.upComingGoal);
        if (response.data.echoEcos.length < 10) {
          setHasMore(false);
        }
        isLoading.current = false;
      });
    },
    [dispatch, userInfo, countEco]
  );

  useEffect(() => {
    isLoading.current = true;
    if (userInfo) {
      getEchoEco();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      handleMonthlyTotalEchoPlanted(userInfo?.companyId, 1);
      // handleMonthlyTotalEchoPlanted(userInfo?.companyId, 2);
    }
  }, [userInfo]);

  const onCreateEchoEco = () => {
    dispatch(getEcoPurpose()).then((response) => {
      setEcoPurposes(response.data.ecoPurpose);
    });
    dispatch(getEcoType()).then((response) => {
      setEcoTypes(response.data.ecoType);
    });
    setIsCreateEchoEcoPopup(true);
  };

  const onCloseCreateEchoEcoPopup = () => {
    setIsCreateEchoEcoPopup(false);
  };

  const onCloseCounterEndpointPopup = () => {
    setIsCounterEndpointPopup(false);
  };

  const fetchMoreData = () =>{
    setTimeout(() => {
      getEchoEco(countEco.current);
    }, 300);
  };

  return (
    <>
      {!userInfo || isLoading.current ? <Loader /> : ""}
      <div className="flex items-start gap-3 2xl:gap-6 2xl:p-6 py-4">
        <div className="flex pl-2 flex-col gap-8">
          <div
            className="p-4 w-full overflow-x-hidden shadow-xl rounded-2xl min-w-[500px] 2xl:min-w-[600px] max-w-xl"
            style={{ height: "229px" }}
          >
            <div className="flex justify-between">
              <div className="font-semibold text-xl text-[#404040]">
                Create Echo Eco
              </div>
              <div
                onClick={onCreateEchoEco}
                className="font-semibold text-base GreenGradient cursor-pointer"
              >
                Create New +
              </div>
            </div>
            <div
              className="mt-4 relative overflow-y-auto overflow-x-hidden h-36 px-2"
              id="scrollDiv"
            >
              <InfiniteScroll
                dataLength={createdEchoEcoList?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget={"scrollDiv"}
              >
                <table className="w-full">
                  <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] pl-0 pr-5 py-2 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      >
                        No. Of Calls
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      ></th>
                    </tr>
                  </thead>
                  {createdEchoEcoList?.length !== 0 ? (
                    <tbody className="border-gray-100 relative">
                      {createdEchoEcoList?.map((item) => {
                        return (
                          <tr
                            key={item.id}
                            className="border-b last:border-none cursor-pointer border-gray-100 group"
                            onClick={() =>
                              navigate({
                                pathname: "specificApi",
                                search: createSearchParams({
                                  id: item.id,
                                  companyId: userInfo?.companyId,
                                  apiName: item.apiName,
                                  isActive: item.isActive,
                                  goalAmount: item.goalAmount,
                                  goalDays: item.goalDays,
                                  apiCall: item.apiCall,
                                  ecoType: item.ecoType,
                                }).toString(),
                              })
                            }
                          >
                            <td className="pl-0 pr-5 py-2 whitespace-nowrap text-sm font-normal text-[#404040] group-hover:text-[#4DAA09]">
                              {item.apiName}
                            </td>
                            <td className="text-sm text-[#404040] font-normal px-5 py-2 whitespace-nowrap">
                              {item.apiCall}
                            </td>
                            <td className="text-sm text-[#404040] font-bold px-5 py-2 whitespace-nowrap">
                              {item.ecoType}
                            </td>
                            {item.isActive === 1 ? (
                              <td className="text-sm GreenGradient font-normal pl-5 pr-0 py-2 whitespace-nowrap">
                                Active
                              </td>
                            ) : (
                              <td className="text-sm text-[#F9896B] font-normal pl-5 pr-0 py-2 whitespace-nowrap">
                                Deactive
                              </td>
                            )}
                            <td className="text-xs GreenGradient font-bold text-center">
                              Learn More
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody className="absolute flex w-full justify-center mt-5 text-center">
                      <div>
                        <span className="">No Echo Ecos created</span>
                        <div
                          onClick={onCreateEchoEco}
                          className="font-semibold text-[15px] GreenGradient cursor-pointer"
                        >
                          Create New +
                        </div>
                      </div>
                    </tbody>
                  )}
                </table>
              </InfiniteScroll>
            </div>
          </div>

          <div className="block w-full p-4 overflow-x-hidden rounded-2xl shadow-lg bg-white min-w-[500px] 2xl:min-w-[600px] max-w-xl h-[446px] 2xl:h-[476px]">
            <div className="flex justify-between">
              <div className="font-semibold text-xl text-[#404040]">
                Active Echo Ecos
              </div>
            </div>
            <div className="mt-4 overflow-y-auto h-80 px-2">
              <table className="w-full relative">
                <thead className="sticky top-0 bg-white z-10 border-b border-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] pl-0 pr-5 py-2 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                    >
                      Area sq ft.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                    >
                      Goal
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                    >
                      Rate
                    </th>
                  </tr>
                </thead>
                {hasActiveEco.current ? (
                  <tbody className="border-gray-100">
                    {createdEchoEcoList?.map((item, index) => {
                      return item.isActive === 1 ? (
                        <tr
                          key={index}
                          className="border-b last:border-none cursor-pointer border-gray-100 group"
                          onClick={() =>
                            navigate({
                              pathname: "specificApi",
                              search: createSearchParams({
                                id: item.id,
                                companyId: userInfo?.companyId,
                                apiName: item.apiName,
                                isActive: item.isActive,
                                goalAmount: item.goalAmount,
                                goalDays: item.goalDays,
                                apiCall: item.apiCall,
                                ecoType: item.ecoType,
                              }).toString(),
                            })
                          }
                        >
                          <td className="pl-0 pr-5 py-2 whitespace-nowrap text-sm font-normal text-[#404040] group-hover:text-[#4DAA09]">
                            {item.apiName}
                          </td>
                          <td className="text-sm text-[#000000] font-normal px-4 py-2 whitespace-nowrap">
                            {Number(item.totalPlanted) || "to be updated"}
                          </td>
                          <td className="text-sm text-[#000000] font-normal px-5 py-2 whitespace-nowrap">
                            {item.apiCall}
                            <span className="font-normal text-[11px] text-[#000000] ml-[2px]">
                              {item.ecoType.toLowerCase()}
                            </span>
                          </td>
                          <td className="text-sm GreenGradient font-normal px-5 py-2 whitespace-nowrap">
                            {Math.round(
                              (item.goalReached / item.goalAmount) * 100
                            ) < 1
                              ? "<1"
                              : Math.round(
                                  (item.goalReached / item.goalAmount) * 100
                                )}
                            %
                          </td>
                          <td className="text-sm text-[#404040] font-bold  pl-4 pr-0 py-2 whitespace-nowrap">
                            {Number(item.totalPlanted) !== 0
                              ? Math.round(
                                  (item.totalPlantAlive / item.totalPlanted) *
                                    100
                                ) < 1
                                ? "<1%"
                                : `${Math.round(
                                    (item.totalPlantAlive / item.totalPlanted) *
                                      100
                                  )}%`
                              : "to be updated"}
                          </td>
                        </tr>
                      ) : (
                        ""
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="absolute flex w-full justify-center mt-20 text-center">
                    <div>
                      <span className="">No Active Echo Ecos Present</span>
                    </div>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        <div className="flex-grow pr-2 flex flex-col gap-6 w-full 2xl:max-w-2xl">
          <div className="flex items-start gap-3 2xl:gap-5 justify-around">
            <div className="shadow-xl rounded-2xl p-4 2xl:p-6 w-full max-w-[200px] h-[142px]">
              <div className="font-semibold text-[#404040] text-lg mb-3">
                Leader Board
              </div>
              <div className="flex">
                {userInfo?.companyRankStatus === 1 ? (
                  <div className="flex items-center gap-2 font-semibold text-2xl text-[#22A447]">
                    {userInfo?.updatedCompanyRank}
                    <img src={upArrow} alt="" />
                  </div>
                ) : userInfo?.companyRankStatus === 2 ? (
                  <div className="flex items-center gap-2 font-semibold text-2xl text-[#BB4430]">
                    {userInfo?.updatedCompanyRank}
                    <img src={downArrow} alt="" />
                  </div>
                ) : (
                  <div
                    className="flex text-center gap-2 font-semibold text-2xl"
                    style={{ color: "#FFC145" }}
                  >
                    {userInfo?.updatedCompanyRank}
                    <div className=" w-4">
                      <svg
                        width="18"
                        height="4"
                        viewBox="0 0 5 2"
                        fill="none"
                        className="mt-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0.999878"
                          y1="0.999878"
                          x2="16.9999"
                          y2="0.999878"
                          stroke="#FFC145"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="shadow-xl rounded-2xl p-4 2xl:p-6 w-full max-w-[200px] h-[142px]">
              <div className="font-semibold text-[#404040] text-lg">
                Billing
              </div>
              <div className="font-semibold text-[15px] text-[#BB4430]">
                {monthlyTreeData?.deadlineBills} Bills are reaching deadlines
              </div>
            </div>
            <div className="shadow-xl rounded-2xl p-4 2xl:p-6 w-full max-w-[200px] h-[142px] flex flex-col justify-between gap-3">
              <div className="font-semibold text-[#404040] text-lg">
                Counter Endpoint
              </div>
              <button
                type="submit"
                onClick={() => setIsCounterEndpointPopup(true)}
                className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-1.5 px-3 w-full rounded-3xl font-semibold text-base"
              >
                Open
              </button>
            </div>
          </div>

          <div className="shadow-xl rounded-2xl p-4 2xl:p-6">
            <div className="flex items-baseline gap-2">
              <div className="font-semibold text-xl text-[#404040]">
                Upcoming Goal{" "}
              </div>
              <div className="font-normal text-xs text-[#AEAEAE] mt-[5px] ml-1">
                Echo Eco Name -{" "}
                {(upcomingGoal && upcomingGoal[0] && upcomingGoal[0].apiName) ||
                  "No Eco name"}
              </div>
            </div>
            <div className="font-medium text-[#BB4430]">
              Number of days left -{" "}
              {(upcomingGoal && upcomingGoal[0] && upcomingGoal[0].days) || 0}{" "}
              days
            </div>
            <div
              className="progress-bar  rounded bg-gray-200 h-2 my-2"
              style={{ width: `100%` }}
            >
              <div
                className="progrees-bar-indicator rounded-3xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] h-2 text-gray-400"
                style={{
                  width: `${
                    (upcomingGoal &&
                      upcomingGoal[0] &&
                      upcomingGoal[0].goalReached) ||
                    0 /
                      (upcomingGoal &&
                        upcomingGoal[0] &&
                        upcomingGoal[0].goalAmount) ||
                    0 * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-[#000000] font-bold text-2xl">
              {(upcomingGoal &&
                upcomingGoal[0] &&
                upcomingGoal[0].goalReached) ||
                0}
              /
              {(upcomingGoal &&
                upcomingGoal[0] &&
                upcomingGoal[0].goalAmount) ||
                0}
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-4 2xl:p-6">
            <label
              htmlFor="Toggle"
              className="inline-flex items-center rounded-full cursor-pointer bg-[#F4F4F4]"
            >
              <input id="Toggle" type="checkbox" className="hidden peer" />
              <span
                onClick={handleTree}
                className={
                  isTree
                    ? `px-4 py-1.5 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-1.5 rounded-full`
                }
              >
                Trees
              </span>
              <span
                onClick={handleAlgae}
                className={
                  !isTree
                    ? `px-4 py-1.5 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-1.5 rounded-full`
                }
              >
                Algae
              </span>
            </label>
            {isTree ? (
              <>
                {/* <div className="py-2 w-[100px]">
                  <div className=" text-[#404040] text-sm">
                    Trees planted till date
                  </div>
                  <div className="text-[#000000] font-bold text-2xl">
                    {monthlyTreeAlgaeData &&
                      monthlyTreeAlgaeData.totalTreeCount}
                  </div>
                </div>
                <BarChart
                  width={480}
                  height={220}
                  data={
                    monthlyTreeAlgaeData &&
                    monthlyTreeAlgaeData.monthlyTotalTreePlanted
                  }
                  radius={20}
                >
                  <XAxis
                    dataKey="monthName"
                    style={{ fontSize: "9px" }}
                    padding={{ left: 10, right: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="totalMonthlyCall"
                    fill="#6DB935"
                    background={{ fill: "#F2F7FF" }}
                    barSize={6}
                    radius={20}
                  />
                </BarChart> */}
                {/* {monthlyTreeData?.status && ( */}
                  <EchoBarChart
                    heading="Trees planted till date"
                    count={monthlyTreeData?.totalTreeCount || 0}
                    data={monthlyTreeData?.monthlyTotalTreePlanted || dummyData}
                  />
                {/* )} */}
                {/* <AreaChart
                  width={517}
                  height={230}
                  data={treeData}
                  margin={{ top: 100, right: 10, left: 10, bottom: 0 }}
                  className="shadow-xl rounded-2xl w-full"
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="95%"
                        stopColor="#E7ECEC"
                        stopOpacity={0.8}
                      />
                      <stop offset="95%" stopColor="#E7ECEC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    className="mt-4"
                    type="monotone"
                    dataKey="totalMonthlyCall"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart> */}
              </>
            ) : (
              <>
                {/* {monthlyAlgaeData?.status && ( */}
                  <EchoBarChart
                    heading="Algae Spawned till date"
                    count={monthlyAlgaeData?.totalAlgaeCount || 0}
                    data={monthlyAlgaeData?.monthlyTotalAlgaePlanted || dummyData}
                  />
                {/* )} */}
                {/* <div className="py-2 w-[100px]">
                  <div className="text-[#404040] text-sm">
                    Algae Spawned till date
                  </div>
                  <div className="text-[#000000] font-bold text-2xl">
                    {monthlyTreeAlgaeData &&
                      monthlyTreeAlgaeData.totalAlgaeCount}
                  </div>
                </div>
                <BarChart
                  width={480}
                  height={220}
                  data={
                    monthlyTreeAlgaeData &&
                    monthlyTreeAlgaeData.monthlyTotalAlgaePlanted
                  }
                  radius={20}
                >
                  <XAxis
                    dataKey="monthName"
                    style={{ fontSize: "9px" }}
                    padding={{ left: 10, right: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="totalMonthlyCall"
                    fill="#6DB935"
                    background={{ fill: "#F2F7FF" }}
                    barSize={6}
                    radius={20}
                  />
                </BarChart> */}
                {/* <AreaChart
                  width={517}
                  height={230}
                  data={algaeData}
                  margin={{ top: 100, right: 10, left: 10, bottom: 0 }}
                  className="shadow-xl rounded-2xl w-full"
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="95%"
                        stopColor="#E7ECEC"
                        stopOpacity={0.8}
                      />
                      <stop offset="95%" stopColor="#E7ECEC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    className="mt-4"
                    type="monotone"
                    dataKey="totalMonthlyCall"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart> */}
              </>
            )}
          </div>
        </div>
      </div>

      <CreateEchoEcoPopup
        visible={isCreateEchoEcoPopup}
        onClose={onCloseCreateEchoEcoPopup}
        ecoPurposes={ecoPurposes}
        ecoTypes={ecoTypes}
      />
      <CounterEndpointPopup
        visible={isCounterEndpointPopup}
        onClose={onCloseCounterEndpointPopup}
        url={url}
      />
    </>
  );
}

export default OverallEchoEco;
