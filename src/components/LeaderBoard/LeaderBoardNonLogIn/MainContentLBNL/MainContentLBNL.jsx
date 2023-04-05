import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Loader from "../../../Loader/Loader";
import upArrow from "../../../../assets/upArrow.svg";
import downArrow from "../../../../assets/downArrow.svg";
import filter from "../../../../assets/filter.svg";
import { getAllCompaniesByrdsPoints } from "../../../../store/actions/leaderBoardAction";
import { getIndustrySector } from "../../../../store/actions/authAction";
import InfiniteScroll from "react-infinite-scroll-component";

function MainContentLBNL() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [getIndustrySectors, setGetIndustrySectors] = useState([]);
  const isLoading = useRef(true);
  const [hasMore, sethasMore] = useState(true);
  const [countComp, setCountComp] = useState(0);

  const getAllCompaniesByrdsPoint = useCallback(
    (data) => {
      dispatch(getAllCompaniesByrdsPoints(data)).then((response) => {
        // setLeaderBoardData(response.data.getAllCompaniesNewByrdsPoints);
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

  const handleDropdown = (e) => {
    if (parseInt(e.target.value)) {
      getAllCompaniesByrdsPoint({
        type: 2,
        offset: countComp,
        industrySector: parseInt(e.target.value),
      });
    } else {
      getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
    }, 300);
  };

  useEffect(() => {
    dispatch(getIndustrySector()).then((response) => {
      setGetIndustrySectors(response.industrySector);
    });
    getAllCompaniesByrdsPoint({ type: 1, offset: countComp });
  }, [dispatch]);

  return (
    <div className="mx-8 mt-4 mb-8">
      {isLoading.current ? <Loader /> : ""}
      <div className="flex justify-end">
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
      <div className="mt-5 overflow-y-auto shadow-2xl rounded-xl h-[650px] p-4 relative" id="scrollDiv">
        <InfiniteScroll
          dataLength={leaderBoardData?.length}
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

export default MainContentLBNL;
