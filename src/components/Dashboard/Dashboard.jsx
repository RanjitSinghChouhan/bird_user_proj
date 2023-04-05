import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, AreaChart, Area, Tooltip } from "recharts";
import algae from "../../assets/algae.svg";
import tree from "../../assets/tree.svg";
import upArrow from "../../assets/upArrow.svg";
import downArrow from "../../assets/downArrow.svg";
import { getAllCompaniesByrdsPoints } from "../../store/actions/leaderBoardAction";
import {
  getEchoEcoGoalStatus,
  getMonthlyTotalEchoPlanted,
  latestOverallEchoEco,
} from "../../store/actions/echoEcoAction";
import Loader from "../Loader/Loader";
import { useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment-timezone";
import { getTotalTreeAlgae } from "../../store/actions/byrdsPageAction";
import { algaeNameCount, treeNameCount } from "../ByrdsPage/ByrdsPage";
import { useWindowSize } from "../../hooks/useWindowSize";
import InfiniteScroll from "react-infinite-scroll-component";

export const dummyData = [
  { monthName: "Jan", totalMonthlyCall: 0 },
  { monthName: "Feb", totalMonthlyCall: 0 },
  { monthName: "Mar", totalMonthlyCall: 0 },
  { monthName: "Apr", totalMonthlyCall: 0 },
  { monthName: "May", totalMonthlyCall: 0 },
  { monthName: "Jun", totalMonthlyCall: 0 },
  { monthName: "Jul", totalMonthlyCall: 0 },
  { monthName: "Aug", totalMonthlyCall: 0 },
  { monthName: "Sep", totalMonthlyCall: 0 },
  { monthName: "Oct", totalMonthlyCall: 0 },
  { monthName: "Nov", totalMonthlyCall: 0 },
  { monthName: "Dec", totalMonthlyCall: 0 },
];

function Dashboard() {
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const navigate = useNavigate();
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [monthlyTreeAlgaeData, setMonthlyTreeAlgaeData] = useState();
  const [quickAccess, setQuickAccess] = useState([]);
  const [totalEchoEcoCalled, setTotalEchoEcoCalled] = useState([]);
  const [algaeGoalStatus, setAlgaeGoalStatus] = useState([]);
  const [treeGoalStatus, setTreeGoalStatus] = useState([]);
  const [treeCount, setTreeCount] = useState(0);
  const [algaeCount, setAlgaeCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const windowSize = useWindowSize();
  const [countEco, setCountEco] = useState(0);

  const isLoading = useRef(true);
  const dispatch = useDispatch();

  const quickAccessData = useCallback(
    (offset = 0) => {
      dispatch(latestOverallEchoEco({companyId: userInfo?.companyId, offset: offset})).then((response) => {
        setCountEco(countEco+ 10);
        setTotalEchoEcoCalled(response.data.companyTotalApiCall[0].quantity);
        setQuickAccess([...quickAccess, ...response.data.companyOverallEcho]);
        if (response.data.companyOverallEcho.length < 10) {
          setHasMore(false);
        }
      });
    },
    [dispatch, quickAccess, userInfo, countEco]
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(
        getAllCompaniesByrdsPoints({
          type: 3,
          companyName: userInfo?.companyName,
        })
      ).then((response) => {
        setLeaderBoardData(response.data.getAllCompaniesNewByrdsPoints);
        isLoading.current = false;
      });
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getEchoEcoGoalStatus({ companyId: userInfo?.companyId })).then(
        (response) => {
          setAlgaeGoalStatus(response.data.getGoalAlgaeStatus);
          setTreeGoalStatus(response.data.getGoalTreeStatus);
        }
      );
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getTotalTreeAlgae({ companyId: userInfo?.companyId })).then(
        (response) => {
          setAlgaeCount(response.data.totalAlgae);
          setTreeCount(response.data.totalTree);
        }
      );
    }
  }, [dispatch, userInfo]);
  
  useEffect(() => {
    if (userInfo) {
      quickAccessData();
    }
  }, [userInfo]);
  
  useEffect(() => {
    if (userInfo) {
      dispatch(
        getMonthlyTotalEchoPlanted({ companyId: userInfo?.companyId, type: 3 })
      ).then((response) => {
        setMonthlyTreeAlgaeData(response.data);
      });
    }
  }, [dispatch, userInfo]);

  const fetchMoreData = () => {
    if (userInfo)
      setTimeout(() => {
        quickAccessData(countEco);
      }, 300);
  };

  return (
    <div>
      {isLoading.current ? <Loader /> : ""}
      <div className="p-4 2xl:px-6 h-full min-h-[90vh] max-h-screen flex flex-col gap-12">
        <div className="w-full flex items-start xl:justify-between gap-3 2xl:gap-6">
          <div className="">
            <div className="font-semibold text-xl text-[#404040] px-3">
              Overall Echo Eco Calls
            </div>
            <BarChart
              width={
                windowSize.width > 1440
                  ? 430
                  : windowSize.width > 1400
                  ? 420
                  : 417
              }
              height={280}
              data={monthlyTreeAlgaeData?.monthlyTotalTreePlanted || dummyData}
              className="shadow-xl rounded-2xl"
              radius={20}
            >
              <XAxis
                dataKey="monthName"
                style={{ fontSize: "10px", background: "red" }}
                padding={{ left: 5, right: 5 }}
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
            </BarChart>
          </div>
          <div
            className="shadow-xl rounded-2xl px-3 py-5"
            style={{ height: "308px" }}
          >
            <div className="font-semibold text-xl text-[#404040]">
              Leader Board
            </div>
            <div className=" min-w-[280px] 2xl:min-w-[340px] h-full py-2">
              <table className="w-full">
                <thead>
                  <tr className="text-left font-normal text-[#AEAEAE] text-sm border-b-[1px] overflow-hidden">
                    <th>Position</th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderBoardData?.map((item, i) => (
                    <tr
                      key={item?.companyName}
                      className="border-b-[1px] last:border-b-0 overflow-hidden"
                    >
                      <td className="pl-1 py-2 font-normal text-sm text-[#404040] truncate">
                        {item.companyRank}
                      </td>
                      <td className="pr-1 font-normal text-sm text-[#404040] truncate">
                        {item?.companyName}
                      </td>
                      <td className="relative">
                        {item.companyRankStatus === 1 ? (
                          <div className="flex text-[#22A447] text-sm">
                            {item.updatedByrdsPoints} &nbsp;
                            {/* <img src={upArrow} alt="" className="w-[14px]" /> */}
                            <svg
                              className="absolute right-3"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.7256 4.25L11.7256 19.25"
                                stroke="url(#paint0_linear_80_215)"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M5.70124 10.2998L11.7252 4.2498L17.7502 10.2998"
                                stroke="url(#paint1_linear_80_215)"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_80_215"
                                  x1="11.7256"
                                  y1="19.25"
                                  x2="11.7256"
                                  y2="4.25"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#6DB935" />
                                  <stop offset="1" stop-color="#4DAA09" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_80_215"
                                  x1="11.7257"
                                  y1="10.2998"
                                  x2="11.7257"
                                  y2="4.2498"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#6DB935" />
                                  <stop offset="1" stop-color="#4DAA09" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        ) : item.companyRankStatus === 2 ? (
                          <div className="flex text-[#BB4430] text-sm">
                            {item.updatedByrdsPoints} &nbsp;
                            {/* <img src={downArrow} alt="" className="w-[14px]" /> */}
                            <svg
                              className="absolute right-3"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.2743 19.75V4.75"
                                stroke="#BB4430"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.2987 13.7002L12.2747 19.7502L6.24969 13.7002"
                                stroke="#BB4430"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div
                            className="flex text-sm"
                            style={{ color: "#FFC145" }}
                          >
                            {item.updatedByrdsPoints} &nbsp;
                            <div className="ml-1 w-[14px] absolute right-4">
                              <hr
                                style={{
                                  marginTop: "11px",
                                  borderColor: "#FFC145",
                                  borderBottom: "#FFC145",
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="grid grid-cols-2 gap-3 2xl:gap-4 flex-grow"
            style={{ width: "350px", height: "308px" }}
          >
            <div className="w-full p-4 2xl:p-6 shadow-xl rounded-2xl flex flex-col justify-between">
              <div className="font-medium text-sm 2xl:text-base text-gray-600 capitalize">
                Visit byrds page
              </div>
              <button
                onClick={() => (window.location.pathname = "/byrdsPage")}
                className="py-1.5 px-3 xl:px-4 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] rounded-lg font-medium text-white"
              >
                Visit Page
              </button>
            </div>

            <div className="w-full p-4 2xl:p-6 shadow-xl rounded-2xl flex flex-col gap-4">
              <div className="font-medium text-sm 2xl:text-base text-gray-600 capitalize">
                Total Echo eco called
              </div>
              <div className="text-xl font-bold">{totalEchoEcoCalled || 0}</div>
            </div>

            <div className="w-full p-4 2xl:p-6 shadow-xl rounded-2xl flex flex-col justify-between">
              <div className="font-medium text-sm 2xl:text-base text-gray-600 capitalize">
                Place order for custom made eco fetch products
              </div>
              <div className="w-full flex items-center justify-center">
                <button className="py-1.5 px-1 min-w-max lg:px-4 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] rounded-lg font-medium text-white">
                  Get Started
                </button>
              </div>
            </div>
            <div className="w-full p-4 2xl:p-6 shadow-xl rounded-2xl flex flex-col gap-4">
              <div className="font-medium text-sm 2xl:text-base text-gray-600 capitalize">
                Leaders Board Position
              </div>
              <div className="flex items-center gap-2">
                {userInfo && userInfo.companyRankStatus === 1 ? (
                  <div className="flex font-semibold text-2xl text-[#22A447]">
                    {userInfo && userInfo.updatedCompanyRank}
                    <img src={upArrow} alt="" />
                  </div>
                ) : userInfo && userInfo.companyRankStatus === 2 ? (
                  <div className="flex font-semibold text-2xl text-[#BB4430]">
                    {userInfo && userInfo.updatedCompanyRank}
                    <img src={downArrow} alt="" />
                  </div>
                ) : (
                  <div
                    className="flex text-center font-semibold text-2xl"
                    style={{ color: "#FFC145" }}
                  >
                    {userInfo && userInfo.updatedCompanyRank}
                    <div className="ml-1 w-4">
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
          </div>
        </div>

        <div className="flex items-start xl:justify-between gap-3 2xl:gap-6 w-full">
          <div className="block px-4 py-6 flex-grow rounded-2xl shadow-lg bg-white h-full min-h-[372px] w-full max-w-[579px]">
            <h1 className="text-xl font-semibold">Quick Access</h1>
            <div className="mt-4 overflow-y-auto h-80 px-2 relative" id="scrollDiv">
              <InfiniteScroll
                dataLength={quickAccess?.length}
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
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      >
                        Eco Name
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
                        Latest Update
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                      >
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  {quickAccess.length !== 0 ? (
                    <tbody className="border-gray-100">
                      {quickAccess.map((item) => {
                        return (
                          <tr
                            key={item.apiName}
                            className="border-b last:border-none border-gray-100 group cursor-pointer"
                            onClick={() =>
                              navigate({
                                pathname: "/overallEchoEco/specificApi",
                                search: createSearchParams({
                                  id: item.apiId,
                                  companyId: userInfo.companyId,
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
                            <td className="px-5 py-2 whitespace-nowrap text-sm font-normal cursor-pointer text-[#404040] group-hover:text-[#4DAA09]">
                              {item.apiName}
                            </td>
                            <td className="px-5 py-2 whitespace-nowrap text-sm font-normal text-[#C7C7C7]">
                              {item.ecoType}
                            </td>
                            <td className="px-5 py-2 whitespace-nowrap text-sm font-normal text-[#C7C7C7]">
                              {moment(item.lastDate).format("DD-MM-YYYY")}
                            </td>
                            <td className="px-5 py-2 whitespace-nowrap text-sm font-bold text-[#404040]">
                              {item.totalGoalReached}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody className="absolute flex w-full justify-center mt-20 text-center">
                      <div>
                        <span className="">No Data Available</span>
                      </div>
                    </tbody>
                  )}
                </table>
              </InfiniteScroll>
            </div>
          </div>

          <div className="h-full min-h-[372px] max-h-[373px] flex-grow flex flex-col justify-between gap-4">
            <div className="p-4 py-8 rounded-2xl shadow-lg bg-white flex flex-col">
              <div className="text-xl font-semibold text-[#404040] mb-2">
                Eco Goal Status
              </div>
              <div className="status-wrapper flex flex-col gap-3">
                <div className="status-item flex justify-around items-center gap-4">
                  <div className="icon rounded p-1 mt-4 bg-green-100">
                    <img src={algae} alt="" />
                  </div>
                  <div
                    className="progress-bar  rounded bg-gray-200 h-2 my-2 font-normal text-sm text-[#AEAEAE]"
                    style={{ width: `100%` }}
                  >
                    <div
                      className="progrees-bar-indicator rounded-3xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] h-2 text-gray-400"
                      style={{
                        width: `${
                          (algaeGoalStatus[0] &&
                            algaeGoalStatus[0].goalReached) ||
                          0 /
                            (algaeGoalStatus[0] &&
                              algaeGoalStatus[0].goalAmount) ||
                          0 * 100
                        }%`,
                      }}
                    ></div>{" "}
                    {algaeGoalStatus[0] && algaeGoalStatus[0].days
                      ? algaeGoalStatus[0] && algaeGoalStatus[0].apiName
                      : " No api present with active goal" || "No Api exist"}
                  </div>
                  <div className="percentage flex justify-center items-center w-12 text-2xl font-semibold text-[#696969] min-w-max">
                    {algaeGoalStatus[0] &&
                    algaeGoalStatus[0].goalReached !== null
                      ? (
                          ((algaeGoalStatus[0] &&
                            algaeGoalStatus[0].goalReached) /
                            (algaeGoalStatus[0] &&
                              algaeGoalStatus[0].goalAmount)) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </div>
                </div>
                <div className="status-item flex justify-around items-center gap-4">
                  <div className="icon rounded p-1 mt-4 bg-green-100">
                    <img src={tree} alt="" />
                  </div>
                  <div
                    className="progress-bar  rounded bg-gray-200 h-2 my-2 font-normal text-sm text-[#AEAEAE]"
                    style={{ width: `100%` }}
                  >
                    <div
                      className="progrees-bar-indicator rounded-3xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] h-2 text-gray-400"
                      style={{
                        width: `${
                          (treeGoalStatus[0] &&
                            treeGoalStatus[0].goalReached) ||
                          0 /
                            (treeGoalStatus[0] &&
                              treeGoalStatus[0].goalAmount) ||
                          0 * 100
                        }%`,
                      }}
                    ></div>{" "}
                    {treeGoalStatus[0] && treeGoalStatus[0].days
                      ? treeGoalStatus[0] && treeGoalStatus[0].apiName
                      : " No api present with active goal" || "No Api exist"}
                  </div>
                  <div className="percentage flex justify-center items-center w-12 text-2xl font-semibold text-[#696969] min-w-max">
                    {treeGoalStatus[0] && treeGoalStatus[0].goalReached !== null
                      ? (
                          ((treeGoalStatus[0] &&
                            treeGoalStatus[0].goalReached) /
                            (treeGoalStatus[0] &&
                              treeGoalStatus[0].goalAmount)) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 2xl:gap-6">
              <div className="shadow-xl rounded-xl w-full p-4">
                <div className="font-medium text-sm 2xl:text-base text-gray-500">
                  {userInfo?.companyName} Spawned
                </div>
                <div className="GreenGradient font-bold text-xl mt-3">
                  {algaeNameCount(algaeCount).number}{" "}
                  {algaeNameCount(algaeCount).name}
                </div>
                <div className="GreenGradient font-semibold text-sm 2xl:text-base">
                  Worth of Alage till date
                </div>
              </div>

              <div className="shadow-xl rounded-xl w-full p-4">
                <div className="font-medium text-sm 2xl:text-base text-gray-500">
                  {userInfo?.companyName} Planted
                </div>
                <div className="GreenGradient font-bold text-xl mt-3">
                  {treeNameCount(treeCount).number}{" "}
                  {treeNameCount(treeCount).name}
                </div>
                <div className="GreenGradient font-semibold text-sm 2xl:text-base">
                  Worth of trees till date
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
