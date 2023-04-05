import React from "react";
import bird from "../../../../assets/Subtract.svg";
import eggBucket from "../../../../assets/eggBucket.svg";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  createSubscriptionOrder,
  subscriptionPaymentVerify,
} from "../../../../store/actions/authAction";

function Subscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenRazorpay = ({ data }) => {
    let options = {
      key: "rzp_test_4Qk23u6Y98sI5n", //`${process.env.razorPay_key_id}`, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Byrds Payments",
      description: data.userName + "subscribing with byrds",
      image: bird,
      order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        dispatch(
          subscriptionPaymentVerify({
            response: response,
          })
        )
          .then((response) => {})
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
      createSubscriptionOrder({
        amount: item.amount,
        planDuration: item.duration,
      })
    )
      .then((response) => {
        handleOpenRazorpay({
          data: response.data,
        });
      })
      .catch((error) => {});
  };
  return (
    <div>
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Subscribe here with byrds.
          </div>
          <div className="font-normal text-[#000000] text-2xl ">
            Please pay the subscription amount. <br />
            To make the world greener.
          </div>
          <div className="flex justify-center my-5">
            <img src={eggBucket} alt="" />
          </div>
          <div>
            <button
              type="submit"
              className="w-3/4 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] py-2 rounded-lg font-bold text-[#FFFFFF] text-[22px]"
              onClick={() => handlePayment({ amount: 500, duration: 365 })}
            >
              Annual Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
