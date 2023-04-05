import React, { useCallback, useEffect, useRef, useState } from "react";
import sort from "../../../assets/sort.svg";
import filter from "../../../assets/filter.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  completedTransactions,
  getUsersTransactions,
} from "../../../store/actions/transactionAction";
import Loader from "../../Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function PaymentHistory() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [countTrans, setCountTrans] = useState(0);

  const getCompletedTransactions = useCallback(() => {
    setIsLoading(true);
    dispatch(
      completedTransactions({
        companyId: userInfo?.companyId,
        offset: countTrans,
      })
    ).then((response) => {
      setCountTrans(countTrans + 15);
      setData(response.data.data);
      setFilteredArray([...filteredArray, ...response.data.data]);
      if (response.data.data.length < 15) {
        sethasMore(false);
      }
      setIsLoading(false);
    });
  }, [dispatch, userInfo, filteredArray, countTrans]);

  const fetchMoreData = () => {
    setTimeout(() => {
      getCompletedTransactions();
    }, 300);
  };

  const nextPage = () => {
    let totalPages = Math.ceil(filteredArray.length / pageSize);
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };
  const previousPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const onSelect = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value == 1) {
      var a = filteredArray.sort(
        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
      );
      setFilteredArray(a);
    } else {
      var b = filteredArray.sort(
        (b, a) => parseFloat(a.amount) - parseFloat(b.amount)
      );
      setFilteredArray(b);
    }
  };

  const onFilterValue = (e) => {
    setFilterValue(e.target.value);
    if (e.target.value == 1) {
      let filteredData = data.filter((el) => el.ecoType === "Tree");
      setFilteredArray(filteredData);
    } else {
      let filteredData1 = data.filter((el) => el.ecoType === "Algae");
      setFilteredArray(filteredData1);
    }
  };

  const handleDownload = () => {
    dispatch(getUsersTransactions());
  };

  useEffect(() => {
    if (userInfo) {
      getCompletedTransactions();
    }
  }, [userInfo]);

  return (
    <div className="p-6 flex flex-col h-full max-h-[90vh]">
      {isLoading ? <Loader /> : ""}
      <div className="flex gap-4 items-center w-full max-w-7xl">
        <div className="font-medium text-gray-500 text-2xl">
          Completed Transactions{" "}
        </div>
        <button
          onClick={handleDownload}
          className="rounded text-white py-1.5 px-4"
          style={{ border: "2px", background: "#6DB935" }}
        >
          Download all
        </button>
        <div className="flex-grow"></div>
        <div className="relative">
          {!selectedValue && (
            <img
              src={sort}
              alt=""
              className="absolute top-0 left-[6.5rem] w-6 h-6"
            />
          )}
          <select
            onChange={onSelect}
            value={selectedValue}
            className="border-outline-none border-none focus:border-none focus:border-outline-none bg-transparent z-10 relative cursor-pointer"
          >
            <option value=""></option>
            <option value={1}>Amount: Low-high</option>
            <option value={2}>Amount: High-low</option>
          </select>
        </div>
        <div className="relative">
          {!filterValue && (
            <img
              src={filter}
              alt=""
              className="absolute top-0 left-3 w-6 h-6"
            />
          )}
          <select
            onChange={onFilterValue}
            value={filterValue}
            className="border-outline-none border-none focus:border-none focus:border-outline-none bg-transparent cursor-pointer z-10 relative"
          >
            <option value=""></option>
            <option value={1}>Tree</option>
            <option value={2}>Algae</option>
          </select>
        </div>
      </div>

      <div className="relative shadow-xl rounded-2xl h-full">
        <div
          className="mt-4 overflow-y-auto overflow-x-hidden h-5/6 px-2"
          id="scollDiv"
        >
          <InfiniteScroll
            dataLength={filteredArray?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget={"scrollDiv"}
          >
            <table className="w-full text-center max-w-7xl table-auto">
              <thead className="bg-white sticky top-0">
                <tr className=" text-gray-400">
                  <th className="font-normal">Sl No.</th>
                  <th className="font-normal">Payment Id</th>
                  <th className="font-normal">Payment Method</th>
                  <th className="font-normal">Name</th>
                  <th className="font-normal">(Planted or Spawned) / Total</th>
                  <th className="font-normal">
                    Amount {"("}${")"}
                  </th>
                  <th className="font-normal">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredArray
                  // .slice(pageNo * 12 - 12, pageNo * 12)
                  .map((item, i) => (
                    <tr key={i}>
                      <td className="py-1 text-lg">{i + 1}</td>
                      <td>{item.paymentId}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.apiName}</td>
                      <td>
                        {item.monthlyPlanted}/ {item.totalMonthlyCall}
                      </td>
                      <td>{item.amount}</td>
                      <td className="GreenGradient">
                        {" "}
                        Echo Eco
                        <span className="font-normal text-[11px] ml-[2px]">
                          {item.ecoType.toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                {filteredArray.length === 0 ? (
                  <tr className="absolute w-full flex justify-center mt-16 ">
                    <td>No Data Available</td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>

      {/* <div className="flex items-center justify-center gap-6 p-6 text-lg font-medium">
        <div
          onClick={previousPage}
          class="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-green-500 previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>Prev</span>
        </div>
        <div className="text-grey-800">
          <span>
            {"{ "}
            {pageNo} {" }"}
          </span>
        </div>
        <div
          onClick={nextPage}
          class="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-green-500  next"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default PaymentHistory;
