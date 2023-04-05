import React, { useState } from "react";
import { Area, AreaChart } from "recharts";
import EditShipmentPopup from "./SpecificEchoPicsPopup/EditShipmentPopup/EditShipmentPopup";

const data = [
  {
    totalMonthlyCall: 10,
  },
  {
    totalMonthlyCall: 100,
  },
  {
    totalMonthlyCall: 60,
  },
  {
    totalMonthlyCall: 80,
  },
  {
    totalMonthlyCall: 120,
  },
  {
    totalMonthlyCall: 160,
  },
];

const createdEchoPicList = [];

function SpecificEchoPic() {
  const [isActive, setIsActive] = useState();
  const [isDelivery, setIsDelivery] = useState(true);
  const [isEditShipmentPopup, setIsEditShipmentPopup] = useState(false);

  const handleActiveButton = () => {
    setIsActive(2);
  };
  const handleDeactivateButton = () => {
    setIsActive(1);
  };
  
  const handleDelivery = () => {
    setIsDelivery(true);
  };

  const handlePicsEchoed = () => {
    setIsDelivery(false);
  };

  const handleEditNextShipment = () => {
    setIsEditShipmentPopup(true);
  }

  const onCloseEditShipmentPopup = () => {
    setIsEditShipmentPopup(false);
  }

  return (
    <div className="mx-8">
      <div className="flex">
        <div className="shadow-xl rounded-xl font-medium text-[25px] GreenGradient px-4 pt-2">
          Whatsapp
        </div>
        {parseInt(isActive) === 2 ? (
          <div className="ml-7" onClick={handleDeactivateButton}>
            <div>
              <div>
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
          </div>
        ) : (
          <div className="ml-7" onClick={handleActiveButton}>
            <div>
              <div>
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
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <div className="shadow-xl rounded-2xl w-5/12 mr-4 relative">
          <div className="p-2">
            <div className="absolute top-6 left-6">
              <div className="font-semibold text-[#404040] text-xl">Quantity</div>
              <div className="font-semibold text-[#000000] text-[35px]">112</div>
            </div>
            <AreaChart
              width={350}
              height={250}
              data={data}
              margin={{ top: 10, right: 5, left: 5 }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="95%" stopColor="#E7ECEC" stopOpacity={0.8} />
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
            </AreaChart>
          </div>
          <div className="absolute bottom-8 right-6">
            <button
              type="submit"
              className=" bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-medium text-lg text-white py-2 px-2 rounded-lg"
              onClick={handleEditNextShipment}
            >
              Edit Next Shipment
            </button>
          </div>
        </div>
        <div className="shadow-xl rounded-2xl w-4/12 relative">
          <div className="p-2">
            <div className="absolute top-6 left-6">
              <div className="font-semibold text-[#404040] text-xl">Picks you echoed</div>
              <div className="font-semibold GreenGradient text-[35px]">200</div>
            </div>
            <AreaChart
              width={250}
              height={250}
              data={data}
              margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="95%" stopColor="#E7ECEC" stopOpacity={0.8} />
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
            </AreaChart>
          </div>
          <div className="absolute bottom-8 right-16">
            <button
              type="submit"
              className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-medium text-lg text-white py-2 px-5 rounded-lg"
            >
              Enter Amount
            </button>
          </div>
        </div>
        <div className="shadow-xl rounded-2xl w-5/12 ml-4 p-4">
          <div className="font-semibold text-[#404040] text-xl">Current Delivery</div>
          <div className="flex my-4">
            <div className="font-semibold text-[#000000] text-[22px] ">
              Date: <span className="GreenGradient">12/02/1223</span>
            </div>
            <div className="font-semibold text-[#000000] text-[22px]">
              Quantity: <span className="GreenGradient">5 Plants</span>
            </div>
          </div>
          <div className="font-semibold text-[#000000] text-[22px]">
            ABN: <span className="GreenGradient">asdsdfk</span>
          </div>
          <div className="font-semibold text-[#000000] text-[22px] mt-4">
            Address:{" "}
            <span className="GreenGradient">
              Varthur road, Whitefield, Bangalore
            </span>
          </div>
        </div>
      </div>
      <div className="pt-4 pb-16 mt-4 w-full h-96 overflow-x-hidden rounded-2xl shadow-lg bg-white">
        <div className="flex justify-between mb-3 px-6">
          <div className="font-semibold text-xl text-[#404040]">
            Order History
          </div>
          <label
            htmlFor="Toggle"
            className="inline-flex items-center rounded-full cursor-pointer bg-[#F4F4F4]"
          >
            <input id="Toggle" type="checkbox" className="hidden peer" />
            <span
              onClick={handleDelivery}
              className={
                isDelivery
                  ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                  : `px-4 py-2 rounded-full`
              }
            >
              Delivery
            </span>
            <span
              onClick={handlePicsEchoed}
              className={
                !isDelivery
                  ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                  : `px-4 py-2 rounded-full`
              }
            >
              Pics Echoed
            </span>
          </label>
        </div>
        <div className="mt-4 overflow-y-auto pl-6 pr-2" id="style-1">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] pl-0 pr-5 py-2 text-left"
                >
                  Sl No.
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                >
                  Company Name
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
                  Quantity
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                >
                  Next Delivery
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                >
                  Address
                </th>
              </tr>
            </thead>
            {createdEchoPicList.length !== 0 ? (
              <tbody className="border-gray-100 relative">
                {createdEchoPicList.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b last:border-none cursor-pointer border-gray-100"
                    >
                      <td className="pl-0 pr-5 py-2 whitespace-nowrap text-sm font-normal text-[#404040]">
                        {index + 1}
                      </td>
                      <td className="text-sm text-[#000000] font-normal px-4 py-2 whitespace-nowrap">
                        {item.orderCompanyName || "to be updated"}
                      </td>
                      <td className="text-sm text-[#000000] font-normal px-5 py-2 whitespace-nowrap">
                        {item.picType}
                      </td>
                      <td className="text-sm GreenGradient font-normal px-5 py-2 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="text-sm GreenGradient font-normal px-5 py-2 whitespace-nowrap">
                        {item.nextDelivery}
                      </td>
                      <td className="text-sm text-[#404040] font-bold  pl-4 pr-0 py-2 whitespace-nowrap">
                        {item.address}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="absolute flex justify-center mt-12 ml-96 text-center">
                <div>
                  <span className="">No Order Placed</span>
                </div>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditShipmentPopup
        visible={isEditShipmentPopup}
        onClose={onCloseEditShipmentPopup}
      />
    </div>
  );
}

export default SpecificEchoPic;
