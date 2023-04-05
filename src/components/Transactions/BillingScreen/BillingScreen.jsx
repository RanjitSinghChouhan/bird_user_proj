import React, { useState, useEffect, useCallback, useRef } from "react";
import sort from "../../../assets/sort.svg";
import filter from "../../../assets/filter.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  paymentVerify,
  pendingTransactions,
} from "../../../store/actions/transactionAction";
import moment from "moment-timezone";
import Loader from "../../Loader/Loader";
import bird from "../../../assets/birdImgOnly.svg";
import InfiniteScroll from "react-infinite-scroll-component";

function BillingScreen() {
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [monthlyIdArray, setMonthlyIdArray] = useState([]);
  const [onlyMonthlyIdArr, setOnlyMonthlyIdArr] = useState([]);
  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [countTrans, setCountTrans] = useState(0);

  const getPendingTransactions = useCallback(() => {
    setIsLoading(true);
    dispatch(
      pendingTransactions({
        companyId: userInfo?.companyId,
        offset: countTrans,
      })
    ).then((response) => {
      setCountTrans(countTrans + 15);
      setData(response.data.data);
      setFilteredArray([...filteredArray, ...response.data.data]);
      const sum = response.data.data.reduce((accumulator, object) => {
        setCompanyId(object.companyId);
        return accumulator + Number(object.amount);
      }, 0);
      setTotalValue(sum);
      const arr = response.data.data.map((item) => ({
        monthlyId: item.monthlyId,
        amount: item.amount,
      }));
      setMonthlyIdArray(arr);
      const monArr = response.data.data.map((item) => item.monthlyId);
      setOnlyMonthlyIdArr(monArr);
      if (response.data.data.length < 15) {
        sethasMore(false);
      }
      setIsLoading(false);
    });
  }, [dispatch, userInfo?.companyId, filteredArray, countTrans]);

  const fetchMoreData = () => {
    setTimeout(() => {
      getPendingTransactions();
    }, 300);
  };

  const onSelect = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "1") {
      var a = filteredArray.sort(
        (a, b) =>
          parseFloat(a.totalMonthlyCall) - parseFloat(b.totalMonthlyCall)
      );
      setFilteredArray(a);
    } else {
      var b = filteredArray.sort(
        (b, a) =>
          parseFloat(a.totalMonthlyCall) - parseFloat(b.totalMonthlyCall)
      );
      setFilteredArray(b);
    }
  };
  const onFilterValue = (e) => {
    setFilterValue(e.target.value);
    if (e.target.value === "1") {
      let filteredData = data.filter((el) => el.ecoType === "Tree");
      setFilteredArray(filteredData);
    } else {
      let filteredData1 = data.filter((el) => el.ecoType === "Algae");
      setFilteredArray(filteredData1);
    }
  };
  useEffect(() => {
    if (userInfo) {
      getPendingTransactions();
    }
  }, [userInfo]);

  const handleOpenRazorpay = ({
    data,
    monthlyId,
    apiId,
    companyId,
    apiName,
  }) => {
    let options = {
      key: "rzp_test_4Qk23u6Y98sI5n", //`${process.env.razorPay_key_id}`, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Byrds Payments",
      description: apiName,
      image: bird,
      order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        dispatch(
          paymentVerify({
            response: response,
            monthlyId: monthlyId,
          })
        )
          .then((response) => {
            getPendingTransactions();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleOpenRazorpayAll = ({ data, monthlyIdArray }) => {
    let options = {
      key: "rzp_test_4Qk23u6Y98sI5n", //`${process.env.razorPay_key_id}`, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Byrds Payments",
      description: "All Transactions",
      image: bird,
      order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        dispatch(
          paymentVerify({
            response: response,
            monthlyIdArr: onlyMonthlyIdArr,
          })
        )
          .then((response) => {
            getPendingTransactions();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (item) => {
    dispatch(
      createOrder({
        amount: Number(item.amount),
        monthlyId: item.monthlyId,
        companyId: item.companyId,
      })
    )
      .then((response) => {
        handleOpenRazorpay({
          data: response.data,
          monthlyId: item.monthlyId,
          companyId: item.companyId,
          apiName: item.apiName,
        });
      })
      .catch((error) => {});
  };

  const handlePaymentAll = ({ monthlyIdArray, amount }) => {
    dispatch(
      createOrder({
        amount: Number(amount),
        companyId: companyId,
        monthlyIdArray: monthlyIdArray,
      })
    )
      .then((response) => {
        handleOpenRazorpayAll({
          data: response.data,
          monthlyIdArray: monthlyIdArray,
        });
      })
      .catch((error) => {});
  };

  return (
    <div className="p-6 flex flex-col h-full max-h-[90vh]">
      {isLoading ? <Loader /> : ""}
      <div className="flex gap-4 items-center w-full max-w-7xl">
        <div className=" w-full font-medium text-[#545454] text-2xl">
          Pending Transactions{" "}
        </div>
        <div className="flex gap-4 items-center">
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
              className="border border-outline-none border-none focus:border-none focus:border-outline-none bg-transparent z-10 relative cursor-pointer"
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
              className="border border-outline-none border-none focus:border-none focus:border-outline-none bg-transparent cursor-pointer z-10 relative"
            >
              <option value=""></option>
              <option value={1}>Tree</option>
              <option value={2}>Algae</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <div className="relative shadow-xl rounded-2xl h-full">
        <div className="mt-4 overflow-y-auto overflow-x-hidden h-4/6 px-2 relative" id="scrollDiv">
          <InfiniteScroll
            dataLength={filteredArray?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget={"scrollDiv"}
          >
            <table
              className="w-full text-center p-1"
              style={{ borderSpacing: "4px", borderCollapse: "separate" }}
            >
              <thead className="bg-white sticky top-0">
                <tr className=" text-gray-500">
                  <th className="font-normal">Sl No.</th>
                  <th className="font-normal">Start Date</th>
                  <th className="font-normal">Deadline</th>
                  <th className="font-normal">Name</th>
                  <th className="font-normal">
                    Amount {"("} $ {")"}
                  </th>
                  <th className="font-normal">Type</th>
                  <th className="font-normal">Pay</th>
                </tr>
              </thead>
              <tbody>
                {filteredArray.map((item, i) => (
                  <tr key={i}>
                    <td className="py-1 text-lg">{i + 1}</td>
                    <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                    <td>{moment(item.deadline).format("DD-MM-YYYY")}</td>
                    <td>{item.apiName}</td>
                    <td>{item.amount}</td>
                    <td className="GreenGradient">
                      {" "}
                      Echo Eco
                      <span className="font-normal text-[11px] ml-[2px]">
                        {item.ecoType.toLowerCase()}
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => handlePayment(item)}
                        className="text-sm text-white cursor-pointer bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-medium rounded-xl px-3 py-1 text-center"
                      >
                        Pay Now
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
        <div className="px-4 py-8">
          <table className="w-full">
            <thead>
              <tr className=" text-gray-500 text-left border-b-2 border-black">
                <th className="font-normal text-[#000000] text-xl">
                  Pending Totals
                </th>
                <th></th>
                <th className="font-normal text-[#AEAEAE] text-xl text-center">
                  Total Items
                </th>
                <th className="font-normal text-[#AEAEAE] text-xl text-center">
                  Total Amount {"("} $ {")"}
                </th>
                <th></th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-xl"></td>
                <td className=""></td>
                <td className="font-semibold text-[#000000] text-2xl text-center ">
                  {filteredArray.length}
                </td>
                <td className="font-semibold text-[#000000] text-2xl text-center">
                  {Number(totalValue).toFixed(2)}
                </td>
                <td></td>
                <td className="text-right p-3">
                  <span
                    onClick={() =>
                      handlePaymentAll({
                        monthlyIdArray: monthlyIdArray,
                        amount: Number(totalValue).toFixed(2),
                      })
                    }
                    className="text-base cursor-pointer mr-5 text-white bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-medium rounded-xl px-4 py-1.5 text-center"
                  >
                    Pay Now
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillingScreen;
