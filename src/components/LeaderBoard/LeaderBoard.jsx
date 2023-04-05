import React, { useEffect, useState } from "react";
import upArrow from "../../assets/upArrow.svg";
import downArrow from "../../assets/downArrow.svg";
import filter from "../../assets/filter.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompaniesByrdsPoints } from "../../store/actions/leaderBoardAction";
import { getIndustrySector } from "../../store/actions/authAction";
import { useRef } from "react";
import Loader from "../Loader/Loader";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

function LeaderBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const [getIndustrySectors, setGetIndustrySectors] = useState([]);
  const isLoading = useRef(true);
  const [hasMore, sethasMore] = useState(true);
  const [countComp, setCountComp] = useState(0);

  const getAllCompaniesByrdsPoint = useCallback(
    (data) => {
      dispatch(getAllCompaniesByrdsPoints(data)).then((response) => {
        // setLeaderBoardData((leaderBoardData) => [
        //   ...Object.values(
        //     [
        //       ...leaderBoardData,
        //       ...response.data.getAllCompaniesNewByrdsPoints,
        //     ].reduce((acc, obj) => {
        //       if (!acc[obj.id]) {
        //         acc[obj.id] = obj;
        //       }
        //       return acc;
        //     }, {})
        //   ),
        // ]);
        setCountComp(countComp + 15);
        setLeaderBoardData([...leaderBoardData, ...response.data.getAllCompaniesNewByrdsPoints])
        if (response.data.getAllCompaniesNewByrdsPoints.length < 15) {
          sethasMore(false);
        }
        isLoading.current = false;
      });
    },
    [dispatch, leaderBoardData, countComp]
  );

  const handleDropdown = useCallback((e) => {
    if (parseInt(e.target.value)) {
      getAllCompaniesByrdsPoint({
        type: 2,
        offset: countComp,
        industrySector: parseInt(e.target.value),
      });
    } else {
      sethasMore(true);
      getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
    }
  }, []);

  const getIndustry = useCallback(() => {
    dispatch(getIndustrySector()).then((response) => {
      setGetIndustrySectors(response.industrySector);
    });
  }, [dispatch]);

  const fetchMoreData = () => {
    setTimeout(() => {
      getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
    }, 300);
  };

  useEffect(() => {
    getIndustry();
    getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
  }, []);

  return (
    <div className="mx-8 mt-4">
      {isLoading.current ? <Loader /> : ""}
      <div className="flex justify-between">
        <div className="flex w-full">
          <div className="font-normal text-[#545454] text-[25px]">
            Your Rank :{" "}
          </div>
          <div className="w-3/4 font-semibold text-[25px] text-[#000000] tracking-tighter">
            &nbsp;{userInfo && userInfo.updatedCompanyRank}
          </div>
        </div>
        <div className="relative cursor-pointer border rounded-lg p-1 focus-within:border-gray-400">
          <img
            src={filter}
            alt=""
            className="absolute top-1.5 bg-white right-1 w-6 h-6"
          />
          <select
            id="filter"
            className="custom-select bg-transparent outline-none z-20 relative cursor-pointer border border-outline-none border-none focus:border-none focus:border-outline-none focus:border-white active:border-none active:border-outline-none active:border-white w-fit"
            onChange={handleDropdown}
          >
            <option selected>All</option>
            {getIndustrySectors.map((sector) => {
              return (
                <option key={sector.id} value={sector.id}>
                  {sector.sectorOfIndustry}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div id="scrollDiv" className="mt-5 overflow-y-auto shadow-2xl rounded-xl h-[650px] p-4 relative">
        <InfiniteScroll
          dataLength={leaderBoardData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget={"scrollDiv"}
        >
          <table
            className="w-full"
            style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}
          >
            <thead>
              <tr className="text-left font-normal text-[#AEAEAE] text-xl">
                <td>Rank</td>
                <td>Company Name</td>
                <td>Sector</td>
                <td>Country</td>
                <td>Sprouts</td>
              </tr>
            </thead>
            <tbody>
              {leaderBoardData.map((item, i) => (
                <tr key={item.companyName}>
                  <td className="py-1 font-normal text-xl text-[#000000]">
                    {item.companyRank}
                  </td>
                  <td
                    className="py-1 font-normal text-xl text-[#000000] cursor-pointer hover:text-[#6DB935]"
                    onClick={() => navigate(`/company/${item.companyName}`)}
                  >
                    {item.companyName}
                  </td>
                  <td className="py-1 font-normal text-xl text-[#000000]">
                    {item.industrySector}
                  </td>
                  <td className="py-1 font-normal text-xl text-[#000000]">
                    {item.companyCountry}
                  </td>
                  <td className="relative">
                    {item.companyRankStatus === 1 ? (
                      <div className="flex items-center gap-1 font-semibold text-[#22A447]">
                        {item.updatedByrdsPoints} &nbsp;
                        <img
                          src={upArrow}
                          alt=""
                          className="absolute right-14"
                        />
                      </div>
                    ) : item.companyRankStatus === 2 ? (
                      <div className="flex items-center gap-1 font-semibold text-[#BB4430]">
                        {item.updatedByrdsPoints} &nbsp;
                        <img
                          src={downArrow}
                          alt=""
                          className="absolute right-14"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-1 font-semibold"
                        style={{ color: "#FFC145" }}
                      >
                        {item.updatedByrdsPoints} &nbsp;
                        <div className="w-4 absolute right-16">
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
        </InfiniteScroll>
      </div>{" "}
    </div>
  );
}

export default LeaderBoard;
