import axios from "axios";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { PATH } from "../../utils/httpContants";

const latestUpdates = [
  {
    date: "01/02/2023",
    update: "Now Order potted plants",
    details:
      "You can now order potted plants from Echo picks tabs. Choose the frequency of your orders. Activate and deactivate the orders at your will.",
  },
  {
    date: "01/02/2023",
    update: "Now Order potted plants",
    details:
      "You can now order potted plants from Echo picks tabs. Choose the frequency of your orders. Activate and deactivate the orders at your will.",
  },
  {
    date: "01/02/2023",
    update: "Now Order potted plants",
    details:
      "You can now order potted plants from Echo picks tabs. Choose the frequency of your orders. Activate and deactivate the orders at your will.",
  },
  {
    date: "01/02/2023",
    update: "Now Order potted plants",
    details:
      "You can now order potted plants from Echo picks tabs. Choose the frequency of your orders. Activate and deactivate the orders at your will.",
  },
];

function LatestUpdates() {
  const [latestUpdates, setLatestUpdates] = useState([])
  const getAnnouncements = async () => {
    try {
      let res = await axios.get(PATH.announcements.getAnnouncements)
      setLatestUpdates(res.data.data)
      return res.data
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getAnnouncements()
  }, [])
  return (
    <div className="mx-8 my-8 min-h-screen">
      {latestUpdates?.length ? (
        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-8 2xl:gap-x-6 gap-y-8 w-full mt-4">
          {latestUpdates?.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-4 shadow-lg rounded-lg h-full items-center justify-center text-left font-bold relative`}
              >
                <div className="absolute -left-5 -top-5">
                  <svg
                    width="59"
                    height="59"
                    viewBox="0 0 59 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.7489 0.588611L32.5014 9.20566L42.5234 3.38205L43.7304 14.9102L55.2614 16.0896L49.4617 26.1255L58.0973 33.8574L47.5063 38.5677L49.948 49.8988L38.6111 47.4842L33.9261 58.0864L26.1736 49.4694L16.1516 55.293L14.9446 43.7648L3.41363 42.5854L9.21328 32.5495L0.577719 24.8176L11.1687 20.1074L8.72707 8.77628L20.064 11.1908L24.7489 0.588611Z"
                      fill="url(#paint0_linear_2324_6820)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2324_6820"
                        x1="24.7489"
                        y1="0.588611"
                        x2="33.9261"
                        y2="58.0864"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#6DB935" />
                        <stop offset="0.0001" stop-color="#6AB831" />
                        <stop offset="1" stop-color="#4DAA09" />
                      </linearGradient>
                    </defs>
                    <svg
                      width="17"
                      height="29"
                      viewBox="0 0 17 29"
                      x="20"
                      y="17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32785 0.841146L12.4545 19.1976L8.9946 20.6123L1.21847 2.52141L5.32785 0.841146ZM13.836 27.4966C13.1448 27.7792 12.4549 27.7795 11.7661 27.4974C11.0739 27.207 10.5907 26.7145 10.3164 26.02C10.0289 25.3406 10.032 24.6589 10.3259 23.9751C10.6163 23.2829 11.107 22.7955 11.7982 22.5129C12.4727 22.2371 13.156 22.2444 13.8482 22.5349C14.537 22.8169 15.0251 23.2977 15.3126 23.9771C15.4916 24.4385 15.5428 24.9084 15.4662 25.3868C15.3946 25.8534 15.2174 26.2757 14.9346 26.6538C14.6518 27.0318 14.2856 27.3128 13.836 27.4966Z"
                        fill="white"
                      />
                    </svg>
                  </svg>
                </div>
                <div className="text-right font-medium text-lg">{moment(item.createdAt).format('DD/MM/YYYY')}</div>
                <p className="GreenGradient font-medium text-[25px]">{item.title}</p>
                <p className="font-medium text-lg mt-3 mb-6">{item.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="lg:w-[600px] xl:w-[750px] 2xl:w-[950px] lg:h-[300px] xl:h-[400px] 2xl:h-[500px] h-1/3 mt-11 text-center flex items-center justify-center shadow-lg rounded-xl">
          <span className="">No Latest Update Present</span>{" "}
        </div>
      )}
    </div>
  );
}

export default LatestUpdates;
